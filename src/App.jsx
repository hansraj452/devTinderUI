import { Route, Routes } from 'react-router-dom'
import './App.css'
import Body from './component/Body'
import Login from './component/Login'
import Signup from './component/Signup'
import NotFound from './component/PageNotFound'
import Feed from './component/Feed'
import Profile from './component/Profile'

function App() {  
  return (
    <>
    <Routes>
      <Route  element= {<Body />} >
      <Route path='/' element={<Feed />} />
      <Route path='/profile' element={<Profile />} />
      </Route>
      <Route path='/login' element={<Login />} />
      <Route path='/signup' element ={<Signup />} />
      {/* 404 Catch-all route WITHOUT Navbar */}
      <Route path='*' element= {<NotFound />} />
    </Routes>   
    </>
  )
}

export default App
