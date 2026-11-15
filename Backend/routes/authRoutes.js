import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import db from '../db.js';
import {sendOtpEmail} from '../utils/sendOtp.js';

const authRouter = express.Router();


authRouter.post('/send_otp' , async (req, res) => {
    try{
        const {email} = req.body;
        if(!email){
            return res.sendStatus(400);
        }
        await sendOtpEmail(email);
        res.status(200).send({message: "Successfully sent OTP"});
    } catch (err){
        console.error("Error in /send_otp:", err);
        res.status(500).send({message: "Server side error"});
    }
})
// 1. Verify OTP
authRouter.post('/verify_otp', async (req, res) => {
    try {
    const { email, entered_otp } = req.body;
    if (!email || !entered_otp) {
        return res.sendStatus(400);
    }

    const [rows] = await db.execute(
        'SELECT registered_email, original_otp FROM Otp_store WHERE registered_email = ?',
        [email]
    );

    if (rows.length > 0) {
        const { original_otp } = rows[0];

        if (String(original_otp).trim() === String(entered_otp).trim()) {
        await db.execute('DELETE FROM Otp_store WHERE registered_email = ?', [email]);
        return res.sendStatus(200);
        } else {
        return res.status(400).send({ message: 'Incorrect OTP' });
        }
    } else {
        return res.status(404).send({ message: '404 Not found!' });
    }
    } catch (error) {
    console.error('Error verifying OTP:', error);
    return res.sendStatus(500);
  }
});

// 2. Register a new user: /auth/register
authRouter.post('/register', async (req, res) => {
    const { fullname, email, account_no, debit_no, password } = req.body;

    if (!fullname || !email || !password) {
    return res.status(400).send({ message: 'Missing required fields' });
    }

    const hashedPassword = bcrypt.hashSync(password, 8);

    try {
    const [result] = await db.execute(
        'INSERT INTO users (full_name, email, account_no, debit_card_no, password_hash) VALUES (?, ?, ?, ?, ?)',
        [fullname, email, account_no, debit_no, hashedPassword]
    );

    const token = jwt.sign({ id: result.insertId }, process.env.JWT_SECRET, {
        expiresIn: '2m',
    });

    res.json({ token });
    } catch (err) {
    console.error('Error registering user:', err.message);
    res.sendStatus(500);
    }
});

// 3. Login user: /auth/login
authRouter.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
    const [rows] = await db.execute('SELECT * FROM users WHERE email = ?', [email]);
    const user = rows[0];

    if (!user) {
        return res.status(404).send({ message: 'User not found' });
    }

    const passwordIsValid = bcrypt.compareSync(password, user.password_hash);
    if (!passwordIsValid) {
        return res.status(401).send({ message: 'Invalid password' });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: '2m',
    });

    res.json({ token });
    } catch (err) {
    console.error('Error logging in:', err.message);
    res.sendStatus(500);
    }
});

export default authRouter;
