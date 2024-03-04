import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

function PrivateComp() {
    const auth = localStorage.getItem('users');

  return (
    auth ? <Outlet/> : <Navigate to="/signup" />    
  )
}

export default PrivateComp