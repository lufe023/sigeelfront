import React from 'react'

const MiniDatos = ({miniDatos, beneficios, citizens}) => {
  
  return (
    <div className="row">
  <div className="col-12 col-sm-6 col-md-3">
    <div className="info-box">
      <span className="info-box-icon bg-info elevation-1"><i className="fas fa-cog" /></span>
      <div className="info-box-content">
        <span className="info-box-text">Beneficiarios</span>
        <span className="info-box-number">
        {beneficios}
          <small> Ciudadanos</small>
        </span>
      </div>
      {/* /.info-box-content */}
    </div>
    {/* /.info-box */}
  </div>
  {/* /.col */}
  <div className="col-12 col-sm-6 col-md-3">
    <div className="info-box mb-3">
      <span className="info-box-icon bg-success elevation-1"><i className="fas fa-chart-bar"/></span>
      <div className="info-box-content">
        <span className="info-box-text">Completadas</span>
        <span className="info-box-number">{miniDatos.Completas}<small> Encuestas</small></span>
      </div>
      {/* /.info-box-content */}
    </div>
    {/* /.info-box */}
  </div>
  {/* /.col */}
  {/* fix for small devices only */}
  <div className="clearfix hidden-md-up" />
  <div className="col-12 col-sm-6 col-md-3">
    <div className="info-box mb-3">
      <span className="info-box-icon bg-danger elevation-1"><i className="fas fa-chart-pie"/></span>
      <div className="info-box-content">
        <span className="info-box-text">Incompletas</span>
        <span className="info-box-number">{miniDatos.Incompletas}<small> Encuestas</small></span>
      </div>
      {/* /.info-box-content */}
    </div>
    {/* /.info-box */}
  </div>
  {/* /.col */}
  <div className="col-12 col-sm-6 col-md-3">
    <div className="info-box mb-3">
      <span className="info-box-icon bg-warning elevation-1"><i className="fab fa-accessible-icon"/></span>
      <div className="info-box-content">
        <span className="info-box-text">Discapacidades</span>
        <span className="info-box-number">{citizens.filter(citizen => citizen.condition).length} <small>Electores</small> </span>
      </div>
      {/* /.info-box-content */}
    </div>
    {/* /.info-box */}
  </div>
  {/* /.col */}
</div>

  )
}

export default MiniDatos