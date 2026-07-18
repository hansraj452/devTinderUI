import axios from "axios";
import { CONSTANT } from "../utils/constant";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addfeed } from "../utils/feedSlice";
import UserCard from "./UserCard";

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();

  const fetchFeed = async () => {
    try {
      // Fetch only if feed is not already available
      if (feed && feed.length > 0) return;

      const res = await axios.get(CONSTANT.BASE_URL + "/feed", {
        withCredentials: true,
      });

      dispatch(addfeed(res?.data?.user || []));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchFeed();
  }, []);

  return (
    <div className="flex justify-center items-center pt-3">
      {feed === null || feed === undefined ? (
        <p>Loading...</p>
      ) : feed.length === 0 ? (
        <h2 className="text-xl font-semibold">
          No more users found.
        </h2>
      ) : (
        <UserCard user={feed[0]} />
      )}
    </div>
  );
};

export default Feed;