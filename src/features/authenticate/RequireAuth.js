import { useLocation, Navigate, Outlet } from "react-router-dom";
import swal from 'sweetalert';
import { useSelector } from 'react-redux'
import React from 'react'

const RequireAuth = () => {
    const location = useLocation();
    const { LoggedIn } = useSelector((state) => state.login);
    const isloggin = LoggedIn;
    console.log(isloggin)
  return (
    isloggin === true
    ? <Outlet/>
    : swal('Please Login to your Account to continue..') && <Navigate to='/login' state={{ from: location}} replace />
  )
}

export default RequireAuth