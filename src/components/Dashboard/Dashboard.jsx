import React, { useState } from 'react'
import Header from '../Header'
import Aside from '../Aside'
import Footer from '../Footer'
import Content from '../Content'
import { Outlet, Route, Routes } from 'react-router-dom'

const Dashboard = () => {

  const [user, setUser] = useState()



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