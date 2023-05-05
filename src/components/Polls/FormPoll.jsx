import React, { useState } from 'react'
import "./FormPoll.css"
const FormPoll = () => {

  const [activeTab, setActiveTab] = useState(1);

  const changeTab = (tabNumber) => {
    setActiveTab(tabNumber);
  };


  return (
    <>
<div className="tabs">


      <div className="tab-content">
        <div
          id="content1"
          className={`formcontent  ${activeTab === 1 ? 'active' : ''}`}>
          <h5>Información del Elector</h5>
        
        <div className="form-group">
        <label>Partido de preferencia</label>
        <select className="custom-select">
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
        <label>Tipo de Elector</label>
        <select className="custom-select">
          <option>Duro</option>
          <option>Coyuntural</option>
        </select>
        </div>

          <a class="btn btn-primary" onClick={() => changeTab(activeTab+1)}>Siguiente</a>
        </div>
        
        <div
          id="content2"
          className={`formcontent  ${activeTab === 2 ? 'active' : ''}`}
        >
          <p>Contenido del Tab 2</p>
          <a class="btn btn-primary" onClick={() => changeTab(activeTab-1)}>Atras</a>
          <a class="btn btn-primary" onClick={() => changeTab(activeTab+1)}>Siguiente</a>
        </div>
        <div
          id="content3"
          className={`formcontent  ${activeTab === 3 ? 'active' : ''}`}
        >
          <p>Contenido del Tab 3</p>
          <a class="btn btn-primary" onClick={() => changeTab(activeTab-1)}>Atras</a>
          <a class="btn btn-primary" onClick={() => changeTab(activeTab+1)}>Siguiente</a>
        </div>
        <div
          id="content4"
          className={`formcontent  ${activeTab === 4 ? 'active' : ''}`}
        >
          <p>Contenido del Tab 4</p>
          <a class="btn btn-primary" onClick={() => changeTab(activeTab-1)}>Atras</a>
          <a class="btn btn-primary" onClick={() => changeTab(activeTab+1)}>Siguiente</a>
        </div>
        <div
          id="content5"
          className={`formcontent ${activeTab === 5 ? 'active' : ''}`}
        >
          <p>Contenido del Tab 5</p>
          <a class="btn btn-primary" onClick={() => changeTab(activeTab-1)}>Atras</a>
    
          
        </div>
      </div>
    </div>


  </>
  )
}

export default FormPoll