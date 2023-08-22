import React, { useState } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import LockAdmin from './Admin/LockAdmin'


const ProtectedAdmin = () => {
    const [isLogged, setIsLogged] =useState(localStorage.getItem('token'))
    const [access, setAccess] = useState(false)

    if(isLogged && access){
        return  <Outlet/>
   }else{
      return  <LockAdmin setAccess={setAccess}/>
     }
}

export default ProtectedAdmin