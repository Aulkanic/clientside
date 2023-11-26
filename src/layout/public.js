import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { RouteUrl } from '../routes/routes';
import _ from 'lodash';
import { useSelector } from 'react-redux';

export default function Public() {
  const user = useSelector((state) => state.user);
  return !_.isNil(user.info) ? (
    <Navigate to={RouteUrl.DASHBOARD} replace />
  ) : (
    <Outlet />
  );
}
