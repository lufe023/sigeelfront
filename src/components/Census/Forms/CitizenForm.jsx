import React, { useState } from 'react';
import axios from 'axios';

const CitizenForm = ({updates, citizen, getPeople}) => {
 

  const [apodo, setApodo] = useState('');
  const [picture, setPicture] = useState('');
  const [celular, setCelular] = useState('');
  const [telefonoResidencia, setTelefonoResidencia] = useState('');
  const [otroTelefono, setOtroTelefono] = useState('');
  const [direccion, setDireccion] = useState('');

  const handlePictureChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setPicture(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post(`http://localhost:9000/api/v1/citizen/:id`, {
        apodo,
        picture,
        celular,
        telefonoResidencia,
        otroTelefono,
        direccion,
      })
      .then((response) => {
        console.log(response.data); // Manejar la respuesta como desees

        // Limpiar los campos después del envío exitoso
        setApodo('');
        setPicture('');
        setCelular('');
        setTelefonoResidencia('');
        setOtroTelefono('');
        setDireccion('');
      })
      .catch((error) => {
        console.error(error);
        // Manejar el error como desees
      });
  };

  return (
    <form className="form-horizontal" onSubmit={handleSubmit}>
      <div className="form-group row">
        <label htmlFor="apodo" className="col-sm-2 col-form-label">Apodo</label>
        <div className="col-sm-10">
          <input
            type="text"
            className="form-control"
            id="apodo"
            value={apodo}
            onChange={(e) => setApodo(e.target.value)}
            placeholder="Apodo"
          />
        </div>
      </div>
      <div className="form-group row">
        <label htmlFor="picture" className="col-sm-2 col-form-label">Picture</label>
        <div className="col-sm-10">
          <input
            type="file"
            className="form-control-file"
            id="picture"
            accept="image/*"
            onChange={handlePictureChange}
          />
        </div>
      </div>
      <div className="form-group row">
        <label htmlFor="celular" className="col-sm-2 col-form-label">Celular</label>
        <div className="col-sm-10">
          <input
            type="text"
            className="form-control"
            id="celular"
            value={celular}
            onChange={(e) => setCelular(e.target.value)}
            placeholder="Celular"
          />
        </div>
      </div>
      <div className="form-group row">
        <label htmlFor="telefonoResidencia" className="col-sm-2 col-form-label">Teléfono de Residencia</label>
        <div className="col-sm-10">
          <input
            type="text"
            className="form-control"
            id="telefonoResidencia"
            value={telefonoResidencia}
            onChange={(e) => setTelefonoResidencia(e.target.value)}
            placeholder="Teléfono de Residencia"
          />
        </div>
      </div>
      <div className="form-group row">
        <label htmlFor="otroTelefono" className="col-sm-2 col-form-label">Otro Teléfono</label>
        <div className="col-sm-10">
          <input
            type="text"
            className="form-control"
            id="otroTelefono"
            value={otroTelefono}
            onChange={(e) => setOtroTelefono(e.target.value)}
            placeholder="Otro Teléfono"
          />
        </div>
      </div>
      <div className="form-group row">
        <label htmlFor="direccion" className="col-sm-2 col-form-label">Dirección</label>
        <div className="col-sm-10">
          <input
            type="text"
            className="form-control"
            id="direccion"
            value={direccion}
            onChange={(e) => setDireccion(e.target.value)}
            placeholder="Dirección"
          />
        </div>
      </div>
      <div className="form-group row">
        <div className="offset-sm-2 col-sm-10">
          <button type="submit" className="btn btn-danger">Submit</button>
        </div>
      </div>
    </form>
  );
};

export default CitizenForm;
