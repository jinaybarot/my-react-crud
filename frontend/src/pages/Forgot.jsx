import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

export default function Forgot() {
  const [email, setEmail] = useState("");

  const handleForgot = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:5000/api/auth/forgot", { email });
    alert("Check your email for reset link");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-indigo-600 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
          Forgot Password
        </h2>
        <p className="text-gray-500 text-center mb-6 text-sm">
          Enter your registered email address and we’ll send you a reset link.
        </p>
        <form onSubmit={handleForgot} className="space-y-5">
          <div>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 placeholder-gray-400 text-gray-700"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-xl shadow-md transition duration-300"
          >
            Send Reset Link
          </button>
        </form>
        <div className="mt-6 text-center">
          <Link to="/" className="text-blue-600 hover:underline">
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
}
