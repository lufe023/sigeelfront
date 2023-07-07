import axios from "axios";
import React, { useState } from "react";
import getConfig from "../../../utils/getConfig";
import Swal from "sweetalert2";

const ParticipationForm = ({citizenID, getPeople}) => {
  const [activityDescription, setActivityDescription] = useState("");
  const [receiveAt, setReceiveAt] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const URL = `${import.meta.env.VITE_API_SERVER}/api/v1/intouch/participation/${citizenID}`;
    axios
      .post(URL, {activityDescription, receiveAt}, getConfig())
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
          title: 'Actividad Guardada'
        });
        setActivityDescription("")
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
    <div className="card card-orange collapsed-card">
    <div className="card-header">
      <h3 className="card-title"><i className="fas fa-chart-line"></i> Agregar Participación</h3>
      <div className="card-tools">
        <button type="button" className="btn btn-tool" data-card-widget="collapse">
          <i className="fas fa-plus" />
        </button>
      </div>
    </div>
    <div className="card-body">
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="activityDescription" className="form-label">
        Descripción de la Actividad 
        </label>
        <input
          type="text"
          className="form-control"
          id="activityDescription"
          value={activityDescription}
          onChange={(e) => setActivityDescription(e.target.value)}
          placeholder="La actividad trata de ..."
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="receiveAt" className="form-label">
          Fecha
        </label>
        <input
          type="date"
          className="form-control"
          id="receiveAt"
          value={receiveAt}
          onChange={(e) => setReceiveAt(e.target.value)}
          required
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Registrar
      </button>
    </form>
    </div>
    </div>
  );
};

export default ParticipationForm;
