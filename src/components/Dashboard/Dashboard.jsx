import React, { useEffect, useState } from 'react'
import Header from '../Header'
import Aside from '../Aside'
import Footer from '../Footer'
import Content from '../Content'

const Dashboard = () => {

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