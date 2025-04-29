import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { FaHammer } from "react-icons/fa";
import { address } from "../../../address"; //update address here
console.log('address =>', address);   

export default function Register({ setToken, token }) {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [fName, setFName] = useState("");
  const [lName, setLName] = useState("");
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    
    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return
    }

    setLoading(true);


    try {
      const response = await fetch("${address}/user/register", { //update address here
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, username, fName, lName, password }),
      });

      const result = await response.json();
      console.log("fetch result", result); //REMOVE LATER

      if (response.ok) {
        localStorage.setItem("token", result.token);
        setSuccessMessage(result.successMessage);

        setLoading(false);
        setTimeout(() => navigate("/account"), 1500);
      } else {
        setLoading(false);
        setError(result.error || "Registration failed.");
      }
    } catch (err) {
      console.error(err);
      setLoading(false);

      setError("Something went wrong.");
    }
  };
  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="relative z-10 flex justify-center items-center min-h-screen px-4 my-10">
        {loading ? (
          // Loading state that wil display mini logo and message so user doesnt spam
          <div className="text-center flex flex-col items-center">
            <img
              src="/images/minilogo.png"
              alt="Loading Logo"
              className="h-24 w-auto animate-pulse drop-shadow-xl"
            />
            <p className="text-orange-400 font-semibold mt-4 text-xl">
              <FaHammer className="animate-bounce" />
              Forging New User...
            </p>
          </div>
        ) : (
          //REGISTER FORM
          <form
            onSubmit={handleSubmit}
            className="bg-cover bg-center border border-blue-500 p-8 rounded-lg shadow-xl w-full max-w-md"
            style={{ backgroundImage: "url('/images/forgexp-grid-bg.png')" }}
          >
            <h2 className="text-3xl font-bold text-center mb-6 drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">
              Register
            </h2>
            <div className="flex justify-center my-4">
              <img
                src="/images/minilogo.png"
                alt="ForgeXP Logo"
                className="h-20 w-auto drop-shadow-xl"
              />
            </div>

            {error && (
              <p className="text-orange-400 text-sm mb-2 text-center">
                {error}
              </p>
            )}
            {successMessage && (
              <p className="text-blue-400 text-sm mb-2 text-center">
                {successMessage}
              </p>
            )}

            {/* Field for first name */}
            <label
              className="block mb-2 font-semibold text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]"
              htmlFor="fName"
            >
              First Name
            </label>
            <input
              id="fName"
              type="text"
              placeholder="First Name (optional)"
              value={fName}
              onChange={(e) => setFName(e.target.value)}
              className="w-full px-4 py-2 mb-4 bg-gray-900 text-white border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            {/* Field for last name */}
            <label
              className="block mb-2 font-semibold text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]"
              htmlFor="lName"
            >
              Last Name
            </label>
            <input
              id="lName"
              type="text"
              placeholder="Last Name (optional)"
              value={lName}
              onChange={(e) => setLName(e.target.value)}
              className="w-full px-4 py-2 mb-4 bg-gray-900 text-white border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            {/* Field for username */}
            <label
              className="block mb-2 font-semibold text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]"
              htmlFor="username"
            >
              Username
            </label>
            <input
              id="username"
              type="text"
              placeholder="Choose a username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full px-4 py-2 mb-4 bg-gray-900 text-white border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
            />

            {/* Field for Email */}
            <label
              className="block mb-2 font-semibold text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]"
              htmlFor="email"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 mb-4 bg-gray-900 text-white border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
            />

            {/* Field for Password */}
            <label
              className="block mb-2 font-semibold text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]"
              htmlFor="password"
            >
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                minLength="8"
                required
                className="w-full px-4 py-2 mb-4 bg-gray-900 text-white border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-3 right-4 text-xl cursor-pointer text-gray-300 hover:text-white"
              >
                {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
              </span>
            </div>

            <label
              className="block mb-2 font-semibold text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]"
              htmlFor="confirmPassword"
            >
              Confirm Password
            </label>
            <div className="relative">
              <input
                id="confirmPassword"
                type={showPassword ? "text" : "password"}
                placeholder="Please Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                minLength="8"
                required
                className="w-full px-4 py-2 mb-4 bg-gray-900 text-white border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-3 right-4 text-xl cursor-pointer text-gray-300 hover:text-white"
              >
                {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
              </span>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2 bg-orange-500 hover:bg-orange-400 text-white font-bold rounded mt-2 transition disabled:opacity-50"
            >
              Register
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
