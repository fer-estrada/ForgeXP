import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { address } from "../../../address"; //update address here
console.log('address =>', address);   

const Login = ({ setToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    if (!email && !password) {
      setError("Both fields are required.");
      console.error(error);
      return;
    }

    try {
      const response = await fetch("${address}/user/login", {  //update address here
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json();
      if (!response.ok) {
        setError(result.message || "Login failed.");
        return;
      }
      setToken(result.token);
      localStorage.setItem("token", result.token);
      localStorage.setItem("email", result.email);
      localStorage.setItem("isAdmin", result.isAdmin);
      setSuccessMessage(`Success!`);
      setEmail("");
      setPassword("");
      setTimeout(() => {
        if (result.isAdmin) {
          navigate("/admin");
        } else {
          navigate("/account");
        }
      }, 1500);
    } catch (error) {
      setError("Something went wrong. Please try again.");
      console.error("Login error:", error);
    }
  }

  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="relative z-10 flex justify-center items-center min-h-screen px-4 my-10">
        <form
          onSubmit={handleSubmit}
          className="bg-cover bg-center border border-blue-500 p-8 rounded-lg shadow-xl w-full max-w-md"
          style={{ backgroundImage: "url('/images/forgexp-grid-bg.png')" }}
        >
          <h2 className="text-3xl font-bold text-center mb-6 drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">
            Sign In
          </h2>
          <div className="flex justify-center my-4">
            <img
              src="/images/minilogo.png"
              alt="ForgeXP Logo"
              className="h-20 w-auto drop-shadow-xl"
            />
          </div>
  
          {error && (
            <p className="text-orange-400 text-sm mb-4 text-center">{error}</p>
          )}
          {successMessage && (
            <p className="text-blue-400 text-sm mb-4 text-center">
              {successMessage}
            </p>
          )}
  
          <label
            htmlFor="email"
            className="block mb-2 font-semibold text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            placeholder="Enter your email"
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-2 mb-4 bg-gray-900 text-white border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
  
          <label
            htmlFor="password"
            className="block mb-2 font-semibold text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            minLength="8"
            required
            className="w-full px-4 py-2 mb-4 bg-gray-900 text-white border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
  
          <button
            type="submit"
            className="w-full py-2 bg-orange-500 hover:bg-orange-400 text-white font-bold rounded mt-2 transition disabled:opacity-50"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
  
};

export default Login;
