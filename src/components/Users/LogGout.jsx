import React from 'react'
import { useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { setUserData } from '../../store/slices/user.slice';

const LogGout = () => {
const dispatch = useDispatch()

    localStorage.clear();
    dispatch(setUserData(""))
     return  <Navigate to='/' />

}

export default LogGout