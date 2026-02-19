import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import generateToken from "../utils/token.js";
import sendOtpMail from "../utils/mail.js";
const signup = async (req, res) => {
  try {
    // object destruction done to get the required things from body as varriable
    const { fullname, email, password, mobile, role } = req.body;
    // finding email in database same as submited in sign up form
    // and performing basic validations
    let user = await User.findOne({ email });
    if (user) {
      return res.status(404).json({ message: "User already exist" });
    }

    if (password.length < 6) {
      return res
        .status(404)
        .json({ message: "password must be atleast 6 character long " });
    }
    if (mobile.length < 10) {
      return res
        .status(404)
        .json({ message: "mobile must be atleast 10 digit long " });
    }

    // crypting the recieved password
    const hashed_password = await bcrypt.hash(password, 10);

    // creating a new user to be stored in database also if reached till here means user was empty therefore storing in that
    user = await User.create({
      fullname,
      email,
      password: hashed_password,
      mobile,
      role,
    });
    // above in 4 values the key is written but no value that means value also exist with same name as key therefore auto fetched
    // only the changed value is of password

    // getting token from token.js
    const token = await generateToken(user._id);
    // to store data in cookie
    res.cookie("token", token, {
      secure: false, // to run in http site also
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milisecond
      httpOnly: true,
    });
    return res.status(201).json(user);
  } catch (error) {
    return res.status(500).json(`sign up error ${error}`);
  }
};

// creating sign in same as done with sign up almost
const signin = async (req, res) => {
  try {
    // object destruction done to get the required things from body as varriable
    const { email, password } = req.body;
    // finding email in database same as submited in sign up form
    // and performing basic validations
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User does not exist" });
    }

    // decrypting and comparing
    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      return res.status(404).json({ message: "Wrong password" });
    }

    // getting token from token.js
    const token = await generateToken(user._id);
    // to store data in cookie
    res.cookie("token", token, {
      secure: false, // to run in http site also
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milisecond
      httpOnly: true,
    });
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json(`sign in error ${error}`);
  }
};

// creating LOG OUT logic
const signout = async (req, res) => {
  try {
    res.clearCookie("token"); // just deletes the cookie store as token
    return res.status(200).json({ message: "Sign out done " });
  } catch (error) {
    return res.status(404).json({ message: "Sign out not possible" });
  }
};

const sentOTP = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not exist" });
    }
    const otp = Math.floor(100000 + Math.random() * 900000);
    console.log(otp);
    user.resetOTP = otp;
    user.otpExpires = Date.now() + 5 * 60 * 1000;
    user.isOTPVerified = false; // waise toh already false hi tha
    await user.save();
    console.log("Before sending mail");
    await sendOtpMail(email, otp);
    console.log("After sending mail");
    return res.status(200).json({ message: "Otp send succesfully" });
  } catch (error) {
    console.log("OTP Error:", error);
    return res.status(500).json({ message: "Failed to send OTP" });
  }
};

const verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "user not found" });
    }

    if (user.resetOTP !== otp || user.otpExpires < Date.now()) {
      return res.status(400).json({ message: "expired or invalid otp" });
    }

    user.isOTPVerified = true;
    user.otpExpires = undefined;
    user.resetOTP = undefined;
    await user.save();
    return res.status(200).json({ message: "OTP verified succesfully" });
  } catch (error) {
    console.log(error);
  }
};

const resetPassword = async (req, res) => {
  try {
    const { email, newpassword } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "user not found" });
    }
    if (!user.isOTPVerified) {
      return res.status(400).json({ message: "Otp is not valid " });
    }

    const new_hashed_password = await bcrypt.hash(newpassword,10)
    user.password=new_hashed_password
    user.isOTPVerified=false
    await user.save()
    
    return res.status(200).json({ message: "Password reset succesfully " });
  } catch (error) {}
};

export { signup, signin, signout, sentOTP, verifyOTP, resetPassword };
