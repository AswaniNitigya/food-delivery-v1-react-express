import React, { useState } from "react";
import { FaEyeSlash, FaRegEye } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";
import axios from "axios";

// importing icons

function Signup() {
  const primaryColor = "#ff4d2d";
  const hoverColor = "#e64323";
  const bgColor = "#fff9f6";
  const borderColor = "#ddd";
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState("user");

  // form react state
  const [fullname, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");

  // handle the signup via api

  const handleSignup = async (e) => {
    try {
      e.preventDefault();
      const result = await axios.post(
        "http://localhost:8000/api/auth/signup",
        {
          fullname,
          email,
          mobile,
          password,
          role,
        },
        { withCredentials: true },
      );
      console.log(result);
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

        {/* Creating form for sign up  */}

        {/* Full name */}
        <div className="mb-4 ">
          <label
            htmlFor="fullname"
            className="block text-gray-700 font-medium mb-1"
          >
            Full Name
          </label>
          <input
            type="text"
            placeholder="Enter your Full Name"
            className="w-full border rounded-sm px-3 py-2 focus:outline-none focus:border-orange-500 not-focus: border-gray-200"
            onChange={(e) => {
              setFullName(e.target.value);
            }}
            value={fullname}
          />
        </div>

        {/* Email  */}
        <div className="mb-4 ">
          <label
            htmlFor="email"
            className="block text-gray-700 font-medium mb-1"
          >
            Email
          </label>
          <input
            type="email"
            placeholder="Enter your email id"
            className="w-full border rounded-sm px-3 py-2 focus:outline-none focus:border-orange-500 not-focus: border-gray-200"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            value={email}
          />
        </div>
        {/* Mobile  */}
        <div className="mb-4 ">
          <label
            htmlFor="mobile"
            className="block text-gray-700 font-medium mb-1"
          >
            Mobile
          </label>
          <input
            type="tel"
            placeholder="Enter your Mobile id"
            className="w-full border rounded-sm px-3 py-2 focus:outline-none focus:border-orange-500 not-focus: border-gray-200"
            onChange={(e) => {
              setMobile(e.target.value);
            }}
            value={mobile}
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
        {/* role of person  */}
        <div className="mb-4 ">
          <label
            htmlFor="role"
            className="block text-gray-700 font-medium mb-1"
          >
            Select Role
          </label>
          <div className="flex gap-2">
            {["user", "owner", "deliveryBoy"].map((item, id) => {
              return (
                <button
                  key={id}
                  className={`border flex-1 text-center rounded-lg border-gray-300 transition-colors cursor-pointer`}
                  onClick={() => {
                    setRole(item);
                  }}
                  style={
                    role == item
                      ? { backgroundColor: primaryColor, color: "white" }
                      : null // role variable is opt from the useState defined
                  }
                >
                  {item}
                </button>
              );
            })}
          </div>
        </div>

        {/* sign up button + Google login   */}
        <div>
          <button
            className={`w-full h-10 mt-4 flex items-center justify-center gap-2 border rounded-3xl hover:bg-[#e64323] cursor-pointer bg-[#ff4d2d] text-white`}
            onClick={handleSignup}
          >
            Sign up
          </button>
          <button className="flex gap-2 items-center justify-center w-full mt-4 border p-2 rounded-4xl border-gray-300 hover:bg-gray-300 transition duration-200 cursor-pointer">
            <FcGoogle size={30} />
            <span> Sign up with Google</span>
          </button>
          <p className="text-center mt-4 ">
            Already have a account?
            <Link
              to="/signin"
              className="cursor-pointer"
              style={{ color: primaryColor }}
            >
              {" "}
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
