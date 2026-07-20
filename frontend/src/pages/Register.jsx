/** @format */

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/axios";
import { Eye, EyeOff } from "lucide-react";

function Register() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
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
      const res = await API.post("/auth/register", formData);

      setMessage(res.data.message);

      // Redirect to Login page after successful registration
      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (error) {
      console.log("Register Error:", error);
      console.log("Response:", error.response);
      console.log("Data:", error.response?.data);

      setMessage(error.response?.data?.message || error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-black px-4">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl">
        <h1 className="text-4xl font-bold text-white text-center mb-3">
          Create Account
        </h1>

        <p className="text-gray-300 text-center mb-8">
          Start your MERN Journey 🚀
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-5 py-4 rounded-xl bg-white/10 text-white placeholder-gray-300 border border-white/20 outline-none focus:ring-2 focus:ring-purple-500"
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-5 py-4 rounded-xl bg-white/10 text-white placeholder-gray-300 border border-white/20 outline-none focus:ring-2 focus:ring-purple-500"
            required
          />

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-5 py-4 pr-14 rounded-xl bg-white/10 text-white placeholder-gray-300 border border-white/20 outline-none focus:ring-2 focus:ring-purple-500"
              required
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300 hover:text-white">
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
            Register
          </button>
        </form>

        {message && (
          <p className="text-center mt-5 text-green-400">{message}</p>
        )}

        <p className="text-center text-gray-300 mt-6">
          Already have an account?{" "}
          <button
            onClick={() => navigate("/login")}
            className="text-purple-400 hover:text-pink-400 font-semibold">
            Login
          </button>
        </p>
      </div>
    </div>
  );
}

export default Register;
