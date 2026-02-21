import React, { useState } from "react";
import { FaEyeSlash, FaRegEye } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";
import axios from "axios";
import { signInWithPopup } from "firebase/auth";
import { auth } from "../../utils/firebase";
import { GoogleAuthProvider } from "firebase/auth";

// importing icons

function Signin() {
  const primaryColor = "#ff4d2d";
  const hoverColor = "#e64323";
  const bgColor = "#fff9f6";
  const borderColor = "#ddd";
  const [showPassword, setShowPassword] = useState(false);

  // form react state

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // handle the Signin via api

  const handleSignin = async (e) => {
    try {
      e.preventDefault();
      const result = await axios.post(
        "http://localhost:8000/api/auth/signin",
        {
          email,
          password,
        },
        { withCredentials: true },
      );
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  const handleGoogleAuth = async () => {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    try {
      const { data } = await axios.post(
        "http://localhost:8000/api/auth/google-auth",
        {

          email: result.user.email,


        },
        { withCredentials: true },
      );
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center p-4"
      style={{ backgroundColor: bgColor }}
    >
      <div
        className={`bg-white rounded-xl shadow-1g w-full max-w-md p-8 border-2 `}
        style={{ border: ` 1px solid ${borderColor}` }}
      >
        <h1
          className={`text-3xl font-bold mb-2`}
          style={{ color: primaryColor }}
        >
          Foodie
        </h1>
        <p className="text-gray-600 mb-8">
          Create your account to get started{" "}
        </p>

        {/* Creating form for sign in  */}

        {/* Email  */}
        <div className="mb-4 ">
          <label
            htmlFor="email"
            className="block text-gray-700 font-medium mb-1"
          >
            Email
          </label>
          <input
          required
            type="email"
            placeholder="Enter your email id"
            className="w-full border rounded-sm px-3 py-2 focus:outline-none focus:border-orange-500 not-focus: border-gray-200"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            value={email}
          />
        </div>

        {/* password  */}
        <div className="mb-4 ">
          <label
            htmlFor="password"
            className="block text-gray-700 font-medium mb-1"
          >
            Password
          </label>
          {/* password additional things like forgot and show */}
          <div className="relative">
            <input
            required
              type={`${showPassword ? "text" : "password"}`}
              placeholder="Enter your password id"
              className="w-full border rounded-sm px-3 py-2 focus:outline-none focus:border-orange-500 not-focus: border-gray-200"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              value={password}
            />

            <button
              className="absolute right-3 top-3 cursor-pointer"
              onClick={() => {
                setShowPassword(!showPassword);
              }}
            >
              {showPassword ? <FaEyeSlash /> : <FaRegEye />}
            </button>
          </div>
        </div>

        {/* Forgot password */}
        <div className="text-right mb-4 text-[#ff4d2d]">
          <Link to="/forgot-password">Forgot Password</Link>
        </div>

        {/* sign in button + Google login   */}
        <div>
          <button
            className={`w-full h-10 mt-4 flex items-center justify-center gap-2 border rounded-3xl hover:bg-[#e64323] cursor-pointer bg-[#ff4d2d] text-white`}
            onClick={handleSignin}
          >
            Sign in
          </button>
          <button
            className="flex gap-2 items-center justify-center w-full mt-4 border p-2 rounded-4xl border-gray-300 hover:bg-gray-300 transition duration-200 cursor-pointer"
            onClick={handleGoogleAuth}
          >
            <FcGoogle size={30} />
            <span> Sign in with Google</span>
          </button>
          <p className="text-center mt-4 ">
            Want to create a new Account
            <Link
              to="/signup"
              className="cursor-pointer"
              style={{ color: primaryColor }}
            >
              {" "}
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signin;
