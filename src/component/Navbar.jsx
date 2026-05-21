/* eslint-disable no-unused-vars */
import { Link, useNavigate } from "react-router-dom";
import devTinderlogo from "../assets/devTinder.png";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { CONSTANT } from "../utils/constant";
import { removeUser } from "../utils/userSlice";
import Toast from "./Toast";
import { useState } from "react";
const Navbar = () => {
  const [toast, setToast] = useState({
    show: false,
    type: "",
    message: "",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user);
  const handleLogout = async () => {
    try {
      const res = await axios.post(
        CONSTANT.BASE_URL + "/logout",
        {},
        {
          withCredentials: true,
        },
      );
      setToast({
        show: true,
        type: "info",
        message: res?.data,
      });
      dispatch(removeUser());
      navigate("/login"); 
    } catch (err) {
      navigate("/*");
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
      <div className="navbar bg-base-300 shadow-sm">
        <div className="flex-1 flex items-center gap-2">
          <Link to={"/"} className="btn btn-ghost text-xl">
            Dev-Tinder
          </Link>
          <img src={devTinderlogo} alt="Dev-Tinder" className="w-10 h-10" />
        </div>
        <div className="flex gap-2 px-5">
          <div className="dropdown dropdown-end">
            {userData?.photoURL && (
              <div className=" flex gap-2 items-center ">
                <h1>{userData?.firstName + userData?.lastName}</h1>
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle avatar"
                >
                  <div className="w-10 rounded-full">
                    <img
                      alt="Tailwind CSS Navbar component"
                      src={userData?.photoURL}
                    />
                  </div>
                </div>
              </div>
            )}
            <ul
              tabIndex="-1"
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link to={"/profile"} className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </Link>
              </li>
              <li>
                <Link>Settings</Link>
              </li>
              <li>
                <Link onClick={handleLogout}>Logout</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
