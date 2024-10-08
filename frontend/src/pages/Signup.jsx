// src/pages/Signup.js
import { useState } from "react";
import { Button, Label, TextInput } from "flowbite-react";
import { useAuthStore } from "../store/authUser";

const Signup = () => {
  const { searchParams } = new URL(document.location);
  const emailValue = searchParams.get("email");

  const [email, setEmail] = useState(emailValue || "");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { signup } = useAuthStore();

  const handleSignup = (e) => {
    e.preventDefault();
    signup({ email, username, password });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
      <form
        className="bg-white p-10 rounded-2xl shadow-xl w-96 transform transition-all duration-300 hover:shadow-2xl"
        onSubmit={handleSignup}
      >
        <h2 className="text-4xl font-semibold text-center mb-6 text-gray-800">
          Create an Account
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
            className="mt-1 block w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-indigo-400 outline-none"
          />
        </div>
        <div className="mb-4">
          <Label
            htmlFor="username"
            value="Username"
            className="text-gray-700 font-medium"
          />
          <TextInput
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="mt-1 block w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-indigo-400 outline-none"
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
            className="mt-1 block w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-indigo-400 outline-none"
          />
        </div>
        <Button
          type="submit"
          fullSized
          className="w-full bg-indigo-600 text-white font-semibold py-3 rounded-lg hover:bg-indigo-700 transition-colors duration-200"
        >
          Signup
        </Button>
        <div className="mt-4 text-center">
          <p className="text-gray-600 text-sm">
            Already have an account?{" "}
            <a href="/login" className="text-indigo-500 hover:underline">
              Login
            </a>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Signup;
