import React from 'react'
import "./ConcurrenciaPanel.css"
import { Link } from 'react-router-dom'
const ConcurrenciaPanel = ({citizens}) => {
  return (
    <>
    <div className='row'>
        <div className='col-md-12'>
            <div className='card'>
            <div className="card-header">
  <h5 className="card-title">Concurrencia (Faltan por votar)</h5>
  <div className="card-tools">
    <button type="button" className="btn btn-tool" data-card-widget="collapse">
      <i className="fas fa-minus" />
    </button>
    <button type="button" className="btn btn-tool" data-card-widget="remove">
      <i className="fas fa-times" />
    </button>
  </div>
</div>
<div className='card-body'>
<div className='row'>
    {/* contenido 1 */}
    
    <div className='col-md-8' style={{ paddingTop:"20px", borderRadius:"20px"}}>
      
    <ul className="users-list-panel clearfix" style={{margin:"0", padding:"0"}}>
      {
        citizens.map(citizen => 
        citizen?.sufragio?.suffrage?"":
  <li key={citizen.id}>
  <div className="info-box">
  <span className="info-box-icon">
  <Link to={`/mypeople/${citizen.id}`}>
  <img src={`${import.meta.env.VITE_API_SERVER}/api/v1/images/citizen/${citizen?.picture}`}
    alt="User Image"
    className='concurrencia-citizen-image'/>
    </Link>
    </span>
  <div className="info-box-content">
  <Link to={`/mypeople/${citizen.id}`}>
    <span className="info-box-text">{citizen.firstName.substring(0,10)} {citizen.lastName.substring(0,10)}</span>
  </Link>
    <span className="info-box-number"><small>Mesa: </small>{citizen.colegio.collegeNumber.toString().padStart(4, '0')}
    <br/>
    <small> Recinto: </small>
    <Link to={`/precints`}>
    {citizen.colegio.precinctData.recintoNombre.substring(0,25)}
    </Link>
    </span>
  </div>
  {/* /.info-box-content */}
</div>
{/* 
    <img src={`${import.meta.env.VITE_API_SERVER}/api/v1/images/citizen/${citizen?.picture}`}
    alt="User Image"
    className='concurrencia-citizen-image'/>
    <a className="users-list-name" href="#">Alexander Pierce</a>
    <span className="users-list-date text-success">Votó</span><small>10:40 am</small> */}
  </li>
  
          )
      }
</ul>

    </div>

    {/* contenido 2*/}
  <div className="col-md-4 condition-details" style={{backgroundColor:"#f8f9fa", borderRadius:"10px"}}>
  <p className="text-center">
    <strong>Ayuda para Votar</strong>
  </p>
  <div className='scroll' style={{overflowY:"scroll", overflowX:"hidden", height:"300px", minWidth:"200px"}}>
  {citizens?.map(citizen =>
  citizen?.condition?.id?
  <div className='row'  key={citizen.id} style={{borderBottom:"solid 1px #495057", marginTop:"15px", paddingBottom:"5px"}}>
    <div className='col-md-6'>
    <b>{citizen.firstName}</b>
    <span style={{display:"block"}}>
    {citizen.condition.conditionDetails}
    </span>
    </div>
    <span className='col-md-6'>
      <ul>
        <li>
      <small>
      {citizen.condition.dyslexia?
      <div className="form-group">
  <div className="custom-control custom-switch">
    <input type="checkbox" className="custom-control-input" id="customSwitch1" defaultChecked={true} />
    <label className="custom-control-label">Dislexia</label>
  </div>
</div>
      :""
      }
      {citizen.condition.visual?
<div className="form-group">
  <div className="custom-control custom-switch">
    <input type="checkbox" className="custom-control-input" id="customSwitch1" defaultChecked={true} />
    <label className="custom-control-label"> Visual</label>
  </div>
</div>

      :""
      }
      {citizen.condition.auditory?
  <div className="form-group">
  <div className="custom-control custom-switch">
    <input type="checkbox" className="custom-control-input" id="customSwitch1" defaultChecked={true} />
    <label className="custom-control-label"> Auditivo</label>
  </div>
</div>

       :""
       }
      {citizen.condition.motor?
<div className="form-group">
  <div className="custom-control custom-switch">
    <input type="checkbox" className="custom-control-input" id="customSwitch1" defaultChecked={true} />
    <label className="custom-control-label">Motor</label>
  </div>
</div>

       :""
       }
      {citizen.condition.cognitive?
       <div className="form-group">
  <div className="custom-control custom-switch">
    <input type="checkbox" className="custom-control-input" id="customSwitch1" defaultChecked={true} />
    <label className="custom-control-label"> Cognitivo</label>
  </div>
</div>

       :""
       }
      {citizen.condition.outside?
       <div className="form-group">
  <div className="custom-control custom-switch">
    <input type="checkbox" className="custom-control-input" id="customSwitch1" defaultChecked={true} />
    <label className="custom-control-label"> Vive Fuera</label>
  </div>
</div>

       :""
       }
      </small>
      </li>
      </ul>
  </span>
  </div>
  :""
  )}
  </div>
</div>

</div>
</div>
<div className="card-footer">
  <div className="row">
    <div className="col-sm-3 col-6">
      <div className="description-block border-right">
      <span className="description-text">Transporte</span>
        <h5 className="description-header">Santo Domingo</h5>
        <span className="description-text"><a href='tel:829-685-0000'>829-685-0000</a></span>
      </div>
      {/* /.description-block */}
    </div>
    {/* /.col */}
    <div className="col-sm-3 col-6">
      <div className="description-block border-right">
      <span className="description-text">Transporte</span>
        <h5 className="description-header">Interno Motocicleta </h5>
        <span className="description-text"><a href='tel:829-685-0000'>829-685-0000</a></span>
      </div>
      {/* /.description-block */}
    </div>
    {/* /.col */}
    <div className="col-sm-3 col-6">
      <div className="description-block border-right">
      <span className="description-text">Centro de Computo</span>
        <h5 className="description-header">Lugar Pueblo</h5>
        <span className="description-text"><a href='tel:829-685-0000'>829-685-0000</a></span>
      </div>
      {/* /.description-block */}
    </div>
    {/* /.col */}
    <div className="col-sm-3 col-6">
      <div className="description-block">
      <span className="description-text">Coordinador Campaña</span>
        <h5 className="description-header">Provincial</h5>
        <span className="description-text"><a href='tel:829-685-0000'>829-685-0000</a></span>
      </div>
      {/* /.description-block */}
    </div>
  </div>
  {/* /.row */}
</div>

</div>
</div>
</div>
    </>
  )
}

export default ConcurrenciaPanel