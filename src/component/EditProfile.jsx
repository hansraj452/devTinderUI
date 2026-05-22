import { useState } from "react";
import UserCard from "./UserCard";
import axios from "axios";
import { CONSTANT } from "../utils/constant";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import Toast from "./Toast";

const EditProfile = ({ user }) => {

    const dispatch = useDispatch()

  const initialData = {
    firstName: user.firstName,
    lastName: user.lastName,
    photoURL: user.photoURL,
    about: user.about,
    age: user.age,
    gender: user.gender,
    skill: user.skill,
  };

  const [formData, setFormData] = useState(initialData);
  const [toast , setToast] = useState({
    show:false,
    type:"",
    message:""
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Reset form to previous/original values
  const handleReset = () => {
    setFormData(initialData);
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    try{
        const res = await axios.patch(CONSTANT.BASE_URL + '/profile/edit' , 
        formData , 
        {
            withCredentials: true
        }
    )
    console.log(res)
    dispatch(addUser(res?.data?.data))
    setToast({
        show:true,
        type:"success",
        message:res?.data?.message
    })
    }
    catch(err){
        setToast({
        show:true,
        type:"success",
        message:err
    })
    }
    
  };

  return (
    <>
    {toast.show && (
        <div className="fixed top-5 right-5 z-50">
          <Toast type={toast.type} message={toast.message} />
        </div>
      )}
    <div className=" flex">
      <div className="card bg-base-200 w-96 shadow-xl p-6">
        <h2 className="text-2xl font-bold mb-5 text-center">
          Edit Profile
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
          {/* First Name */}
          <div>
            <label className="label">
              <span className="label-text">First Name</span>
            </label>

            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              className="input input-bordered w-full"
              value={formData.firstName}
              onChange={handleChange}
            />
          </div>

          {/* Last Name */}
          <div>
            <label className="label">
              <span className="label-text">Last Name</span>
            </label>

            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              className="input input-bordered w-full"
              value={formData.lastName}
              onChange={handleChange}
            />
          </div>

          {/* Photo URL */}
          <div>
            <label className="label">
              <span className="label-text">Photo URL</span>
            </label>

            <input
              type="text"
              name="photoURL"
              placeholder="Photo URL"
              className="input input-bordered w-full"
              value={formData.photoURL}
              onChange={handleChange}
            />
          </div>

          {/* About */}
          <div>
            <label className="label">
              <span className="label-text">About</span>
            </label>

            <textarea
              name="about"
              placeholder="About"
              className="textarea textarea-bordered w-full"
              value={formData.about}
              onChange={handleChange}
            ></textarea>
          </div>

          {/* Age */}
          <div>
            <label className="label">
              <span className="label-text">Age</span>
            </label>

            <input
              type="number"
              name="age"
              placeholder="Age"
              className="input input-bordered w-full"
              value={formData.age}
              onChange={handleChange}
            />
          </div>

          {/* Gender */}
          <div>
            <label className="label">
              <span className="label-text">Gender</span>
            </label>

            <div className="flex gap-6">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  className="radio radio-primary"
                  checked={formData.gender === "male"}
                  onChange={handleChange}
                />
                Male
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  className="radio radio-primary"
                  checked={formData.gender === "female"}
                  onChange={handleChange}
                />
                Female
              </label>
            </div>
          </div>

          {/* Skills */}
          <div>
            <label className="label">
              <span className="label-text">Skills</span>
            </label>

            <input
              type="text"
              name="skill"
              placeholder="Skills"
              className="input input-bordered w-full"
              value={formData.skill}
              onChange={handleChange}
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-4 mt-2">
            <button
              type="submit"
              className="btn btn-primary flex-1"
            >
              Update
            </button>

            <button
              type="button"
              onClick={handleReset}
              className="btn btn-outline flex-1"
            >
              Reset
            </button>
          </div>
        </form>
      </div>
      <UserCard user={formData} />
    </div>
    </>
  );
};

export default EditProfile;