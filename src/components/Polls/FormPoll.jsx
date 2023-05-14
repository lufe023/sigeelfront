import React, { useState } from 'react'
import "./FormPoll.css"
const FormPoll = ({candidates}) => {

  const [activeTab, setActiveTab] = useState(1);

  const changeTab = (tabNumber) => {
    setActiveTab(tabNumber);
  };

  const presidentes = candidates?.filter((filtro)=> filtro.nomination == "Presidente")
  const senadores = candidates?.filter((filtro)=> filtro.nomination == "Senador/a")
  const diputados = candidates?.filter((filtro)=> filtro.nomination == "Diputado/a")
  const alcaldes = candidates?.filter((filtro)=> filtro.nomination == "Alcalde Municipal")
  const regidores = candidates?.filter((filtro)=> filtro.nomination == "Regidor Municipal")
  const directoresMun = candidates?.filter((filtro)=> filtro.nomination == "Director Municipal")
  const consejalMun = candidates?.filter((filtro)=> filtro.nomination == "Consejal Distrital")

 
  return (
    <>
<div className="tabs">


      <div className="tab-content">
        <div
          id="content1"
          className={`formcontent  ${activeTab === 1 ? 'active' : ''}`}>
          <h5>Información del Elector (1)</h5>
        
        <div className="form-group">
        <label>Partido de preferencia</label>
        <select className="custom-select" name='preferedParty'>
        <optgroup>
          <option>Elige</option>
          </optgroup>
          <option>PLD</option>
          <option style={{backgroundColor:"#2596be"}}>PRM</option>
          <option>FUPU</option>
          <option>Otro</option>
          <option>Ninguno</option>
        </select>
        </div>

        <div className="form-group">
        <label>Tipo de Elector </label>
        <select className="custom-select">
          <option>Duro</option>
          <option>Coyuntural</option>
        </select>
        </div>

          <a class="btn btn-primary margin" onClick={() => changeTab(activeTab+1)}>Siguiente</a>
        </div>
        
        <div
          id="content2"
          className={`formcontent  ${activeTab === 2 ? 'active' : ''}`}
        >
          <h5>Candidatos Distritales (2)</h5>
         {/* Select de consejales Distritales */}
      
        <div className="form-group">
        <label>Consejal Distrital</label>
        <select className="custom-select">
          <option>Null</option>
          {
            consejalMun?.map(consejal=>
              <option value={consejal.candidateId}>{consejal.name} | {consejal.partyAcronym}</option>
            )
          }
        </select>
      </div>

      {/* Select de directores Distritales */}
        <div className="form-group">
        <label>Directores distritales</label>
        <select className="custom-select">
          <option>Null</option>
          {
            directoresMun?.map(director=>
              <option value={director.candidateId}>{director.name} | {director.partyAcronym}</option>
            
            )
          }
        </select>
      </div>

          <a class="btn btn-primary margin" onClick={() => changeTab(activeTab-1)}>Atras</a>
          <a class="btn btn-primary margin" onClick={() => changeTab(activeTab+1)}>Siguiente</a>
        </div>
        <div
          id="content3"
          className={`formcontent  ${activeTab === 3 ? 'active' : ''}`}
        >
          <h5>Candidatos Municipales (3)</h5>

          
      {/* Select regidores municipales */}
      <div className="form-group">
        <label>Regidores Municipales</label>
        <select className="custom-select">
          <option>Null</option>
          {
            regidores?.map(regidor=>
              <option value={regidor.candidateId}>{regidor.name} | {regidor.partyAcronym}</option>
            )
          }
        </select>
      </div>

      {/* select de alcaldes municipales*/}
      <div className="form-group">
        <label>Alcaldes</label>
        <select className="custom-select">
          <option>Null</option>
          {
            alcaldes?.map(alcalde=>
              <option value={alcalde.candidateId}>{alcalde.name} | {alcalde.partyAcronym}</option>
            
            )
          }
        </select>
      </div>
          <a class="btn btn-primary margin" onClick={() => changeTab(activeTab-1)}>Atras</a>
          <a class="btn btn-primary margin" onClick={() => changeTab(activeTab+1)}>Siguiente</a>
        </div>
        <div
          id="content4"
          className={`formcontent  ${activeTab === 4 ? 'active' : ''}`}
        >
          <h5>Candidatos Congresuales (4)</h5>
               {/* Select diputados */}
      <div className="form-group">
        <label>Diputados</label>
        <select className="custom-select">
          <option>Null</option>
          {
            diputados?.map(diputado=>
              <option value={diputado.candidateId}>{diputado.name} | {diputado.partyAcronym} </option>
            )
          }
        </select>
    </div> 

      {/*Selec de Senadores */}
      <div className="form-group">
        <label>Senadores</label>
        <select className="custom-select">
          <option>Null</option>
          {
            senadores?.map(senador=>
              <option value={senador.candidateId}>{senador.name} | {senador.partyAcronym}</option>
            
            )
          }
        </select>
      </div>
          <a class="btn btn-primary margin" onClick={() => changeTab(activeTab-1)}>Atras</a>
          <a class="btn btn-primary margin" onClick={() => changeTab(activeTab+1)}>Siguiente</a>
        </div>
        <div
          id="content5"
          className={`formcontent ${activeTab === 5 ? 'active' : ''}`}
        >
          <h5>Candidatos Presidenciales (5)</h5>
                {/*Selec de Presidentes */}
      <div className="form-group">
        <label>Presidentes</label>
        <select className="custom-select">
          <option>Null</option>
          {
            presidentes?.map(presidente=>
              <option value={presidente.candidateId}>{presidente.name} | {presidente.partyAcronym}</option>
            
            )
          }
        </select>
      </div>
          
          <div style={{display:"flex", justifyContent:"space-between"}}>
          <a class="btn btn-primary margin" onClick={() => changeTab(activeTab-1)}>Atras</a>
          
          </div>
        </div>
      </div>
      
    </div>
    <div className='card-footer' style={{display:"flex", justifyContent:"end"}}>
          <button type="submit" className="btn btn-success">Guardar</button>
        </div>

  </>
  )
}

export default FormPoll