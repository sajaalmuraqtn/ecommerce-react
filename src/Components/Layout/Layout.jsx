import React from 'react'
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'
import { Outlet, useNavigate } from 'react-router-dom'

export default function Layout ({user,setUser}) {
  let navigate=useNavigate()
  function logout() {
  setUser(null);
  localStorage.removeItem("userToken");
  navigate('/login')
  }

  return (
    <>
  
     <Navbar user={user} logout={logout}/>
    <div className="container">
     <Outlet>

     </Outlet>
    </div>
     <Footer/>
     
    </>
  )
}
