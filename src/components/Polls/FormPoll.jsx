import React, { useState } from 'react'
const FormPoll = ({candidates, parties, poll, saved, setSaved}) => {
null
  const [activeTab, setActiveTab] = useState(1);
    //estado global para valores por defecto
    const [defaultValue, setDefaultValue] = useState({
      preferedParty: poll?.preferedParty,
      electorType: poll?.electorType,
      president: poll?.president,
      senator: poll?.senator, 
      diputy: poll?.diputy,
      mayor: poll?.mayor,
      councillor: poll?.councillor,
      districtDirector: poll?.districtDirector,
      districtCouncilor: poll?.districtCouncilor,
      alreadyVoted: poll?.alreadyVoted
    })

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
    {
      saved?"":<span className='saved btn-warning'><i className="fas fa-exclamation-triangle"></i> Hay datos pendientes por guardar</span>
    }
<div className="tabs">


      <div className="tab-content">   
        <div
          id="content1"
          className={`formcontent  ${activeTab === 1 ? 'active' : ''}`}>
          <h5>Información del Elector (1)</h5>
        
        <div className="form-group">
        <label>Partido de preferencia</label>
        <select className="custom-select" name='preferedParty'
        defaultValue={defaultValue.preferedParty}
        onChange={(e) => setDefaultValue({...defaultValue, preferedParty: e.target.value}, setSaved(false))} >

          <option>Incompleto</option>
          {
            parties?.map(party=>
              <option key={party.id} style={{backgroundColor:party.color}} value={party.id}>{party.partyAcronyms} - {party.partyName}</option>
            )
          }
        </select>
        </div>

        <div className="form-group">
        <label>Tipo de Elector </label>
        <select className="custom-select" name="electorType" onChange={()=> setSaved(false)}>
          <option >Incompleto</option>
          <option>Duro</option>
          <option>Coyuntural</option>
        </select>
        </div>
          <a className="btn btn-primary margin" onClick={() => changeTab(activeTab+1)}>Siguiente</a>
        </div>
        
        <div
          id="content2"
          className={`formcontent  ${activeTab === 2 ? 'active' : ''}`}
        >
          <h5>Candidatos Distritales (2)</h5>
         {/* Select de consejales Distritales */}
      
        <div className="form-group">
        <label>Consejal Distrital</label>
        <select className="custom-select"
        name="districtCouncilor"
        defaultValue={defaultValue.districtCouncilor}
        onChange={(e) => setDefaultValue({...defaultValue, districtCouncilor: e.target.value}, setSaved(false))}>
          <option >Incompleto</option>
          {
            consejalMun?.map(consejal=>
              <option key={consejal.candidateId} value={consejal.candidateId}>{consejal.name} | {consejal.partyAcronym}</option>
            )
          }
        </select>
      </div>

      {/* Select de directores Distritales */}
        <div className="form-group">
        <label>Directores distritales</label>
        <select className="custom-select"
        name="districtDirector"
        defaultValue={defaultValue.districtDirector}
        onChange={(e) => setDefaultValue({...defaultValue, districtDirector: e.target.value}, setSaved(false))}>
          <option >Incompleto</option>
          {
            directoresMun?.map(director=>
              <option value={director.candidateId}>{director.name} | {director.partyAcronym}</option>
            
            )
          }
        </select>
      </div>

          <a className="btn btn-primary margin" onClick={() => changeTab(activeTab-1)}>Atras</a>
          <a className="btn btn-primary margin" onClick={() => changeTab(activeTab+1)}>Siguiente</a>
        </div>
        <div
          id="content3"
          className={`formcontent  ${activeTab === 3 ? 'active' : ''}`}
        >
          <h5>Candidatos Municipales (3)</h5>

          
      {/* Select regidores municipales */}
      <div className="form-group">
        <label>Regidores Municipales</label>
        <select className="custom-select"
        name="councillor"
        defaultValue={defaultValue.councillor}
        onChange={(e) => setDefaultValue({...defaultValue, councillor: e.target.value}, setSaved(false))}>
          <option >Incompleto</option>
          {
            regidores?.map(regidor=>
              <option key={regidor.candidateId} value={regidor.candidateId}>{regidor.name} | {regidor.partyAcronym}</option>
            )
          }
        </select>
      </div>

      {/* select de alcaldes municipales*/}
      <div className="form-group">
        <label>Alcaldes</label>
        <select className="custom-select"
        name="mayor"
        defaultValue={defaultValue.mayor}
        onChange={(e) => setDefaultValue({...defaultValue, mayor: e.target.value}, setSaved(false))}>
          <option >Incompleto</option>
          {
            alcaldes?.map(alcalde=>
              <option key={alcalde.candidateId} value={alcalde.candidateId}>{alcalde.name} | {alcalde.partyAcronym}</option>
            
            )
          }
        </select>
      </div>
          <a className="btn btn-primary margin" onClick={() => changeTab(activeTab-1)}>Atras</a>
          <a className="btn btn-primary margin" onClick={() => changeTab(activeTab+1)}>Siguiente</a>
        </div>
        <div
          id="content4"
          className={`formcontent  ${activeTab === 4 ? 'active' : ''}`}
        >
          <h5>Candidatos Congresuales (4)</h5>
               {/* Select diputados */}
      <div className="form-group">
        <label>Diputados</label>
        <select className="custom-select"
        name="diputy"
        defaultValue={defaultValue.diputy}
        onChange={(e) => setDefaultValue({...defaultValue, diputy: e.target.value}, setSaved(false))}>
          <option >Incompleto</option>
          {
            diputados?.map(diputado=>
              <option key={diputado.candidateId} value={diputado.candidateId}>{diputado.name} | {diputado.partyAcronym} </option>
            )
          }
        </select>
    </div> 

      {/*Selec de Senadores */}
      <div className="form-group">
        <label>Senadores</label>
        <select className="custom-select" 
        name="senator"
        defaultValue={defaultValue.senator}
        onChange={(e) => setDefaultValue({...defaultValue, senator: e.target.value}, setSaved(false))}>
          <option >Incompleto</option>
          {
            senadores?.map(senador=>
              <option key={senador.candidateId} value={senador.candidateId}>{senador.name} | {senador.partyAcronym}</option>
            
            )
          }
        </select>
      </div>
          <a className="btn btn-primary margin" onClick={() => changeTab(activeTab-1)}>Atras</a>
          <a className="btn btn-primary margin" onClick={() => changeTab(activeTab+1)}>Siguiente</a>
        </div>
        <div
          id="content5"
          className={`formcontent ${activeTab === 5 ? 'active' : ''}`}
        >
          <h5>Candidatos Presidenciales (5)</h5>
                {/*Selec de Presidentes */}
      <div className="form-group">
        <label>Presidentes</label>
        <select className="custom-select"
        name="president"
        defaultValue={defaultValue.president}
        onChange={(e) => setDefaultValue({...defaultValue, president: e.target.value}, setSaved(false))}>
          <option >Incompleto</option>
          {
            presidentes?.map(presidente=>
              <option key={presidente.candidateId} value={presidente.candidateId}>{presidente.name} | {presidente.partyAcronym}</option>
            )
          }
        </select>
      </div>
          
          <div style={{display:"flex", justifyContent:"space-between"}}>
          <a className="btn btn-primary margin" onClick={() => changeTab(activeTab-1)}>Atras</a>
          
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