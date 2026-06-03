import axios from "axios";
import { useState } from "react";
import { CONSTANT } from "../utils/constant";
import { useNavigate } from "react-router-dom";
import Toast from "./Toast";

const UpdatePassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [toast, setToast] = useState({
    show: false,
    type: "",
    message: "",
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const oldPassword = form.oldPassword.value;
    const newPassword = form.newPassword.value;
    const confirmPassword = form.confirmPassword.value;

    // Confirm password validation
    if (newPassword !== confirmPassword) {
      setToast({
        show: true,
        type: "error",
        message: "New password and confirm password do not match",
      });

      return;
    }

    const data = {
      password: oldPassword,
      newPassword,
    };

    try {
      const res = await axios.patch(
        CONSTANT.BASE_URL + "/profile/updatepassword",
        data,
        { withCredentials: true }
      );

      setToast({
        show: true,
        type: "success",
        message: res?.data?.message || "Password updated successfully",
      });

      // Redirect after 2 sec
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      console.log(err)
      setToast({
        show: true,
        type: "error",
        message: err || "Something went wrong",
      });
    }
  };

  return (
    <>
      {toast.show && (
        <div className="fixed top-5 right-5 z-50">
          <Toast type={toast.type} message={toast.message} />
        </div>
      )}

      <div className="min-h-screen flex items-center justify-center bg-base-200 px-4">
        <div className="card w-full max-w-md shadow-2xl bg-base-100">
          <div className="card-body">
            <h2 className="text-3xl font-bold text-center mb-6">
              Update Password
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Old Password */}
              <div>
                <label className="label">
                  <span className="label-text">Old Password</span>
                </label>

                <input
                  type={showPassword ? "text" : "password"}
                  name="oldPassword"
                  placeholder="Enter old password"
                  className="input input-bordered w-full"
                  required
                />
              </div>

              {/* New Password */}
              <div>
                <label className="label">
                  <span className="label-text">New Password</span>
                </label>

                <input
                  type={showPassword ? "text" : "password"}
                  name="newPassword"
                  placeholder="Enter new password"
                  className="input input-bordered w-full"
                  required
                />
              </div>

              {/* Confirm Password */}
              <div>
                <label className="label">
                  <span className="label-text">Confirm Password</span>
                </label>

                <input
                  type={showPassword ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="Confirm new password"
                  className="input input-bordered w-full"
                  required
                />
              </div>

              {/* Show Password */}
              <div className="form-control">
                <label className="label cursor-pointer justify-start gap-3">
                  <input
                    type="checkbox"
                    className="checkbox checkbox-primary"
                    checked={showPassword}
                    onChange={() =>
                      setShowPassword((prev) => !prev)
                    }
                  />

                  <span className="label-text">
                    Show Passwords
                  </span>
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="btn btn-primary w-full mt-4"
              >
                Update Password
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdatePassword;