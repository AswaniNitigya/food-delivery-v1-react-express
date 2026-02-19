import React, { useState } from "react";
import { IoMdArrowBack } from "react-icons/io";
import { FaEyeSlash, FaRegEye } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";

function ForgotPass() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOTP] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");

  const handleEmailOTP = async () => {
    try {
      console.log("send otp initiated");
      const result = await axios.post(
        "http://localhost:8000/api/auth/send-otp",
        {
          email,
        },
        { withCredentials: true },
      );
      console.log("send complete");
      console.log(`${result.data} Otp send on email`);
      setStep(2);
    } catch (error) {
     console.log(error.response?.data || error.message);
}
  };

  const handleOTP = async () => {
    try {
      const result = await axios.post(
        "http://localhost:8000/api/auth/verify-otp",
        {
          email,
          otp,
        },
        { withCredentials: true },
      );
      console.log(`${result} Otp send on email`);
      setStep(3);
    } catch (error) {
      console.log(error);
    }
  };
  const handleReset = async () => {
    try {
      const result = await axios.post(
        "http://localhost:8000/api/auth/reset-password",
        {
          email,
          newpassword: password,
        },
        { withCredentials: true },
      );
      console.log(`${result} Otp send on email`);
      setStep(4);
      setTimeout(() => {
        navigate("/signin");
      }, 2000);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex w-full justify-center items-center min-h-screen p-4 bg-[#fff9f6]">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-8">
        <div className=" flex gap-2 items-center">
          <Link to="/signin">
            <IoMdArrowBack size={25} />
          </Link>
          <h1 className="font-medium text-2xl ">Forgot Password</h1>
        </div>
        {/* step1 */}
        {step == 1 && (
          <div>
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
            <button
              className={`w-full h-10 mt-4 flex items-center justify-center gap-2 border rounded-3xl hover:bg-[#e64323] cursor-pointer bg-[#ff4d2d] text-white`}
              onClick={handleEmailOTP}
            >
              Send OTP
            </button>
          </div>
        )}

        {/* step2 */}
        {step == 2 && (
          <div>
            {/* OTP  */}
            <div className="mb-4 ">
              <label
                htmlFor="otp"
                className="block text-gray-700 font-medium mb-1"
              >
                OTP
              </label>
              <input
                type="text"
                placeholder="Enter OTP recieved on email"
                className="w-full border rounded-sm px-3 py-2 focus:outline-none focus:border-orange-500 not-focus: border-gray-200"
                onChange={(e) => {
                  setOTP(e.target.value);
                }}
                value={otp}
              />
            </div>
            <button
              className={`w-full h-10 mt-4 flex items-center justify-center gap-2 border rounded-3xl hover:bg-[#e64323] cursor-pointer bg-[#ff4d2d] text-white`}
              onClick={handleOTP}
            >
              Send OTP
            </button>
          </div>
        )}

        {/* step3 */}
        {step == 3 && (
          <div>
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
                  placeholder="Enter your new password "
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
            <button
              className={`w-full h-10 mt-4 flex items-center justify-center gap-2 border rounded-3xl hover:bg-[#e64323] cursor-pointer bg-[#ff4d2d] text-white`}
              onClick={handleReset}
            >
              Reset Password
            </button>
          </div>
        )}

        {/* step4 */}
        {step == 4 && (
          <div className="flex-col items-center justify-center text-center gap-2">
            <h1> Congrats password has been updated ! </h1>
            <Link to="/signin">
              <button className="bg-[#ff4d2d] border text-white p-2 rounded-2xl hover:bg-[#d01f00]">
                Sign in
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default ForgotPass;
