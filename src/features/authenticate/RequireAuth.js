import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useSelector  } from "react-redux";
import { selectCurrentToken } from "./authSlice";
import swal from 'sweetalert';

import React from 'react'

const RequireAuth = () => {
    const token = useSelector(selectCurrentToken)
    const location = useLocation()
  return (
    token
    ? <Outlet/>
    :        swal('Invalid Email or Password') && <Navigate to='/login' state={{ from: location}} replace />
  )
}

export default RequireAuth