import { Route, Routes } from 'react-router-dom'
import './App.css'
import Body from './component/Body'
import Login from './component/Login'
import NotFound from './component/PageNotFound'
import Feed from './component/Feed'
import Profile from './component/Profile'
import RequestReceived from './component/RequestReceived'
import ViewConnection from './component/ViewConnection'
import UpdatePassword from './component/UpdatePassword'
import SignupPage from './component/SignupPage'
import Premium from './component/Premium'
import Chat from './component/Chat'

function App() {  
  return (
    <>
    <Routes>
      <Route  element= {<Body />} >
      <Route path='/' element={<Feed />} />
      <Route path='/profile' element={<Profile />} />
      <Route path='/requestrecivied' element={<RequestReceived />} />
      <Route path ='/chat/:targetUserId' element = {<Chat />} />
      <Route path='/premium' element = {<Premium />} />
      <Route path='/viewconnection' element={<ViewConnection />} />
       <Route path= '/updatepassword' element={<UpdatePassword />} />
      </Route>
      <Route path='/login' element={<Login />} />
      <Route path='/signup' element ={<SignupPage />} />
  
      {/* 404 Catch-all route WITHOUT Navbar */}
      <Route path='*' element= {<NotFound />} />
    </Routes>   
    </>
  )
}

export default App
