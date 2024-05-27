import React, { useState, useContext } from "react";
import loginPng from "../assets/login-profile.png";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "../../LoginContext";

interface FormData {
  username: string;
  password: string;
}

const Login = () => {
  const { setUser } = useContext(LoginContext);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();

  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit = async (formData: FormData) => {
    try {
      const response = await axios.post( 
        "http://localhost:5000/api/login",
        formData
      );
      // console.log(response.data)
      if (response.status === 200) {
        setUser(response.data);
        navigate("/dashboard");
        console.log(response.data);
      } else if (response.status === 401) {
        setErrorMessage("Enter Valid credentials");
      }

      reset();
    } catch (error) {
      console.log(error);
      setErrorMessage("Enter Valid credentials");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-l from-indigo-500 to-purple-500">
      <div className="bg-white rounded-3xl shadow-2xl relative overflow-hidden max-w-full w-[768px] min-h-[480px]">
        <div className="form-container absolute top-1/4 left-0 w-1/2 z-20 transition-all duration-600 ease-in-out transform translate-x-0">
          <form
            className="flex flex-col items-center justify-center h-full px-10"
            onSubmit={handleSubmit(onSubmit)}
          >
            <h1 className="text-4xl font-bold mb-8 text-gray-800">
              <span className="text-indigo-600">Get</span> Started
            </h1>

            <input
              type="text"
              placeholder="Username"
              {...register("username", {
                required: "Username is required",
                minLength: {
                  value: 3,
                  message: "Username must be at least 3 characters long",
                },
              })}
              className="bg-gray-100 rounded-lg mb-8 px-6 py-4 w-full focus:outline-none focus:ring-2 focus:ring-indigo-600"
            />
            {errors.username && (
              <span className="text-red-500">{errors.username.message}</span>
            )}

            <input
              type="password"
              placeholder="Password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters long",
                },
              })}
              className="bg-gray-100 rounded-lg mb-4 px-6 py-4 w-full focus:outline-none focus:ring-2 focus:ring-indigo-600"
            />
            {errors.password && (
              <span className="text-red-500">{errors.password.message}</span>
            )}

            {errorMessage && (
              <span className="text-red-500 mb-4">{errorMessage}</span>
            )}

            <button
              type="submit"
              className="bg-indigo-500 text-white rounded-lg px-12 py-4 uppercase font-bold hover:bg-indigo-700 transition-colors duration-300"
            >
              Log In
            </button>
          </form>
        </div>
        <div className="toggle-container absolute top-0 left-1/2 w-1/2 h-full overflow-hidden transition-all duration-600 ease-in-out transform rounded-l-[150px] rounded-r-none z-50">
          <div className="toggle h-full bg-gradient-to-tr from-pink-300 to-purple-400 text-white relative left-[-100%] w-[200%] transition-all duration-600 ease-in-out transform">
            <div className="toggle-panel toggle-right absolute right-0 w-1/2 h-full flex flex-col items-center justify-center px-8 text-center transition-all duration-600 ease-in-out transform translate-x-0">
              <h1 className="font-bold text-5xl mb-6 text-white welcome-text">
                <span className="text-pink-600">Hello,</span> User!
              </h1>
              <p className="mb-6 text-2xl text-white welcome-back">
                Welcome to{" "}
                <span className="text-purple-600 italic font-medium">
                  <span className="text-red-600">i</span>Ticket
                </span>{" "}
                System
              </p>
              <div className="flex justify-center h-20 w-20">
                <img src={loginPng} alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;