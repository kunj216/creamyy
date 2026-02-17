import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data } = await api.post("/auth/register", {
        name,
        email,
        password
      });

      login(data);
      toast.success("Account created successfully 🍨");
      navigate("/");

    } catch (error) {
      const message = error.response?.data?.message;

      if (message === "User already exists") {
        toast("Account already exists. Please login 🍨", {
          icon: "ℹ️"
        });

        setTimeout(() => {
          navigate("/login");
        }, 1200);

      } else {
        toast.error(message || "Signup failed. Please try again.");
      }

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-pink-50">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-pink-600 mb-6">
          Create Account 🍨
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="text"
            placeholder="Name"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-pink-500 text-white py-2 rounded-lg hover:bg-pink-600 transition disabled:opacity-50"
          >
            {loading ? "Creating account..." : "Signup"}
          </button>

        </form>
      </div>
    </div>
  );
}

export default Signup;
