import React, { useState } from 'react'
import { Navigate, Outlet } from 'react-router-dom'


const ProtectedRoutes = () => {
const [isLogged, setIsLogged] =useState(localStorage.getItem('token'))

   if(isLogged){
      return  <Outlet/>
   }else{
      return  <Navigate to='/' />
   }
}

export default ProtectedRoutes