import React, { useEffect, useState } from 'react';
import "./adminTools";
import getConfig from '../../utils/getConfig';
import axios from 'axios';
import Swal from 'sweetalert2';

const NewTeam = () => {
  const [users, setUsers] = useState([]);
  const [selectedMembers, setSelectedMembers] = useState([]);

  const getAllUsers = () => {
    const URL = `${import.meta.env.VITE_API_SERVER}/api/v1/users?offset=0&limit=20`;
    axios.get(URL, getConfig())
      .then(res => {
        setUsers(res.data.results);
      })
      .catch(error => {
        console.log(error);
      });
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  const handleSelectChange = (event) => {
    setSelectedMembers(Array.from(event.target.selectedOptions, (option) => option.value));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let data = new FormData();
    data.append('name', e.target.teamName.value);
    data.append('logo', e.target.logo.files[0]);
    data.append('description', e.target.description.value);

    const URL = `${import.meta.env.VITE_API_SERVER}/api/v1/teams`;
    axios.post(URL, data, getConfig())
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
      })

      Toast.fire({
          icon: 'success',
          title: `El equipo ${res.data.name}, fue agregado con exito`
      })
      })
      .catch(error => {
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
      })
      
      Toast.fire({
      icon: 'error',
      title: `Hubo un error: ${error.response.data.message.error}`
      })
      });
  };

  return (
    <form onSubmit={handleSubmit} encType='multipart/form-data'>
      <div className="card card-default">
        <div className="card-header">
          <h3 className="card-title">Crear un nuevo equipo</h3>
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
                <input type="text" name='teamName' className="form-control" id="exampleInputEmail1" placeholder="Ponle nombre a tu equipo" />
              </div>
              <div className="form-group">
                <label htmlFor="exampleInputFile">File input</label>
                <div className="input-group">
                  <div className="custom-file">
                    <input type="file" accept="image/png, image/jpeg" name="logo" className="custom-file-input" id="exampleInputFile" />
                    <label className="custom-file-label" htmlFor="exampleInputFile">Elige un logo</label>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6" data-select2-id={30}>
            <div className="form-group">
  <label>Descripción</label>
  <textarea name="description" className="form-control" rows={3} placeholder="De que se trata tu grupo... ej: grupo que trabajará en las comunidades x, para que el candidato tal, junto a nuestro excelenticimo lider fulano llegue a" style={{height: 86}} defaultValue={""} />
</div>

            </div>
          </div>
        </div>
        <div className="card-footer" style={{ textAlign: 'right' }}>
          <button type="submit" className="btn btn-primary">Crear</button>
        </div>
      </div>
    </form>
  );
};

export default NewTeam;
