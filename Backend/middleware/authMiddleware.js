import jwt from 'jsonwebtoken'

function authMiddleware(req,res,next){
    const token=req.headers.authorization

    if(!token){return res.status(401).json({message:"No token provided"})}

    //This just verifies whether this token is made my me or not and session time
    //Token has id, start time and end time
    jwt.verify(token,process.env.JWT_SECRET, (err,decoded)=>{
        if(err){ return res.status(401).json({message: "Invalid token"})}
        req.userId=decoded.id
        //next(): Ok now you can got to the ENDPOINT
        next()
    })
}

export default authMiddleware