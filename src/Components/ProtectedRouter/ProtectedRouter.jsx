import React from 'react'
import Cart from '../Cart/Cart'
import { Navigate } from 'react-router-dom'

export default function ProtectedRouter(children) {
  if (localStorage.getItem('userToken')) {
    return <><Cart/></>
  } else {
   return <Navigate to='/login'></Navigate>
  }
}

