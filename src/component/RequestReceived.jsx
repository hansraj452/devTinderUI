import axios from "axios";
import { CONSTANT } from "../utils/constant";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequest } from "../utils/requestSlice";
const RequestReceived = () => {
  const dispatch = useDispatch();
  const request = useSelector((state) => state.request);

  const reviewRequest = async (status, _id) => {
    try {
      await axios.post(
        `${CONSTANT.BASE_URL}/request/review/${status}/${_id}`,
        {},
        {
          withCredentials: true,
        },
      );
      dispatch(removeRequest(_id));
    } catch (err) {
      console.log(err);
    }
  };

  const fetchRequests = async () => {
    try {
      const requests = await axios.get(
        CONSTANT.BASE_URL + "/user/requests/recieved",
        {
          withCredentials: true,
        },
      );
      dispatch(addRequests(requests?.data?.data));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (!request) return;
  if (request.length === 0)
    return (
      <h1 className="text-3xl font-bold text-center mb-8">
        No Connection Request Pending 🫡🫡🫡{" "}
      </h1>
    );

  return (
    <div className="min-h-screen bg-base-200 p-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">
          Pending Requests
        </h1>

        <div className="flex flex-col gap-5">
          {request.map((user) => (
            <div
              key={user.fromUserId.id}
              className="card bg-base-100 shadow-md border border-base-300"
            >
              <div className="card-body">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">
                  {/* Left Section */}
                  <div className="flex items-center gap-5">
                    <div className="avatar">
                      <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                        <img src={user.fromUserId.photoURL} alt={user.name} />
                      </div>
                    </div>
                    <div>
                      <h2 className="card-title text-2xl">
                        {user.fromUserId.firstName} {user.fromUserId.lastName}
                      </h2>
                      {user.fromUserId.age && (
                        <p className="text-base-content/70">
                          Age: {user.fromUserId.age}
                        </p>
                      )}
                      {user.fromUserId.gender && (
                        <p className="text-base-content/70">
                          Gender: {user.fromUserId.gender}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Buttons */}
                  <div className="flex gap-3">
                    <button
                      onClick={() => reviewRequest("accepted", user._id)}
                      className="btn btn-success"
                    >
                      Accept
                    </button>

                    <button
                      onClick={() => reviewRequest("rejected", user._id)}
                      className="btn btn-error"
                    >
                      Reject
                    </button>
                  </div>
                </div>

                {/* About Section */}
                <div className="mt-4">
                  <h3 className="font-semibold text-lg mb-1">About</h3>
                  <p className="text-base-content/70">
                    {user.fromUserId.about}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RequestReceived;
