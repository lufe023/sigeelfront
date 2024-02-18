import React from 'react'
import { useState } from 'react'
import SelectCollege from './SelectCollege'
import PreferdPartiesByPlace from './PreferdPartiesbyPlace'
import PreferdPartiesByCollege from './PreferdPartiesbyCollege'
import SelectPlace from './SelectPlace'
import WarRoom from './WarRoom'
import Metas from './Metas'
import WarRoomB from './WaRoomB'

const Dash = () => {
  const [menu, setMenu] = useState({
    tipo: '',
    menu: '',
    campain: ''
  });

  const [collegeData, setCollegeData] = useState({
    id: 0,
    precinct: '',
    electLocal: 0,
    electExterior: 0,
    meta: 0,
    college: ''
  });
  const [selectedPrecint, setSelectedPrecint] = useState()
  
  const [formMapData, setFormMapData] = useState({
    name: '',
    details: '',
    municipio: null,
    provincia: null,
    startAt: '',
    finishAt: '',
    isActive: true
});

  const [campains, setCampains] = useState([])

  const handleRadioChange = (event) => {
    const { name, value } = event.target;
    setMenu({ ...menu, [name]: value });

    if (value === 'colegios' || value ==='lugares') {
      // Si el valor seleccionado es "lugares," establecer college en ''
      setCampains([])
    }
   
  
    if (name === 'tipo' && value === 'lugares') {
      // Si el valor seleccionado es "lugares," establecer college en ''
      setCollegeData((prevCollegeData) => ({
        ...prevCollegeData,
        college: '',
      }));
    }
  };
  
  return (
    <div className="content-wrapper">
    {/* Content Header (Page header) */}
    <div className="content-header">
      <div className="container-fluid">
        <div className="row mb-2">
          <div className="col-sm-6">
            <h1 className="m-0">Informes</h1>
          </div>{/* /.col */}
          <div className="col-sm-6">
            <ol className="breadcrumb float-sm-right">
              <li className="breadcrumb-item"><a href="#">Home</a></li>
              <li className="breadcrumb-item active">Informes</li>
            </ol>
          </div>{/* /.col */}
        </div>{/* /.row */}
      </div>{/* /.container-fluid */}
    </div>
    {/* /.content-header */}
    {/* Main content */}
    <section className="content">
      <div className="container-fluid">
        {/* Small boxes (Stat box) */}
        
        <div className='row'>
          <div className='col-md-12'>
            <div className='card card-primary'>
            <div className="card-header">
  <h3 className="card-title"><i className="fas fa-filter"/> Filtrar Informe</h3>
  <div className="card-tools">
    <button type="button" className="btn btn-tool" data-card-widget="collapse" title="Collapse"><i className="fas fa-minus" /></button>
  </div>
</div>

          <div className="card-body">
            <div className='form-group'>
              <h3>Tipo de Informe</h3>
          <label className={`btn btn-app ${menu.menu === 'partidos' ? 'bg-primary' : ''}`} style={{ fontWeight: '400' }}>
          <span className="badge bg-success"></span>
          <input
            type="radio"
            name="menu"
            value="partidos"
            onChange={handleRadioChange}
            hidden
          />
          <i className="fas fa-chart-pie" />
          Partidos
        </label>

        <label className={`btn btn-app ${menu.menu === 'presidencial' ? 'bg-primary' : ''}`} style={{ fontWeight: '400' }}>
          <span className="badge bg-success"></span>
          <input
            type="radio"
            name="menu"
            value="presidencial"
            hidden
            onChange={handleRadioChange}
          />
          <i className="fas fa-chart-line" />
          Presidencial
        </label>

        <label className={`btn btn-app ${menu.menu === 'senatorial' ? 'bg-primary' : ''}`} style={{ fontWeight: '400' }}>
          <span className="badge bg-success"></span>
          <input
            type="radio"
            name="menu"
            value="senatorial"
            hidden
            onChange={handleRadioChange}
          />
          <i className="fas fa-chart-bar" />
          Senatorial
        </label>

        <label className={`btn btn-app ${menu.menu === 'diputados' ? 'bg-primary' : ''}`} style={{ fontWeight: '400' }}>
          <span className="badge bg-success"></span>
          <input
            type="radio"
            name="menu"
            value="diputados"
            hidden
            onChange={handleRadioChange}
          />
          <i className="far fa-chart-bar" />
          Diputados
        </label>

        <label className={`btn btn-app ${menu.menu === 'alcaldes' ? 'bg-primary' : ''}`} style={{ fontWeight: '400' }}>
          <span className="badge bg-success"></span>
          <input
            type="radio"
            name="menu"
            value="alcaldes"
            hidden
            onChange={handleRadioChange}
          />
          <i className="fas fa-chart-area" />
          Alcaldes
        </label>

        <label className={`btn btn-app ${menu.menu === 'regidores' ? 'bg-primary' : ''}`} style={{ fontWeight: '400' }}>
          <span className="badge bg-success"></span>
          <input
            type="radio"
            name="menu"
            value="regidores"
            hidden
            onChange={handleRadioChange}
          />
          <i className="fas fa-project-diagram" />
          Regidores
        </label>

        <label className={`btn btn-app ${menu.menu === 'directores' ? 'bg-primary' : ''}`} style={{ fontWeight: '400' }}>
          <span className="badge bg-success"></span>
          <input
            type="radio"
            name="menu"
            value="directores"
            hidden
            onChange={handleRadioChange}
          />
          <i className="fas fa-chart-area" />
          Directores
        </label>

        <label className={`btn btn-app ${menu.menu === 'vocales' ? 'bg-primary' : ''}`} style={{ fontWeight: '400' }}>
          <span className="badge bg-success"></span>
          <input
            type="radio"
            name="menu"
            value="vocales"
            hidden
            onChange={handleRadioChange}
          />
          <i className="fas fa-project-diagram" />
          Vocales
        </label>
        <label className={`btn btn-app ${menu.menu === 'warroom' ? 'bg-primary' : ''}`} style={{ fontWeight: '400' }}>
          <span className="badge bg-success"></span>
          <input
            type="radio"
            name="menu"
            value="warroom"
            onChange={handleRadioChange}
            hidden
          />
          <i className="fas fa-flag" />

          War Room
        </label>

        <label className={`btn btn-app ${menu.menu === 'metas' ? 'bg-primary' : ''}`} style={{ fontWeight: '400' }}>
          <span className="badge bg-success"></span>
          <input
            type="radio"
            name="menu"
            value="metas"
            onChange={handleRadioChange}
            hidden
          />
          <i className="fas fa-medal" />
          Metas
        </label>

        </div>
        <div className='form-group'>
        {
          menu?.menu?
          <>
        <h3>Extraer Desde</h3>

        <label className={`btn btn-app ${menu.tipo === 'lugares' ? 'bg-primary' : ''}`} style={{ fontWeight: '400' }}>
          <span className="badge bg-success"></span>
          <input
            type="radio"
            name="tipo"
            value="lugares"
            onChange={handleRadioChange}
            hidden
          />
          <i className="fas fa-map-marker-alt" />
          Lugares
        </label>

        <label className={`btn btn-app  ${menu.tipo === 'colegios' ? 'bg-primary' : ''}`} style={{ fontWeight: '400' }}>
          <span className="badge bg-success"></span>
          <input
            type="radio"
            name="tipo"
            value="colegios"
            onChange={handleRadioChange}
            hidden
          />
          <i className="fas fa-hotel nav-icon"/>
          Colegios
        </label>
        </>
        :""
        }
        {menu.tipo == 'colegios'? <SelectCollege collegeData={collegeData} setCollegeData={setCollegeData} setCampains={setCampains} selectedPrecint={selectedPrecint} setSelectedPrecint={setSelectedPrecint}/>: ""}
        {menu.tipo == 'lugares'? <SelectPlace setCampains={setCampains} formMapData={formMapData} setFormMapData={setFormMapData}/>: ""}
        </div>
        {
          menu.tipo &&  menu.menu !='metas'?
        <>
        <h3>Campañas</h3>
        <div className='row'>
        {
          campains?.map((campain)=> 
      <label key={campain.id} className={`btn btn-app  ${menu.campain === campain.id ? 'bg-primary' : ''}`} style={{ fontWeight: '400' }}>
          <span className="badge bg-success"></span>
          <input
            type="radio"
            name="campain"
            value={campain.id}
            onChange={handleRadioChange}
            hidden
          />
          <i className="far fa-flag" />
          {campain.name}
        </label>
          )
        }
        </div>
        </>
        :""
        
      }

{
  menu.menu && menu.tipo && formMapData.provincia?

        campains[0]?"":<div className='row'>
        <p className='bg-danger'>No hay Campaña disponible en esta selección</p>
        </div>
      
      :""
    }
        </div>
        </div>
        {
          menu.menu == 'partidos' && menu.campain && menu.tipo== 'lugares' && campains.length>0?<PreferdPartiesByPlace campainId={menu.campain}/> :""
        }
        
        {
          menu.menu == 'partidos' && menu.campain && menu.tipo== 'colegios' && campains.length>0?<PreferdPartiesByCollege campainId={menu.campain} collegeId={collegeData?.college}/> :""
        }
        {/* {
          menu.menu == 'warroom' && menu.campain && menu.tipo== 'colegios' && campains.length>0?<WarRoom campainId={menu.campain} collegeId={collegeData?.college}/> :""
        } */}
        {
          menu.menu == 'warroom' && menu.campain && menu.tipo== 'colegios' && campains.length>0?<WarRoomB campainId={menu.campain} collegeId={collegeData?.college}/> :""
        }
        {
          menu.menu == 'metas'? <Metas campainId={menu.campain} college={collegeData}/> :""
        }
        </div>
        </div>



        {/* /.row (main row) */}
      </div>{/* /.container-fluid */}
    </section>
    {/* /.content */}
  </div>
  )
}

export default Dash