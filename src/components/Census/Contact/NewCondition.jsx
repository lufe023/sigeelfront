import React, { useState } from 'react';
import getConfig from '../../../utils/getConfig';
import axios from 'axios';
import Swal from 'sweetalert2';

const NewConditions = ({citizenID, getPeople}) => {
  const [defaultCondition, setDefaultCondition] = useState({
    citizenID: citizenID,
    conditionDetails: '',
    dyslexia: false,
    visual: false,
    auditory: false,
    motor: false,
    cognitive: false,
    outside: false
  });

  const [isSave, setIsSave] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(citizenID)
    const URL = `${import.meta.env.VITE_API_SERVER}/api/v1/intouch/condition/${citizenID}`;
    axios
      .post(URL, defaultCondition, getConfig())
      .then((res) => {
        getPeople()
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
          title: 'Condicion Guardada'
        });
        setIsSave(false)
      })
      .catch((err) => {
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
    <div className="card card-warning collapsed-card">
      <div className="card-header">
        <h3 className="card-title">
          {
            
            isSave?<div><i className="fas fa-save"/> Cambios pendientes</div>
            :<div><i className='fas fa-hands-helping'/>Condición</div>
          }
        </h3>
        <div className="card-tools">
          <button type="button" className="btn btn-tool" data-card-widget="collapse">
            <i className="fas fa-plus" />
          </button>
        </div>
      </div>
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor={`detalleCondicion$`}>Resumen condición</label>
            <input
              type="text"
              className="form-control"
              id={`detalleCondicion${citizenID.citizenID}`}
              placeholder="Resumen condición"
              value={defaultCondition.conditionDetails}
              required
              onChange={(e) => setDefaultCondition({...defaultCondition, conditionDetails: e.target.value}, setIsSave(true))}
            />
          </div>

          <div className="form-group">
            <div className="custom-control custom-checkbox">
              <input
                className="custom-control-input"
                type="checkbox"
                id={`dyslexia${citizenID.citizenID}`}
                defaultValue={defaultCondition.dyslexia}
              onChange={(e) => setDefaultCondition({...defaultCondition, dyslexia: !defaultCondition.dyslexia}, setIsSave(true))}
              />
              <label htmlFor={`dyslexia${citizenID.citizenID}`} className="custom-control-label">
                Dislexia
              </label>
            </div>

            <div className="custom-control custom-checkbox">
              <input
                className="custom-control-input"
                type="checkbox"
                id={`visual${citizenID.citizenID}`}
                defaultValue={defaultCondition.visual}
                onChange={(e) => setDefaultCondition({...defaultCondition, visual: !defaultCondition.visual}, setIsSave(true))}
              />
              <label htmlFor={`visual${citizenID.citizenID}`} className="custom-control-label">
                Visual
              </label>
            </div>

            <div className="custom-control custom-checkbox">
              <input
                className="custom-control-input"
                type="checkbox"
                id={`auditory${citizenID.citizenID}`}
                defaultValue={defaultCondition.auditory}
                onChange={(e) => setDefaultCondition({...defaultCondition, auditory: !defaultCondition.auditory}, setIsSave(true))}
              />
              <label htmlFor={`auditory${citizenID.citizenID}`} className="custom-control-label">
                Auditivo
              </label>
            </div>

            <div className="custom-control custom-checkbox">
              <input
                className="custom-control-input"
                type="checkbox"
                id={`motor${citizenID.citizenID}`}
                defaultValue={defaultCondition.motor}
                onChange={(e) => setDefaultCondition({...defaultCondition, motor: !defaultCondition.motor}, setIsSave(true))}
              />
              <label htmlFor={`motor${citizenID.citizenID}`} className="custom-control-label">
                Motor
              </label>
            </div>

            <div className="custom-control custom-checkbox">
              <input
                className="custom-control-input"
                type="checkbox"
                id={`cognitive${citizenID.citizenID}`}
                defaultValue={defaultCondition.cognitive}
                onChange={(e) => setDefaultCondition({...defaultCondition, cognitive: !defaultCondition.cognitive}, setIsSave(true))}
              />
              <label htmlFor={`cognitive${citizenID.citizenID}`} className="custom-control-label">
                Cognitivo
              </label>
            </div>

            <div className="custom-control custom-checkbox">
              <input
                className="custom-control-input"
                type="checkbox"
                id={`outside${citizenID.citizenID}`}
                defaultValue={defaultCondition.outside}
                onChange={(e) => setDefaultCondition({...defaultCondition, outside: !defaultCondition.outside}, setIsSave(true))}
              />
              <label htmlFor={`outside${citizenID.citizenID}`} className="custom-control-label">
                Vive fuera
              </label>
            </div>
          </div>

          <button className="btn btn-block btn-primary">Guardar</button>
        </form>
      </div>
      {/* /.card-body */}
    </div>
  );
};

export default NewConditions;
