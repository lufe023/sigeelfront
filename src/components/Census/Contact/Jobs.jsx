import axios from 'axios';
import React, { useState } from 'react'

const Jobs = () => {
  const [benefitDescription, setBenefitDescription] = useState("");
  const [receiveAt, setReceiveAt] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const URL = `${import.meta.env.VITE_API_SERVER}/api/v1/intouch/benefit/${citizenID}`;
    axios
      .post(URL, {benefitDescription, receiveAt}, getConfig())
      .then((res) => {
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer);
            toast.addEventListener('mouseleave', Swal.resumeTimer);
          }
        });

        Toast.fire({
          icon: 'success',
          title: 'Beneficio Guardado'
        });
        setBenefitDescription("")
        setReceiveAt("")
        getPeople()
      })
      .catch((err) => {
        console.log(URL)
        console.log(err);
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 6000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer);
            toast.addEventListener('mouseleave', Swal.resumeTimer);
          }
        });

        Toast.fire({
          icon: 'error',
          title: `Accion no permitida`
        });
      });
  };
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
    <form onSubmit={handleSubmit}>
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
    <button type="submit" className="btn btn-primary">
        Registrar
      </button>
    </form>
    </div>
    </div>
  )
}

export default Jobs