import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Aboutme from './components/Aboutme';
import Dashboard from './components/Dashboard/Dashboard';
import Home from './components/Home/Home';
import Error404 from './components/Error404';
import TasksBoard from './components/Todo/TasksBoard';
import ScrollToTop from './components/ScrollToTop';
import ProtectedRoutes from './components/ProtectedRoutes';
import LogGout from './components/Users/LogGout';
import ForgotPassword from './components/Users/ForgotPassword';
import RecoverPassword from './components/Users/RecoverPassword';
import UserDashBoard from './components/UserDashboard/UserDashBoard';
import MyPeople from './components/Census/MyPeople';
import People from './components/Census/People';
import SeeBallot from './components/Ballot/SeeBallot';
import PreRegister from './components/Users/PreRegister';
import PeopleByUser from './components/UserDashboard/PeopleByUser';
import Polls from './components/Polls/Polls';
import Teams from './components/Teams/Teams';
import TeamView from './components/Teams/TeamView';
import LockScreen from './components/Admin/LockScreen';
import ProtectedAdmin from './components/ProtectedAdmin';
import Campains from './components/Admin/Campains';
import MyPeoplePrint from './components/Census/MyPeoplePrint';
import CitizenByCollege from './components/Precints/CitizenByCollege';
import MyPeoplePrintB from './components/Census/MyPeoplePrintB';
import Informs from './components/Admin/Informs/Informs';
import SistemConfiguration from './components/Admin/SistemConfiguration';
import UserAdministrator from './components/UserDashboard/UserAdministrator';
import Delegate from './components/Admin/Delegate/Delegate';


function App() {


  return (
    <div className='wrapper'>
      <ScrollToTop/>
      <Routes>
      <Route path='/' element={<Home/>}/>
      <Route element={<ProtectedRoutes/>}>
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path='/aboutme' element={<Aboutme/>}/>
        <Route path='/tasks' element={<TasksBoard/>}/>
        <Route path='/tasks/:id' element={<TasksBoard/>}/>
        <Route path='/mypeople' element={<MyPeople/>}/>
        <Route path='/printmypeople' element={<MyPeoplePrint/>}/>
        <Route path='/printmyconcurrencia' element={<MyPeoplePrintB/>}/>
        <Route path='/mypeople/:id' element={<People/>}/>
        <Route path='/people/poll/:id/:name' element={<Polls/>}/>
        <Route path='/teams' element={<Teams/>}/>
        <Route path='/teams/:id' element={<TeamView/>}/>
        <Route path='/precints' element={<CitizenByCollege/>}/>
        <Route path='/Delegate' element={<Delegate/>}/>
      </Route>

      {/* Proteccion para administracion */}
      <Route element={<ProtectedAdmin/>}>
      <Route path='/campains' element={<Campains/>}/>
      <Route path='/informs' element={<Informs/>}/>
      <Route path='/admin' element={<SistemConfiguration/>}/>
      <Route path='/ballot' element={<SeeBallot/>}/>
      <Route path='/users' element={<UserDashBoard/>}/>
      <Route path='/users/:id/' element={<UserAdministrator/>}/>
      <Route path='/peoplebyuser/:id' element={<PeopleByUser/>}/>
   
      </Route>

      <Route path='*' element={<Error404/>}/>
      <Route path='/preregister' element={<PreRegister/>}/>
      <Route path='/logout' element={<LogGout/>}/>

      <Route path='/forgotPassword' element={<ForgotPassword/>}/>
      <Route path='/recoverypassword/:id' element={<RecoverPassword/>}/>
      </Routes>
      </div>
  )
}

export default App
