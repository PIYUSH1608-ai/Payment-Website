import express from 'express';
import bcrypt from 'bcryptjs';
import db from '../db.js';
const transactionRouter = express.Router();




transactionRouter.get("/accountDetails",async (req,res)=>{
    try{
        const [rows] = await db.execute("SELECT full_name,amount FROM users WHERE id = ?",[req.userId]);
        
        const {full_name, amount} = rows[0];
        return res.status(200).json({
            full_name:full_name,
            amount:amount
        })
    }catch(error){
        console.error("Error fetching account details:", error);
        return res.status(500).json({
            message: "Internal server error!"
        });
    }
})




transactionRouter.post("/send_money",async (req,res)=>{
    const [sender_data] = await db.execute("SELECT id, email, password_hash, amount FROM users WHERE id = ?",[req.userId]);
    const {id: sender_id, email: sender_email, password_hash, amount: sender_amount} = sender_data[0];
    const {receiver_email,transferred_amount,password} = req.body;

    const passwordIsValid = bcrypt.compareSync(password, password_hash);
    if (!passwordIsValid) {
        return res.status(401).send({ message: 'Invalid password!' });
    }

    const [receiver_data] = await db.execute("SELECT id,amount FROM users WHERE email = ?",[receiver_email]);
    if(!receiver_data[0]){
        return res.status(400).send({message: "No Account of this exist!"})
    }

    const {id: receiver_id, amount: receiver_amount} = receiver_data[0];

    if(Number(sender_amount)<Number(transferred_amount)){
        return res.status(400).send({message:"You don't have enough amount!"});
    }

    const remaining_amount = Number(sender_amount)-Number(transferred_amount);
    try{
        await db.execute("UPDATE users SET amount = ? WHERE id = ?",[remaining_amount,req.userId]);
        await db.execute("UPDATE users SET amount = ? WHERE id = ?",[Number(receiver_amount)+Number(transferred_amount), receiver_id]);
        await db.execute("INSERT INTO transactions (sender_id, receiver_id, sender_email, receiver_email, amount) VALUES (?,?,?,?,?)",[sender_id,receiver_id,sender_email,receiver_email,transferred_amount]);
    }catch(error){
        return res.status(500).send({message: error});
    }
    return res.status(200).json({message: "Payment Successful!"});
})




transactionRouter.get("/history",async (req,res)=>{
    try{
        const [user_email] = await db.execute("SELECT email FROM users WHERE id = ?", [req.userId]);
        const [history] = await db.execute("SELECT sender_id, sender_email, receiver_id, receiver_email, amount, created_at FROM transactions WHERE sender_id = ? OR receiver_id = ? ORDER BY created_at DESC",[req.userId,req.userId]);        
        return res.status(200).json({history:history,user_email:user_email[0].email});
    }catch(error){
        console.error("Error fetching account details:", error);
        return res.status(500).json({
            message: "Internal server error!"
        });   
    }
})

export default transactionRouter;