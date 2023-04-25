import React, { useEffect, useState } from 'react'
import Header from '../Header'
import Aside from '../Aside'
import Footer from '../Footer'
import Content from '../Content'
import { Outlet, Route, Routes } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setUserData } from '../../store/slices/user.slice'
import getConfig from '../../utils/getConfig'
import axios from 'axios'

const Dashboard = () => {

  const dispatch = useDispatch()

  const getUserbyId = () => { 
    const URL = `${import.meta.env.VITE_API_SERVER}/api/v1/users/me`
      axios.get(URL, getConfig())
      .then(res => {
        dispatch(setUserData(res.data))
      })
      .catch(err => console.log(err))
  }
  useEffect(() => {
  getUserbyId()
  }, [])

  return (
        <div className='wrapper'>
          <Header/>
          <Aside/>
          <Content/>
          <Footer/>
        </div>

  )
}

export default Dashboard