/** @format */

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";

function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/auth/login", formData);

      setMessage(res.data.message);

      // Save JWT Token
      localStorage.setItem("token", res.data.token);

      // Redirect to Dashboard
      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);
    } catch (error) {
      console.log("Login Error:", error);
      console.log("Response:", error.response);
      console.log("Data:", error.response?.data);

      setMessage(error.response?.data?.message || error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-black px-4">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl">
        <h1 className="text-4xl font-bold text-white text-center mb-3">
          Welcome Back
        </h1>

        <p className="text-gray-300 text-center mb-8">
          Login to your account 🚀
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-5 py-4 rounded-xl bg-white/10 text-white placeholder-gray-300 border border-white/20 outline-none focus:ring-2 focus:ring-purple-500"
          />

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-5 py-4 pr-14 rounded-xl bg-white/10 text-white placeholder-gray-300 border border-white/20 outline-none focus:ring-2 focus:ring-purple-500"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300">
              {showPassword ? <EyeOff size={22} /> : <Eye size={22} />}
            </button>
          </div>

          <button
            type="submit"
            className="
  w-full
  py-3.5
  sm:py-4
  rounded-xl
  bg-gradient-to-r
  from-purple-500
  to-pink-500
  text-white
  font-bold
  text-base
  sm:text-lg
  shadow-lg
  hover:scale-105
  active:scale-95
  transition
  duration-300
  ">
            Login
          </button>
        </form>

        {message && (
          <p className="text-center text-green-400 mt-5">{message}</p>
        )}

        <p className="text-center text-gray-300 mt-6">
          Don't have an account?{" "}
          <button
            onClick={() => navigate("/register")}
            className="text-purple-400 hover:text-pink-400 font-semibold">
            Register
          </button>
        </p>
      </div>
    </div>
  );
}

export default Login;
