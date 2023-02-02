import { Route, Routes } from 'react-router-dom'
import './App.css'
import Aboutme from './components/Aboutme'
import Dashboard from './components/Dashboard/Dashboard'
import Home from './components/Home/Home'
import Error404 from './components/Error404'
import Me from './components/Users/Me'
import TasksBoard from './components/Todo/TasksBoard'
import ScrollToTop from './components/ScrollToTop'
import { useDispatch, useSelector } from 'react-redux'
import { incremente } from './store/slices/counter.slice'
import { useState } from 'react'
import ProtectedRoutes from './components/ProtectedRoutes'
import LogGout from './components/Users/LogGout'



function App() {
  
  return (
    <div>
      <ScrollToTop/>

      <Routes>

      <Route path='/' element={<Home/>}/>

      <Route element={<ProtectedRoutes/>}>
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path='/aboutme' element={<Aboutme/>}/>
        <Route path='/me/' element={<Me/>}/>
        <Route path='/tasks' element={<TasksBoard/>}/>
        <Route path='/tasks/:id' element={<TasksBoard/>}/>
        <Route path='*' element={<Error404/>}/>
      </Route>
      <Route path='/logout' element={<LogGout/>}/>
      </Routes>
      </div>
  )
}

export default App
