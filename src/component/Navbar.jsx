import devTinderlogo from "../assets/devTinder.png";
import { useSelector } from "react-redux";
const Navbar = () => {
  const userData = useSelector((state) => state.user);

  return (
    <div className="navbar bg-base-300 shadow-sm">
      <div className="flex-1 flex items-center gap-2">
        <a className="btn btn-ghost text-xl">Dev-Tinder</a>
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
              <a className="justify-between">
                Profile
                <span className="badge">New</span>
              </a>
            </li>
            <li>
              <a>Settings</a>
            </li>
            <li>
              <a>Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
