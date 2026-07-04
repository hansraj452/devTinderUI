import axios from "axios";
import { CONSTANT } from "../utils/constant";
import { useDispatch } from "react-redux";
import { removefeed } from "../utils/feedSlice";
import blueTick from "../assets/icons8-blue-tick.svg";

const UserCard = ({ user }) => {
  const {
    _id,
    firstName,
    lastName,
    photoURL,
    skill,
    about,
    age,
    gender,
    isPremium,
  } = user;
  const dispatch = useDispatch();
  const handleRequest = async (status, id) => {
    try {
      await axios.post(
        `${CONSTANT.BASE_URL}/request/send/${status}/${id}`,
        {},
        {
          withCredentials: true,
        },
      );
      dispatch(removefeed(id));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[40%] px-4">
      <div className="card w-96 bg-base-300 shadow-2xl border border-base-300 hover:shadow-primary/20 hover:-translate-y-0.5 transition-all duration-300 overflow-hidden">
        {/* Profile Image */}
        <figure>
          <img
            src={photoURL}
            alt="userProfile"
            className="h-65 w-full object-cover"
          />
        </figure>

        {/* Card Body */}
        <div className="card-body items-center text-center">
          {/* Name */}
          <h2 className="card-title text-3xl font-bold break-words flex items-center justify-center gap-2">
            <span>
              {firstName} {lastName}
            </span>
            {isPremium && (
              <img
                src={blueTick}
                alt="Premium User"
                className="w-6 h-6 inline-block shrink-0"
              />
            )}
          </h2>

          {/* Age + Gender */}
          <div className="flex gap-2 mt-1 flex-wrap justify-center">
            <div className="badge badge-secondary">{age} Years</div>

            <div className="badge badge-accent capitalize">{gender}</div>
          </div>

          {/* Skills */}
          <div className="w-full mt-3">
            <h3 className="font-semibold text-primary mb-2">Skills</h3>

            <div className="flex flex-wrap gap-2 justify-center max-w-full">
              {skill ? (
                Array.isArray(skill) ? (
                  skill.map((s, index) => (
                    <span
                      key={index}
                      className="badge badge-outline badge-lg max-w-full break-all whitespace-normal text-center py-3"
                    >
                      {s}
                    </span>
                  ))
                ) : (
                  <span className="badge badge-outline badge-lg max-w-full break-all whitespace-normal text-center py-3">
                    {skill}
                  </span>
                )
              ) : (
                <span className="text-base-content/60">No skills added</span>
              )}
            </div>
          </div>

          {/* About */}
          <p className="mt-4 text-sm text-base-content/70 wrap-break-word whitespace-pre-wrap">
            {about || "No bio available"}
          </p>

          {/* Buttons */}
          <div className="card-actions mt-4 w-full flex justify-between">
            <button
              className="btn btn-outline btn-error w-[48%]"
              onClick={() => handleRequest("ignored", _id)}
            >
              Ignore
            </button>

            <button
              className="btn btn-primary w-[48%]"
              onClick={() => handleRequest("interested", _id)}
            >
              Interested
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
