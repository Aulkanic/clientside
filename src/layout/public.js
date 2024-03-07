import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import CustomNavbar from '../Components/Navbar';

export default function Public() {
  return (
    <div>
    <CustomNavbar />
    <Outlet />
    </div>

  );
}
