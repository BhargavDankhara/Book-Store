// src/components/AuthScreen.js
import { Link } from "react-router-dom";

const AuthScreen = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
      <div className="bg-white p-10 rounded-2xl shadow-xl w-96 text-center">
        <h1 className="text-4xl font-bold mb-6 text-gray-900">
          Welcome to Book Store
        </h1>
        <p className="text-gray-700 mb-8 text-lg">
          Sign up or log in to start your reading journey!
        </p>
        <div className="flex justify-center space-x-6">
          <Link
            to="/signup"
            className="bg-blue-600 text-white px-5 py-2 rounded-lg font-semibold hover:bg-blue-700 transition duration-200 transform hover:scale-105"
          >
            Sign Up
          </Link>
          <Link
            to="/login"
            className="bg-green-600 text-white px-5 py-2 rounded-lg font-semibold hover:bg-green-700 transition duration-200 transform hover:scale-105"
          >
            Log In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AuthScreen;
