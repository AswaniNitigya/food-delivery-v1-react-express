// IMPORT
import express from "express"
import dotenv from "dotenv"
import connectDB from "./config/db.js"
import cookieParser from "cookie-parser"
import authRouter from "./routes/auth.routes.js"
import cors from "cors" // used to connect frontend and backend 
import workingcheck from "./utils/mail.js"

// INITIALISE 
const app = express()
dotenv.config()

const port = process.env.PORT || 5000       // IF imported port is busy then run on 5000


// global middle ware
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));
app.use(express.json())
app.use(cookieParser())


app.use("/api/auth",authRouter) // ---> convert all the authRoutes with addition to give string ex /signup   to /api/auth/signup


app.get("/",(req,res)=>{
    res.send("server running")
})


app.listen(port,()=>{
    connectDB()
   
    console.log(`server started at ${port}`);
   
})
