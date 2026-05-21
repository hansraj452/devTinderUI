/* eslint-disable no-unused-vars */
import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import axios from "axios";
import { CONSTANT } from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useEffect } from "react";

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const user = useSelector((state) => state.user);

  const fetchUser = async () => {
    if (user) return;
    try {
      const res = await axios.get(
        CONSTANT.BASE_URL + "/profile/view",
        {
          withCredentials: true,
        }
      );

      dispatch(addUser(res?.data.user));
    } catch (err) {
      navigate("/login");
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

export default Body;