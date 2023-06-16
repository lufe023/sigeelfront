import { useState } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

const AddParticipation = ({ closeModal }) => {
  const [citizenID, setCitizenID] = useState('');
  const [activityDescription, setActivityDescription] = useState('');
  const [receiveAt, setReceiveAt] = useState('');
  

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Crear una nueva participación con los datos ingresados
    const newParticipation = {
      id: uuidv4(),
      citizenID,
      activityDescription,
      receiveAt
    };

    // Llamar al endpoint para guardar la participación en el backend
    axios.post('/api/v1/participations', newParticipation)
      .then((res) => {
        // Manejar la respuesta del backend si es necesario
        console.log(res.data);
        closeModal(); // Cerrar el modal después de enviar los datos
      })
      .catch((error) => {
        // Manejar el error si ocurre algún problema en la solicitud
        console.error(error);
      });
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Agregar Participación</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="citizenID">Cédula del ciudadano:</label>
            <input
              type="text"
              id="citizenID"
              value={citizenID}
              onChange={(e) => setCitizenID(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="activityDescription">Descripción de la actividad:</label>
            <input
              type="text"
              id="activityDescription"
              value={activityDescription}
              onChange={(e) => setActivityDescription(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="receiveAt">Fecha de recepción:</label>
            <input
              type="date"
              id="receiveAt"
              value={receiveAt}
              onChange={(e) => setReceiveAt(e.target.value)}
              required
            />
          </div>
          <div className="modal-buttons">
            <button type="submit" className="btn btn-primary">Guardar</button>
            <button type="button" className="btn btn-secondary" onClick={closeModal}>Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddParticipation;
