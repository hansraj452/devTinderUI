import axios from "axios";
import { CONSTANT } from "../utils/constant";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnection, removeConnection } from "../utils/connectionSlice";
import { Link } from "react-router-dom";

const ViewConnection = () => {
  const connections = useSelector((state) => state.connection);
  const dispatch = useDispatch();
  const fetchConnections = async () => {
    try {
      dispatch(removeConnection());
      const connections = await axios.get(
        CONSTANT.BASE_URL + "/user/connections",
        {
          withCredentials: true,
        },
      );
      dispatch(addConnection(connections.data.data));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections) return;
  if (connections.length == 0)
    return (
      <>
        <h1 className="flex justify-center text-2xl my-10 text-green-300">
          No conections found
        </h1>
      </>
    );

  return (
    <div className="min-h-screen bg-base-200 p-6 pb-24">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">My Connections</h1>

        <div className="flex flex-col gap-5">
          {connections?.map((user) => (
            <div
              key={user._id}
              className="card bg-base-100 shadow-md border border-base-300"
            >
              <div className="card-body">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">
                  {/* User Info */}
                  <div className="flex items-center gap-5">
                    <div className="avatar">
                      <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                        <img src={user.photoURL} alt={"img"} />
                      </div>
                    </div>

                    <div>
                      <h2 className="card-title text-2xl">
                        {user.firstName} {user.lastName}
                      </h2>

                      <p className="text-base-content/70">Age: {user.age}</p>

                      <p className="text-base-content/70">
                        Gender: {user.gender}
                      </p>
                    </div>
                  </div>

                  {/* Connection Badge */}
                  <div className=" flex flex-col gap-5">
                    <button className="btn btn-primary btn-outline">
                      Connected
                    </button>
                    <Link to ={`/chat/${user._id}`} style={{ display: "inline-block" }}>
                      <button className="btn btn-primary btn-outline ">
                        Message 💬
                      </button>
                    </Link>
                  </div>
                </div>

                {/* About Section */}
                <div className="mt-4">
                  <h3 className="font-semibold text-lg mb-1">About</h3>

                  <p className="text-base-content/70">{user.about}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ViewConnection;
