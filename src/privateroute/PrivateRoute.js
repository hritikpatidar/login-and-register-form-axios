import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';

export default function PrivateRoute() {
    let token1 = localStorage.getItem('auth_token') == null ? false : true;
    return (
       <>
            {token1 ? <Outlet /> : <Navigate to="/login" />} ;
           
       </>
    )
}
