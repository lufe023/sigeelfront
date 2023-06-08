import React from 'react'
import Header from '../Header'
import Aside from '../Aside'
import Content from '../Content'
import Footer from '../Footer'
import NewTeam from './NewTeam'
import TeamsList from './TeamsList'

const Teams = () => {
  

  return (
    <>
    <Header/>
    <Aside/>
    <div className='content-wrapper'>
    <section class="content-header">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-6">
            <h1>Equipos</h1>
          </div>
          <div class="col-sm-6">
            <ol class="breadcrumb float-sm-right">
              <li class="breadcrumb-item"><a href="#">Home</a></li>
              <li class="breadcrumb-item active">Equipos</li>
            </ol>
          </div>
        </div>
      </div>
    </section>
  
<section class="content">
<NewTeam/>
<TeamsList/>
</section>
    </div>
    
    <Footer/>
    </>
  )
}

export default Teams