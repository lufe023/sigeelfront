import { Route, Routes } from 'react-router-dom'
import './App.css'
import Aboutme from './components/Aboutme'
import Dashboard from './components/Dashboard/Dashboard'
import Home from './components/Home/Home'
import Error404 from './components/Error404'
import Me from './components/Users/Me'
import TasksBoard from './components/Todo/TasksBoard'
import ScrollToTop from './components/ScrollToTop'
import ProtectedRoutes from './components/ProtectedRoutes'
import LogGout from './components/Users/LogGout'
import ForgotPassword from './components/Users/ForgotPassword'
import RecoverPassword from './components/Users/RecoverPassword'
import UserDashBoard from './components/UserDashboard/UserDashBoard'
import MyPeople from './components/Census/MyPeople'
import People from './components/Census/People'
import SeeBallot from './components/Ballot/SeeBallot'
import PreRegister from './components/Users/PreRegister'
import PeopleByUser from './components/UserDashboard/PeopleByUser'
import Polls from './components/Polls/Polls'
import Teams from './components/Teams/Teams'

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
        <Route path='/users' element={<UserDashBoard/>}/>
        <Route path='/mypeople' element={<MyPeople/>}/>
        <Route path='/mypeople/:id' element={<People/>}/>
        <Route path='/ballot' element={<SeeBallot/>}/>
        <Route path='/peoplebyuser/:id' element={<PeopleByUser/>}/>
        <Route path='/people/poll/:id/:name' element={<Polls/>}/>
        <Route path='/teams' element={<Teams/>}/>
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
