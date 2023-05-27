import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useSelector  } from "react-redux";
import { selectCurrentToken } from "./authSlice";
import swal from 'sweetalert';

import React from 'react'

const RequireAuth = () => {
    const token = useSelector(selectCurrentToken)
    const location = useLocation();
    const isloggin = localStorage.getItem('LoggedIn');
    console.log(isloggin)
  return (
    isloggin === 'true'
    ? <Outlet/>
    :        swal('Please Login to your Account to continue..') && <Navigate to='/login' state={{ from: location}} replace />
  )
}

export default RequireAuth