import jwt from "jsonwebtoken"

const generateToken = async (userID) =>{
    try {
        const token = await jwt.sign({userID},process.env.JWT_SECRET,{expiresIn:"2d"})
        return token
    } catch (error) {
        
    }

}

export default generateToken