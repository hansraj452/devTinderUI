import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { Link, useNavigate } from "react-router-dom";
import Toast from "./Toast";
import { CONSTANT } from "../utils/constant";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [emailId, setEmail] = useState("singh@gmail.com");
  const [password, setPassword] = useState("SinghHarbajan@134");
  const [showPassword, setShowPassword] = useState(false);

  const [toast, setToast] = useState({
    show: false,
    type: "",
    message: "",
  });

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        `${CONSTANT.BASE_URL}/login`,
        {
          emailId,
          password,
        },
        {
          withCredentials: true,
        }
      );

      dispatch(addUser(res.data.userData));

      setToast({
        show: true,
        type: "success",
        message: res?.data?.message,
      });

      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (err) {
      setToast({
        show: true,
        type: "error",
        message: err?.response?.data?.message || "Login Failed",
      });
    }
  };

  return (
    <>
      {/* Toast */}
      {toast.show && (
        <div className="fixed top-5 right-5 z-50">
          <Toast type={toast.type} message={toast.message} />
        </div>
      )}

      <div className="min-h-[80vh] flex items-center justify-center px-4">
        <div className="card w-full max-w-md bg-base-300 shadow-xl">
          <div className="card-body">
            <h1 className="text-3xl font-bold text-center mb-2">
              Login
            </h1>

            {/* Email */}
            <div className="form-control">
              <label className="label" htmlFor="email">
                <span className="label-text">Email</span>
              </label>

              <input
                id="email"
                type="email"
                value={emailId}
                placeholder="abc@domain.com"
                className="input input-bordered w-full"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* Password */}
            <div className="form-control">
              <label className="label" htmlFor="password">
                <span className="label-text">Password</span>
              </label>

              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  placeholder="Enter password"
                  className="input input-bordered w-full pr-12"
                  onChange={(e) => setPassword(e.target.value)}
                />

                <button
                  type="button"
                  aria-label={
                    showPassword ? "Hide password" : "Show password"
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-lg"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "🙈" : "👁️"}
                </button>
              </div>
            </div>

            {/* Login Button */}
            <div className="mt-4">
              <button
                className="btn btn-primary w-full"
                onClick={handleLogin}
              >
                Login
              </button>
            </div>

            {/* Signup Link */}
            <p className="text-center text-sm mt-2">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="link link-primary font-medium"
              >
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;