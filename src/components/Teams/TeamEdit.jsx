import React, { useEffect, useState } from 'react';
import "./adminTools";
import getConfig from '../../utils/getConfig';
import axios from 'axios';
import Swal from 'sweetalert2';

const TeamEdit = ({team, setIsEditing, getOneteam}) => {

  const [formState, setFormState] = useState({
    name: team.name,
    description: team.description,
    whatsapp: team.whatsapp,
  });
  const [logoFile, setLogoFile] = useState(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [previewImage, setPreviewImage] = useState()
  const [change, setChange] = useState(false) 

  const handleLogoChange = (event) => {
    setLogoFile(event.target.files[0]);

    const file = event.target.files[0];

  if (file) {
    const reader = new FileReader();

    reader.onloadend = () => {
      // El contenido de la imagen se almacena en reader.result
      // Puedes asignar esto a un estado o directamente a un elemento de imagen
      setPreviewImage(reader.result);
    };

    reader.readAsDataURL(file);
  }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setFormState((prevFormState) => ({
      ...prevFormState,
      [name]: value,
    }));

    setChange(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let data = new FormData();
    data.append('teamId', team.id);
    data.append('name', formState.name);
    data.append('logo', logoFile);
    data.append('description', formState.description);
    data.append('whatsapp', formState.whatsapp);

    const URL = `${import.meta.env.VITE_API_SERVER}/api/v1/teams/updateteam`;
    axios.patch(URL, data, getConfig())
      .then(res => {
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
          }
        });
        
        Toast.fire({
          icon: 'success',
          title: `El equipo fue editado con éxito`
        });

        // Reset form after submission
        e.target.reset();
        setLogoFile(null);
        setPreviewImage(null)
        setIsEditing(false)
        getOneteam(team.id)
      })
      .catch(error => {
        console.log(error)
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 6000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
          }
        });

        Toast.fire({
          icon: 'error',
          title: `Hubo un error: ${error.response.data.message}`
        });
      });
  };


  return (
    <form onSubmit={handleSubmit} onChange={()=>setChange(true)} encType='multipart/form-data'>
     
      <div className={`card card-default `}>
        <div className={`card-header ${change?'bg-warning':''}`}>
          <h3 className="card-title"> 
          {change?
          'Hay cambios pendientes por guardar'
      :'Actualizar Equipo'}
      </h3>
          <div className="card-tools">
            <button type="button" className="btn btn-tool" data-card-widget="collapse">
              <i className="fas fa-minus" />
            </button>
            <button type="button" className="btn btn-tool" data-card-widget="remove">
              <i className="fas fa-times" />
            </button>
          </div>
        </div>
        <div className="card-body" style={{ display: 'block' }}>
          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">Nombre</label>
                  <input
                    type="text"
                    name='name'
                    value={formState.name}
                    onChange={handleInputChange}
                    className="form-control"
                    id="exampleInputEmail1"
                    placeholder="Ponle nombre a tu equipo"
                  />
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputFile">Logo</label>

                {previewImage && (
              <div className="preview-container" >
                <img src={previewImage} alt="Preview" style={{ width: "200px" }} className="preview-image" />
              </div>
                )}

              <div className="input-group">
              <div className="custom-file">
                <input
                  type="file"
                  accept="image/png, image/jpeg"
                  name="logo"
                  className="custom-file-input"
                  id="exampleInputFile"
                  onChange={handleLogoChange}
                />
                <label className="custom-file-label" htmlFor="exampleInputFile">Elige un logo</label>
              </div>
            </div>
              </div>
            </div>
            <div className="col-md-6">
            <div className="form-group">
            <label>Descripción</label>
            <textarea
              name="description"
              value={formState.description}
              onChange={handleInputChange}
              className="form-control"
              rows={3}
              placeholder="De qué se trata tu grupo..."
              style={{ height: 86 }}
            />
          </div>

          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Link del grupo de Whatsapp</label>
            <input
              type="text"
              name='whatsapp'
              value={formState.whatsapp}
              onChange={handleInputChange}
              className="form-control"
              placeholder="pon un link del grupo de Whatsapp para que tus miembros se unan"
            />
          </div>

            </div>
          </div>
        </div>
        <div className="card-footer" style={{ textAlign: 'right' }}>
        <div className="btn-group col-12">
        <button className="btn btn-info" onClick={()=>setIsEditing(false)}>Cancelar</button>
        <button type="submit" className="btn btn-success">Guardar</button>
        </div>
        </div>
      </div>
      {formSubmitted && (
        <div className="alert alert-success mt-3">
          El formulario se ha enviado correctamente.
        </div>
      )}
    </form>
  );
};

export default TeamEdit;