import { Route, Routes } from 'react-router-dom'
import './App.css'
import Body from './component/Body'
import Login from './component/Login'
import Signup from './component/Signup'
import NotFound from './component/PageNotFound'

function App() {
  return (
    <>
    <Routes>
      <Route path='/' element= {<Body />}>
      <Route path='/login' element={<Login />} />
      <Route path='/signup' element ={<Signup />} />
      </Route>


      {/* 404 Catch-all route WITHOUT Navbar */}
      <Route path='*' element= {<NotFound />} />
    </Routes>   
    </>
  )
}

export default App
