import React from 'react'

const Jobs = () => {
  return (
    <div className="card card-maroon collapsed-card">
    <div className="card-header">
      <h3 className="card-title"><i className="far fa-building"></i> Empleomania</h3>
      <div className="card-tools">
        <button type="button" className="btn btn-tool" data-card-widget="collapse">
          <i className="fas fa-plus" />
        </button>
      </div>
    </div>
    <div className="card-body">
  
    <div>
  
    <div className="form-group">
      <label htmlFor="institution">Institution</label>
      <input type="text" className="form-control" id="institution" name="institution" required  placeholder='Donde trabajó'/>
    </div>
  
      <div className="form-group">
        <label htmlFor="position">Position</label>
        <input type="text" className="form-control" id="position" name="position" placeholder='Nombre de la posición'  required/>
      </div>
      <div className="form-group">
        <label htmlFor="positionDetails">Position Details</label>
        <input type="text" className="form-control" id="positionDetails" name="positionDetails" placeholder='Qué hacia' />
      </div>
      <div className="form-group">
        <label htmlFor="startedAt">Inició</label>
        <input type="date" className="form-control" id="startedAt" name="startedAt" />
      </div>
      <div className="form-group">
        <label htmlFor="startedAt">Finalizó</label>
        <input type="date" className="form-control" id="startedAt" name="startedAt"/>
      </div>
    </div>
  
  
    </div>
    </div>
  )
}

export default Jobs