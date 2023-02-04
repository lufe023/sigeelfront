import React, { useState } from 'react'
import Header from '../Header'
import Aside from '../Aside'
import Footer from '../Footer'
import Content from '../Content'
import { Outlet, Route, Routes } from 'react-router-dom'
import { useDispatch } from 'react-redux'

const Dashboard = () => {

  const dispatch = useDispatch()





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