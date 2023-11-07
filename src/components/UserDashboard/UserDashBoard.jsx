import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'
import getConfig from '../../utils/getConfig'
import Aside from '../Aside'
import Footer from '../Footer'
import Header from '../Header'
import Cargando from '../../utils/Cargando'
import AllUsers from './AllUsers'
import userDisable from '../UserDashboard/userDisable'
const UserDashBoard = () => {
  const [users, setUsers] = useState([])
  const [allData, setAllData] = useState()
  const [loading, setLoading] = useState(true)
  const [pagination, setPagination] = useState({
    offset: 0,
    limit: 10,
    count: 0,
    next: '',
    prev: '',
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const estilos = {
    cursor:{
      cursor: "pointer"
    }
  }

  
  const getAllUsers = (page = 1) => {

    const URL = `${import.meta.env.VITE_API_SERVER}/api/v1/users?offset=${(page - 1) * pagination.limit}&limit=${pagination.limit}`;
  
      axios.get(URL, getConfig())
      .then(res => {
        setUsers(res.data.results);
        setTotalPages(Math.ceil(res.data.count / pagination.limit));
        setCurrentPage(page);
        setLoading(false);
      })
      .catch(err =>{
        console.log(err)
        setLoading(false)
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
          title: `Accion no permitida: ${err.response.statusText}`
        })
      })
      
  }

    useEffect(() => {
      getAllUsers(currentPage);
    }, [currentPage]);

  return (
    <div>
        <Header/>
        <Aside/>
        <div className="content-wrapper">
            <section className="content-header">
    <div className="container-fluid">
      <div className="row mb-2">
        <div className="col-sm-6">
          <h1>Colaboradores</h1>
        </div>
            <div className="col-sm-6">
            <ol className="breadcrumb float-sm-right">
            <li className="breadcrumb-item"><a href="#">Dashboard</a></li>
            <li className="breadcrumb-item"><Link to='/users' >Colaboradores</Link></li>
            </ol>
            </div>
      </div>
    </div>
  </section>
  <section className="content">
  <div className="row">

    <div className="col-12">
      <div className='' style={{display:'flex', justifyContent:"center"}}>
    <div className="form-group col-6 col-3" >
  <label>Usuarios por Página</label>
  <div className="input-group">
  <select
    className="form-control"
    value={pagination.limit}
    onChange={(e) => {
      const newLimit = parseInt(e.target.value, 10);
      setPagination((prevPagination) => ({
        ...prevPagination,
        limit: newLimit,
      }));
      setCurrentPage(1);
    }}
  >

    <option value={10}>10</option>
    <option value={20}>20</option>
    <option value={50}>50</option>
    <option value={70}>70</option>
    <option value={100}>100</option>
  </select>
  <div className="input-group-append" onClick={() => getAllUsers(1)} style={{cursor:"pointer"}}>
    <span className="input-group-text"><i className="fas fa-search"/></span>
  </div>
</div>
</div>
</div>
<ul className="pagination" style={{ display: "flex", justifyContent: "center" }}>
  <li className={`paginate_button page-item ${currentPage === 1 ? 'disabled' : ''}`}>
    <button className="page-link" onClick={() => setCurrentPage(currentPage - 1)}>
      Anterior
    </button>
  </li>
  {Array.from({ length: totalPages }, (_, index) => (
    <li
      key={index + 1}
      className={`paginate_button page-item ${currentPage === index + 1 ? 'active' : ''}`}
    >
      <button className="page-link" onClick={() => setCurrentPage(index + 1)}>
        {index + 1}
      </button>
    </li>
  ))}
  <li className={`paginate_button page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
    <button className="page-link" onClick={() => setCurrentPage(currentPage + 1)}>
      Siguiente
    </button>
  </li>
</ul>
{
    loading?<div className='loading' style={{height:"100px", marginBottom:"50px"}}>
    <Cargando escala='1.5'/>
    </div>
  :
      <AllUsers users={users} userDisable={userDisable} getAllUsers={getAllUsers(currentPage)}/>
}
    </div>
    </div>

    
  </section>
        </div>
<Footer/>
</div>
  )
}

export default UserDashBoard