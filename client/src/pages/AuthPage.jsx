import React from "react";
import { useState } from "react";
import LoginForm from "../components/LoginForm.jsx";
import SignupForm from "../components/SignupForm.jsx";
const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  return (
    <div
      className="min-h-screen flex items-center justify-center 
    bg-gradient-to-br from-[#0F2027] via-[#203A43] to-[#2C5364] p-4 text-white"
    >
      <div className="w-full max-w-md">
        <h2 className=" text-center text-3xl font-extrabold text-white mb-8">
          {isLogin ? "Sign in to Swipe" : "Create a Swipe Account"}
        </h2>
        <div className=" bg-white shadow-xl rounded-lg p-8">
          {isLogin ? <LoginForm /> : <SignupForm />}
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-600">
              {isLogin ? "New to Swipe ? " : "Already have an account ? "}
            </p>
            <button
              onClick={() => {
                setIsLogin((currentState) => !currentState);
              }}
              className="mt-2 text-white-600 font-medium p-2 bg-primary-color rounded-lg hover:bg-secondary-color transition-colors duration-300"
            >
              {isLogin ? "Create an account" : "Sign in"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
