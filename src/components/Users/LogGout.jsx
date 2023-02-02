import React from 'react'
import { Navigate } from 'react-router-dom';

const LogGout = () => {

    localStorage.clear();
     return  <Navigate to='/' />

}

export default LogGout