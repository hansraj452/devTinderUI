import axios from "axios";
import { CONSTANT } from "../utils/constant";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addfeed } from "../utils/feedSlice";
import UserCard from "./UserCard";
const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();
  const fetchfeed = async () => {
    try {
      if (feed) return;
      const res = await axios.get(CONSTANT.BASE_URL + "/feed", {
        withCredentials: true,
      });
      console.log(res);
      dispatch(addfeed(res?.data?.user));
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchfeed();
  }, []);
  console.log(feed);
  return (
    <>
      <div className="flex justify-center items-center pt-3">
        {feed && <UserCard user={feed[0]} />}
      </div>
    </>
  );
};

export default Feed;
