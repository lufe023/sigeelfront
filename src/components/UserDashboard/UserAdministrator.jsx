import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import getConfig from '../../utils/getConfig'
import Aside from '../Aside'
import Footer from '../Footer'
import Header from '../Header'
import Cargando from '../../utils/Cargando'
import PeopleGallery from '../Census/PeopleGallery'
import CitizenForm from '../Census/Forms/CitizenForm'
import userDisable from '../UserDashboard/userDisable'
import copy from 'clipboard-copy';
import Swal from 'sweetalert2'
import changeUserRole from '../UserDashboard/changeUserRole'

const UserAdministrator = () => {

        const [people, setPeople] = useState()
        const [user, setUser] = useState()
        const [updates, setUpdates] = useState()
        const [selectedRole, setSelectedRole] = useState("");
        const {id} = useParams()
        const getPeople = ()=>{
          const URL = `${import.meta.env.VITE_API_SERVER}/api/v1/users/${id}`
            axios.get(URL, getConfig())
            .then(res => {
            setPeople(res.data.censu)
            setUser(res.data)
            })
            .catch(err => console.log(err))
        }
        useEffect(() => {
          getPeople()
        }, [id])
      
const urlRecuperation =  `${import.meta.env.VITE_FRONT_DOMAIN}/#recoverypassword/${user?.passwordRequest}`;

  const copiarUrlRecupeacion = () => {
    copy(urlRecuperation)
      .then(() => {
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
          title: 'URL de recuperación copiada al porta papeles'
        })
      })
      .catch((err) => {
        console.error('Error al copiar al portapapeles: ', err);
      });
  };


  return (
 <>
    <Header/>
    <Aside/>
    <div className="content-wrapper">
        <section className="content-header">
        <div className="container-fluid">
      <div className="row mb-2">
      <div className="col-sm-6">
        <h1>Administrar Usuario</h1>
      </div>
      <div className="col-sm-6">
        <ol className="breadcrumb float-sm-right">

          <li className="breadcrumb-item"><Link to='/users' >Colaboradores</Link></li>
          <li className="breadcrumb-item active">Administrar Usuario</li>
        </ol>
      </div>
    </div>
  </div>
</section>
<section className="content">
  <div className="container-fluid">
  {
    people?
    <div className="row">
      <div className="col-md-3">
        {/* Profile Image */}
        <div className="card card-primary card-outline">
          <div className="card-body box-profile">
            <div className="text-center">
              <img className="profile-user-img img-fluid img-circle" src={`${import.meta.env.VITE_API_SERVER}/api/v1/images/citizen/${people?.picture}`} alt="User profile picture" />
            </div>
            <h3 className="profile-username text-center">{people?.firstName} {people?.lastName}</h3>
            <p className="text-muted text-center">{people?.nickname}</p>
            <ul className="list-group list-group-unbordered mb-3">
            <li className="list-group-item">
                <b>Usuario</b> <a className="float-right">{user?.email}</a>
              </li>

              <li className="list-group-item">
                <b>Rango</b> <a className="float-right">{user?.user_role?.roleName}</a>
              </li>
              <li className="list-group-item">
                
                <b>Estado</b> 
                {
                  user.active?<a className="float-right">
                    <button className='btn btn-danger btn-xs' onClick={()=> (userDisable(user.id, false), getPeople())}> Desactivar</button>
                    </a>
                  :<a className="float-right">
                    <button className='btn btn-success btn-xs' onClick={()=> (userDisable(user.id, true), getPeople())}> Activar</button>
                    </a> 
                }


                {/* {
                  user.active?
                
                <a className="float-right bg-success">
                  Activado
                </a>
                :<a className="float-right bg-danger">
                Desactivado
              </a>
                } */}
              </li>
            </ul>
          </div>
        </div>
      </div>
      {/* /.col */}
      <div className="col-md-9">
      <div className="card">
          <div className="card-header p-1">
            <ul className="nav nav-pills">
              <li className="nav-item"><a className="nav-link active" href="#editar" data-toggle="tab">Editar</a></li>
              <li className="nav-item"><a className="nav-link" href="#galeria" data-toggle="tab">Galeria</a></li>
            </ul>
          </div>{/* /.card-header */}
          <div className="card-body">
            <div className="tab-content">
              <div className="tab-pane active" id="editar">
              <CitizenForm updates={updates} citizen={people} getPeople={getPeople} />
              </div>
              <div className='tab-pane' id="galeria">
              <PeopleGallery/>
              </div>
            </div>
          </div>
        </div>
      {
        user.passwordRequest?
        <div className="card card-default">
        <div className="card-header">
          <h3 className="card-title">Recuperar de Clave</h3>
          <div className="card-tools">
            <button type="button" className="btn btn-tool" data-card-widget="collapse">
              <i className="fas fa-minus" />
            </button>
            <button type="button" className="btn btn-tool" data-card-widget="remove">
              <i className="fas fa-times" />
            </button>
          </div>
        </div>
        {/* /.card-header */}
        <div className="card-body">
        <ul className="list-group list-group-unbordered mb-3">
            <li className="list-group-item">
                <b>Codigo:</b> {user.passwordRequest}<a className="float-right">
                  
                  <button className='btn btn-primary' onClick={()=> copiarUrlRecupeacion()}>Copiar URL</button>
                  
                  </a>
              </li>
    </ul>
    </div>
    </div>
:""
}
  <div className="card card-default">
  <div className="card-header">
    <h3 className="card-title">Roles de Usuario</h3>
    <div className="card-tools">
      <button type="button" className="btn btn-tool" data-card-widget="collapse">
        <i className="fas fa-minus" />
      </button>
      <button type="button" className="btn btn-tool" data-card-widget="remove">
        <i className="fas fa-times" />
      </button>
    </div>
  </div>
  {/* /.card-header */}
  <div className="card-body">

    <div className="row">
  <div className="col-sm-6">
    {/* Select multiple*/}
    <div className="form-group">
      <label>Cambiar Rango</label>
      <select className="form-control"
      value={selectedRole}
      onChange={(e) => setSelectedRole(e.target.value)}
      size={5}
      >
        <option value={1}>Colaborador</option>
        <option value={2}>Delegado</option>
        <option value={3}>Administrador</option>
        <option value={4}>It Support</option>
        <option value={5}>Super Admin</option>
      </select>
    </div>
  </div>
  <div className="col-sm-6">
  <div className="form-group">
  <label>Descripción</label>
 <div id="accordion">
  <div className="card card-primary">
    <div className="card-header">
      <h4 className="card-title w-100">
        <a className="d-block w-100" data-toggle="collapse" href="#collapseOne">
        Colaborador (Nivel 1)
        </a>
      </h4>
    </div>
    <div id="collapseOne" className="collapse show" data-parent="#accordion">
      <div className="card-body">
      El Colaborador desempeña un papel vital en el proceso electoral al interactuar directamente con los electores en la comunidad.
      Utiliza dispositivos como teléfonos móviles, tabletas, computadoras o formularios para recolectar datos. 
      Su función principal es recopilar información valiosa de los ciudadanos y mantener una comunicación cercana con ellos. 
      A pesar de tener un rango más bajo en el sistema, su contribución es fundamental para el éxito del proceso electoral. 
      El Colaborador actúa como un enlace esencial entre la comunidad y el sistema electoral, desempeñando un papel valioso a pesar de sus limitaciones dentro del sistema.
      </div>
    </div>
  </div>
  <div className="card card-danger">
    <div className="card-header">
      <h4 className="card-title w-100">
        <a className="d-block w-100" data-toggle="collapse" href="#collapseTwo">
        Delegado (Nivel 2)
        </a>
      </h4>
    </div>
    <div id="collapseTwo" className="collapse" data-parent="#accordion">
      <div className="card-body">
      El Delegado ocupa una posición de gran importancia en el sistema electoral, con la autoridad para supervisar las operaciones electorales y tomar decisiones clave en el terreno. 
      Similar a un Colaborador, el Delegado interactúa directamente con los electores y recopila datos. 
      Sin embargo, el Delegado tiene la facultad adicional de decidir qué electores han votado y cuáles no. 
      Esta responsabilidad añadida implica un mayor nivel de confianza y autoridad en el proceso electoral. 
      Los Delegados desempeñan un papel crucial en garantizar un registro preciso de la participación electoral y contribuyen significativamente a la transparencia y confiabilidad del proceso.
      </div>
    </div>
  </div>
  <div className="card card-success">
    <div className="card-header">
      <h4 className="card-title w-100">
        <a className="d-block w-100" data-toggle="collapse" href="#collapseThree">
        Administrador (Nivel 3)
        </a>
      </h4>
    </div>
    <div id="collapseThree" className="collapse" data-parent="#accordion">
      <div className="card-body">
      El Administrador ostenta el rango más alto en el sistema electoral y tiene acceso privilegiado a información crítica, como datos estadísticos y resultados de encuestas. 
      Su rol es fundamental en la administración y supervisión del centro de cómputo y el sistema de datos. 
      Los Administradores tienen la autoridad para otorgar roles de Colaborador y Delegado, además de tener privilegios adicionales que les permiten tomar decisiones estratégicas y asegurar la integridad y seguridad de los datos durante todo el proceso electoral. 
      Su experiencia y conocimientos son esenciales para el funcionamiento fluido del sistema y la toma de decisiones informadas.
      </div>
    </div>
  </div>
</div>
</div>

  
  </div>
</div>

  </div>

  <div className="card-footer">
  <button className='btn btn-primary' onClick={()=> changeUserRole(user.id, selectedRole, getPeople)}>Asignar Rol</button>
  </div>
</div>

</div>
    
      {/* /.col */}
    </div>
    :<div className='loading' style={{height:"100px", marginBottom:"50px"}}>
    <Cargando escala='2'/>
    </div>
  }
    {/* /.row */}
  </div>{/* /.container-fluid */}
</section>
</div>
    <Footer/>
 </>
  )
}

export default UserAdministrator