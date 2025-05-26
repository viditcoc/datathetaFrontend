import { useState, useContext, useEffect } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import { AuthContext } from "@store/context/AuthContext";

export default function Register({ onBack }) {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
    usertype: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState(""); // For popup message
  const [showPopup, setShowPopup] = useState(false); // Control popup visibility
  const navigate = useNavigate();
  const { isAuthenticated } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  // Redirect to landing page if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/landingpage");
    }
  }, [isAuthenticated, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccessMessage("");

    // Basic validation for password match
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    // Prepare the form data in application/x-www-form-urlencoded format
    const formBody = new URLSearchParams({
      firstname: formData.firstname,
      lastname: formData.lastname,
      email: formData.email,
      username: formData.username,
      password: formData.password,
      confirm_password: formData.confirmPassword,
      usertype: formData.usertype,
    }).toString();

    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'ngrok-skip-browser-warning': 'true',
        },
        body: formBody,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Registration failed');
      }

      const userData = await response.json();
      // Set the success message and show the popup
      setSuccessMessage(
        userData.message || "Registration was successful but current status set to disabled. Please contact admin for activation."
      );
      setShowPopup(true);

      // Reset the form after successful registration
      setFormData({
        firstname: "",
        lastname: "",
        email: "",
        username: "",
        password: "",
        confirmPassword: "",
        usertype: "",
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const closePopup = () => {
    setShowPopup(false);
    setSuccessMessage("");
  };

  return (
    <>
      <h2 className="text-xl font-bold">Register</h2>

      <form
        onSubmit={handleSubmit}
        className="bg-gray-200 text-black rounded-xl p-12 w-full max-w-md space-y-6"
      >
        <h2 className="text-xl font-medium">Register Now!</h2>

        <div>
          <label className="text-sm">First Name *</label>
          <input
            type="text"
            name="firstname"
            value={formData.firstname}
            onChange={handleInputChange}
            className="w-full p-2 bg-white rounded-lg"
            required
          />
        </div>

        <div>
          <label className="text-sm">Last Name *</label>
          <input
            type="text"
            name="lastname"
            value={formData.lastname}
            onChange={handleInputChange}
            className="w-full p-2 bg-white rounded-lg"
            required
          />
        </div>

        <div>
          <label className="text-sm">Email *</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full p-2 bg-white rounded-lg"
            required
          />
        </div>

        <div>
          <label className="text-sm">Username *</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            className="w-full p-2 bg-white rounded-lg"
            required
          />
        </div>

        <div className="relative">
          <label className="text-sm">Password *</label>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            className="w-full p-2 bg-white rounded-lg"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-9"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>

        <div className="relative">
          <label className="text-sm">Confirm Password *</label>
          <input
            type={showConfirmPassword ? "text" : "password"}
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            className="w-full p-2 bg-white rounded-lg"
            required
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-9"
          >
            {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>

        <div>
          <label className="text-sm">User Type *</label>
          <select
            name="usertype"
            value={formData.usertype}
            onChange={handleInputChange}
            className="w-full p-2 bg-white rounded-lg"
            required
          >
            <option value="">Select User Type</option>
            <option value="SuperUser">SuperUser</option>
            <option value="Admin">Admin</option>
            <option value="User">User</option>
          </select>
        </div>

        {error && <div className="text-red-500 text-sm">{error}</div>}

        <button
          type="submit"
          disabled={loading}
          className="bg-primary text-white px-4 py-2 rounded w-full disabled:opacity-50"
        >
          {loading ? 'Registering...' : 'Register'}
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

      {/* Popup for success message */}
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/90">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full text-center">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Registration Status</h3>
            <p className="text-gray-700 mb-4">{successMessage}</p>
            <button
              onClick={closePopup}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </>
  );
}