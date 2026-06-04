import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CONSTANT } from "../utils/constant";
import Toast from "./Toast";

export default function SignupPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    emailId: "",
    password: "",
  });
  const [toast, setToast] = useState({
  show: false,
  type: "",
  message: "",
});

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const nevigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error while typing
    if (error) {
      setError("");
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    const { firstName, lastName, emailId, password } = formData;

    // Validation
    if (
      !firstName.trim() ||
      !lastName.trim() ||
      !emailId.trim() ||
      !password.trim()
    ) {
      setError("All fields are required.");
      return;
    }

    try {
      console.log("Form Data:", formData);

      // Example API Call
      const res = await axios.post(
        `${CONSTANT.BASE_URL}/signup`,
        {
          firstName,
          lastName,
          emailId,
          password
        },
        {
          withCredentials: true,
        }
      );
      setToast({
    show: true,
    type: "success",
    message: res?.data?.message || "Account created successfully",
  });

  setTimeout(() => {
    nevigate("/profile");
  }, 2000);
      setError("");
    } catch (err) {
     setToast({
    show: true,
    type: "error",
    message:
      err?.response?.data?.message ||
      "Something went wrong. Please try again.",
  });
    }
  };

  return (
    <>
    {toast.show && (
  <div className="fixed top-5 right-5 z-50">
    <Toast
      type={toast.type}
      message={toast.message}
    />
  </div>
)}
    <div className="min-h-screen flex items-center justify-center bg-base-200 px-4">
      <div className="card w-full max-w-md bg-base-100 shadow-xl">
        <div className="card-body">
          <h1 className="text-3xl font-bold text-center mb-4">
            Sign Up
          </h1>

          <form onSubmit={handleSignup} className="space-y-4">
            {/* First Name */}
            <div>
              <label className="label">
                <span className="label-text">First Name</span>
              </label>
              <input
                name="firstName"
                type="text"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="Enter first name"
                className="input input-bordered w-full"
                required
              />
            </div>

            {/* Last Name */}
            <div>
              <label className="label">
                <span className="label-text">Last Name</span>
              </label>
              <input
                name="lastName"
                type="text"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Enter last name"
                className="input input-bordered w-full"
                required
              />
            </div>

            {/* Email */}
            <div>
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                name="emailId"
                type="email"
                value={formData.emailId}
                onChange={handleChange}
                placeholder="Enter email"
                className="input input-bordered w-full"
                required
              />
            </div>

            {/* Password */}
            <div>
              <label className="label">
                <span className="label-text">Password</span>
              </label>

              <div className="relative">
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter password"
                  className="input input-bordered w-full pr-12"
                  required
                />

                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-lg"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "🙈" : "👁️"}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="alert alert-error py-2">
                <span>{error}</span>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="btn btn-primary w-full"
            >
              Sign Up
            </button>
          </form>

          {/* Login Link */}
          <p className="text-center text-sm mt-4">
            Already have an account?{" "}
            <Link to="/login" className="link link-primary font-medium">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
    </>
  );
}