// flow 

import  jwt  from "jsonwebtoken"

// token which was generated in database 
// will use that to find the current user and will
// return the Current user to the frontend 

export const isAuth = async(req,res,next)=>{
    try {
        const token = req.cookies.token
        if (!token) {
            return res.status(400).json({message:"cookie token not found  "})
        }
        const decodeToken = jwt.verify(token,process.env.JWT_SECRET)
        if (!decodeToken) {
            return res.status(400).json({message:"decode failed of token  "})
        }
        console.log(decodeToken);
        req.userId=decodeToken.userId
    } catch (error) {
       return res.status(500).json({ message: "middleware failed to do auth" });
    }
}