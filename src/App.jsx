import axios from 'axios'
import { useEffect, useState } from 'react'
import './App.css'
import Aside from './components/Aside'
import Content from './components/Content'
import Footer from './components/Footer'
import Header from './components/Header'
import RightMenu from './components/RightMenu'

function App() {
  const [census, setCensus] = useState('loading')

  useEffect(() => {
    const URL = 'https://sigeel.onrender.com/api/v1/census'
    axios.get(URL)
    .then(res => setCensus(res.data))
    .catch(err => console.log(err))
   }, [])
  
   console.log(census)
  return (
    <div className="wrapper">
      <Header/>
      <Aside/>
      <Content/>
      <RightMenu/>
      <Footer/>
      
    </div>
  )
}

export default App
