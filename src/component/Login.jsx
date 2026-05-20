import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import Toast from "./Toast";
import { CONSTANT } from "../utils/constant";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [emailId, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Toast State
  const [toast, setToast] = useState({
    show: false,
    type: "",
    message: "",
  });

  const handleLogin = async () => {
    try {
      const res = await axios.post(
      CONSTANT.BASE_URL + '/login',
        {
          emailId,
          password,
        },
        {
          withCredentials: true,
        },
      );

      dispatch(addUser(res.data.userData));

      // SHOW SUCCESS TOAST
      setToast({
        show: true,
        type: "success",
        message: res?.data?.message,
      });

      // Navigate after 2 sec
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (err) {
      // SHOW ERROR TOAST
      setToast({
        show: true,
        type: "error",
        message: err?.response?.data?.message || "Login Failed",
      });
    }
  };

  return (
    <>
      {/* TOAST */}
      {toast.show && (
        <div className="fixed top-5 right-5 z-50">
          <Toast type={toast.type} message={toast.message} />
        </div>
      )}

      <div className="flex justify-center items-center my-8">
        <div className="card bg-base-300 w-96 shadow-sm">
          <div className="card-body">
            <h2 className="card-title flex justify-center">Login</h2>

            <div className="flex flex-col pt-1">
              <label className="py-2" htmlFor="Email">
                Email
              </label>

              <input
                id="Email"
                type="text"
                placeholder="abc@domain.com"
                className="input input-bordered w-24 md:w-auto"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="flex flex-col pb-1.5">
              <label className="py-2" htmlFor="Password">
                Password
              </label>

              <div className="relative md:w-auto">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter password"
                  className="input input-bordered w-full pr-10"
                  onChange={(e)=> setPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="absolute right-3 top-3"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "🙈" : "👁️"}
                </button>
              </div>
            </div>

            <div className="card-actions justify-center py-2">
              <button className="btn btn-primary" onClick={handleLogin}>
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
