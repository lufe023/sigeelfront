import React, { useState } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import Home from './Home/Home'

const ProtectedRoutes = () => {
const [isLogged, setIsLogged] =useState(localStorage.getItem('token'))

    if(isLogged){
       return  <Outlet/>
    }else{
       return  <Navigate to='/' />
    }
 
}

export default ProtectedRoutes