import React from 'react'
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'
import { Outlet } from 'react-router-dom'

export default function Layout ({user}) {
  return (
    <>

     <Navbar user={user}/>
    <div className="container">
     <Outlet>

     </Outlet>
    </div>
     <Footer/>
     
    </>
  )
}
