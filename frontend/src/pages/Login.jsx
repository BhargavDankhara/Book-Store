// src/pages/Login.js
import { useState } from "react";
import { Button, Label, TextInput } from "flowbite-react";
import { useAuthStore } from "../store/authUser";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuthStore();

  const handleLogin = (e) => {
    e.preventDefault();
    login({ email, password });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-500 via-teal-500 to-purple-500">
      <form
        className="bg-white p-10 rounded-2xl shadow-xl w-96 transform transition-all duration-300 hover:shadow-2xl"
        onSubmit={handleLogin}
      >
        <h2 className="text-4xl font-semibold text-center mb-6 text-gray-800">
          Welcome Back
        </h2>
        <div className="mb-4">
          <Label
            htmlFor="email"
            value="Email"
            className="text-gray-700 font-medium"
          />
          <TextInput
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="mt-1 block w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-400 outline-none"
          />
        </div>
        <div className="mb-6">
          <Label
            htmlFor="password"
            value="Password"
            className="text-gray-700 font-medium"
          />
          <TextInput
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="mt-1 block w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-400 outline-none"
          />
        </div>
        <Button
          type="submit"
          fullSized
          className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition duration-200"
        >
          Login
        </Button>
        <div className="mt-4 text-center">
          <p className="text-gray-600 text-sm">
            Don&apos;t have an account?{" "}
            <a href="/signup" className="text-blue-500 hover:underline">
              Signup
            </a>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
