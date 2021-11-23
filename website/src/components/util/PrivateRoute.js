import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

function isAuth() {
    return localStorage.getItem('Authorization')
}

export function PrivateRoute() {
    return isAuth() ? <Outlet /> : <Navigate to="/login" />;
}

export function PublicRoute() {
    return isAuth() ? <Navigate to="/" /> : <Outlet />;
}