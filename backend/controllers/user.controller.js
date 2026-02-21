import User from "../models/user.model.js";

const getCurrentUser = async (req,res) =>{
    try {
        const userId = req.UserId
        if (!userId) {
            return res.status(400).json({ message: "user id not found" });
        }
        const user = User.findById(userId)
        if (!user) {
            return res.status(400).json({ message: "user not found" });
        }
        return res.status(200).json({ message: "user found by controller" });
    } catch (error) {
        return res.status(500).json({ message: "get current user error" });
    }
}

export {getCurrentUser}