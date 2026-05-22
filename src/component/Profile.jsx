import { useSelector } from "react-redux"
import EditProfile from "./EditProfile"

const Profile = () => {
  const user = useSelector((state)=> state.user)
  return (
   <>
 { user && 
 <div className=" flex justify-center py-5" >
 <EditProfile user = {user} />
 </div>
 }
   </>
  )
}

export default Profile