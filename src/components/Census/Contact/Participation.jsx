import React, { useState } from "react";

const ParticipationForm = () => {
  const [citicenID, setCiticenID] = useState("");
  const [activityDescription, setActivityDescription] = useState("");
  const [receiveAt, setReceiveAt] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes agregar la lógica para enviar los datos del formulario al servidor
    // Por ejemplo, puedes realizar una solicitud HTTP POST usando fetch() o Axios.
    // Puedes acceder a los valores de los campos en las variables citicenID, activityDescription y receiveAt.
  };

  return (
    <div className="card card-orange collapsed-card">
    <div className="card-header">
      <h3 className="card-title"><i className="fas fa-chart-line"></i> Participación</h3>
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
