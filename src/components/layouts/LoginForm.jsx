import { useState, useContext, useEffect } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import { AuthContext } from "@store/context/AuthContext";

export default function LoginForm({ onBack }) {
  const [user, setUser] = useState("johndoe");
  const [password, setPassword] = useState("password123");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login, isAuthenticated } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/landingpage");
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/login?username=${user}&password=${password}`, {
        // const response = await fetch(`/api/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // body: JSON.stringify({ username: user, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Login failed');
      }

      const userData = await response.json();
      login(userData, 'mock-jwt-token-12345'); // Pass user data and a mock token
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h2 className="text-xl font-bold">Login</h2>
     

      <form
        onSubmit={handleSubmit}
        className="bg-gray-200 text-black rounded-xl p-12 w-full max-w-md space-y-6"
      >
        <h2 className="text-xl font-medium">Login Now!</h2>
        <div>
          <label className="text-sm">Username</label>
          <input
            type="text"
            value={user}
            onChange={(e) => setUser(e.target.value)}
            className="w-full p-2 bg-white rounded-lg"
          />
        </div>
        <div className="relative">
          <label className="text-sm">Password</label>
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 bg-white rounded-lg"
          />
          
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-9"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
        <div className="flex justify-between items-center text-sm text-gray-600">
          <div className="flex gap-2 align-center">
            <input type="checkbox" id="rememberMe" className="peer hidden" />
            <label className="peer grid grid-cols-[auto_1fr] items-center gap-2 rounded-md hover:bg-gray-100 dark:hover:bg-white/5">
              <input
                type="checkbox"
                className="peer size-4.5 appearance-none rounded-sm border border-gray-300 checked:appearance-auto dark:border-gray-600 dark:accent-blue-900"
              />
              <span className="text-gray-700">Remember Me</span>
            </label>
          </div>
          <span className="cursor-pointer hover:underline">
            Forgot password?
          </span>
        </div>
        {error && <div className="text-red-500 text-sm">{error}</div>}
        <button
          type="submit"
          disabled={loading}
          className="bg-primary text-white px-4 py-2 rounded w-full disabled:opacity-50"
        >
          {loading ? 'Logging in...' : 'Log In'}
        </button>
        {onBack && (
          <button
            type="button"
            onClick={onBack}
            className="text-sm text-blue-500 hover:underline"
          >
            Back
          </button>
        )}
      </form>
    </>
  );
}