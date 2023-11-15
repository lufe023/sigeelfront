import React, { useEffect, useState } from 'react'
import Header from '../../Header'
import Aside from '../../Aside'
import Footer from '../../Footer'
import axios from 'axios'
import getConfig from '../../../utils/getConfig'
import Cargando from '../../../utils/Cargando'
import '../../Precints/CitizenByCollege.css'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'
import ListByCollege from './ListByCollege'
const Delegate = () => {
    const [precints, setPrecints] = useState()
    const [selectedPrecint, setSelectedPrecint] = useState()

  const [formData, setFormData] = useState({
    id: 0,
    precinct: '',
    electLocal: 0,
    electExterior: 0,
    meta: 0,
    college: ''
  });

    const getAllPrecints = ()=>{
        const URL = `${import.meta.env.VITE_API_SERVER}/api/v1/jce/precints`
          axios.get(URL, getConfig())
          .then(res => {
            setPrecints(res.data.rows)
          })
          .catch(err =>
            console.log(err))
      }
    
      useEffect(() => {
        getAllPrecints()
      }, [])

  

      const [citizens, setCitizens] = useState() 
      const [collegeData, setCollegeData] = useState()
      const [isLoading, setIsloading] = useState(false)
      const [pagination, setPagination] = useState({
        offset: 0,
        limit: 10,
        count: 0,
        next: '',
        prev: '',
        includeExterior: false
      });

      const getAllPeopleyByCollege = (collegeId, offset, limit) => {
        
      let URL = `${import.meta.env.VITE_API_SERVER}/api/v1/census/colegio/${collegeId}?offset=${offset}&limit=${limit}`
        if(pagination.includeExterior){
        URL = `${import.meta.env.VITE_API_SERVER}/api/v1/census/colegio/${collegeId}?offset=${offset}&limit=${limit}&includeExterior=${pagination.includeExterior}`
        }
        
          axios.get(URL, getConfig())
          .then(res => {

            setCitizens(res.data.results)
            setCollegeData(res.data.precinctData)
            setIsloading(false)
              setPagination({
                offset: res.data.offset,
                limit: res.data.limit,
                count: res.data.count,
                next: res.data.next,
                prev: res.data.prev,
                includeExterior: res.data.includeExterior
              })
          })
          .catch(err =>
            console.log(err))
            setIsloading(false)
      }
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      };

      const handleChangePagination = (e) => {
        const { name, value, checked } = e.target;
        setPagination((prevData) => ({
          ...prevData,
          [name]: name === 'includeExterior' ? checked : value,
        }));
      };

      const addPeople = (people)=>{
        const URL = `${import.meta.env.VITE_API_SERVER}/api/v1/census/addpeople`
        axios.post(URL,
            {
              peopleId:people 
            },
        getConfig(),
        )
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
            title: 'Ciudadano agregado con exito'
          })
          getAllPeopleyByCollege(formData.college, pagination.offset, pagination.limit)
    })
    .catch(err =>{
        console.log(err)
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
        console.log(error)
        Toast.fire({
          icon: 'error',
          title: 'Algo anda mal, no se agregó el ciudadano'
        })
    })
      }

      const totalPages = Math.ceil(pagination.count / pagination.limit);
      const currentPage = Math.floor(pagination.offset / pagination.limit) + 1;
      
      const maxPagesToShow = 5; // Número máximo de páginas a mostrar
      let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
      let endPage = startPage + maxPagesToShow - 1;
      
      if (endPage > totalPages) {
        endPage = totalPages;
        startPage = Math.max(1, endPage - maxPagesToShow + 1);
      }
      
      const pageNumbers = [...Array(endPage - startPage + 1).keys()].map(
        (num) => num + startPage
      );
      
      const paginationElements = pageNumbers.map((pageNumber) => (
        <li
          key={pageNumber}
          className={`paginate_button page-item ${
            pageNumber === currentPage ? "active" : ""
          }`}
        >
          <button
            href="#"
            aria-controls="example2"
            className="page-link"
            onClick={() =>
              getAllPeopleyByCollege(
                formData.college,
                (pageNumber - 1) * pagination.limit,
                pagination.limit,
                pagination.includeExterior
              )
            }
          >
            {pageNumber}
          </button>
        </li>
      ));
      


  return (
    <>
    <Header/>
    <Aside/>
  <div className="content-wrapper" style={{minHeight: '1258.94px'}}>
  {/* Main content */}
  <section className="content">
    <div className="container-fluid">
      <h2 className="text-center" style={{paddingTop:"50px"}}>Ciudadanos por Colegios</h2>
  
        
        <div className="row">
          <div className="col-md-10 offset-md-1" >
            <form>
            <div className="row">
              <div className="col-6">
              <div className="form-group">
                  <label>Recinto</label>
                  <select
                    className="form-control"
                    name="precinct"
                    value={formData.precinct}
                    onChange={handleChange}
                    required
                    size={4}
                    >
                  {
                    precints?.map((recinto) => 
                    <option onClick={()=>setSelectedPrecint(recinto?.colegios)} key={recinto?.id} value={recinto?.id}>{recinto?.id.toString().padStart(5, '0')} {recinto?.recintoNombre}</option>
                    )
                  }
                  </select>
                </div>
              </div>
              <div className="col-6">
              <div className="form-group">
                  <label>Colegios en este recinto</label>
                  <select
                    className="form-control"
                    name="college"
                    onChange={handleChange}
                    required
                    size={4}
                    >
                      
                      {
                      selectedPrecint?.map((colegio) => 
                        <option key={colegio?.id} value={colegio?.id}>Colegio {colegio?.id.toString().padStart(4, '0')}</option>
                        )
                    }
                </select>
                </div>
              </div>
      
            </div>
            <div className="form-group">



  <div className='row'>
<div className="col-md-6">
<div className="form-group">
  <label>Personas por Paginas</label>
  <select className="form-control"
  value={pagination.limit}
  onChange={(e) => {
    const newLimit = parseInt(e.target.value);
    setPagination((prevPagination) => ({
      ...prevPagination,
      limit: newLimit,
    }));
  }}
  >
  <option>10</option>
  <option>20</option>
    <option>50</option>
    <option>70</option>
    <option>100</option>
  </select>
</div>
</div>
<div className="col-md-6">
 <div className="form-group">
  <label>Incluir Padrón Exterior</label>
 <div className="form-group">
  <div className="custom-control custom-switch custom-switch-off-danger custom-switch-on-success">
    <input type="checkbox" className="custom-control-input" id="customSwitch3"
    name="includeExterior"
    checked={pagination.includeExterior}
    onChange={handleChangePagination} 
    />
    <label className="custom-control-label" htmlFor="customSwitch3">{pagination.includeExterior?"Incluyendo": "Excluyendo"}</label>
  </div>
</div>


</div>
</div>


</div>
<div className="col-md-12">
<button type="button" className="btn btn-primary btn-block" onClick={()=>{getAllPeopleyByCollege(formData.college, pagination.offset, pagination.limit ), setIsloading(true)}}><i className="fa fa-search" /> Ver</button>
  </div>
</div>
</form>

{
    isLoading?<div className='loading' style={{height:"100px", marginBottom:"100px"}}>
    <Cargando escala='2'/>
    </div>:""
}


</div>
</div>

{
  paginationElements.length>0?
  <div className="col-sm-12 col-md-12 " style={{ textAlign:"center"}}> {/* Agrega la clase text-center para centrar horizontalmente */}

  <div className="dataTables_paginate paging_simple_numbers" id="example2_paginate">
    <ul className="pagination" style={{display:"flex", justifyContent:"center"}}>
      <li className="paginate_button page-item previous" id="example2_previous">
        <button href="#" aria-controls="example2" onClick={() => getAllPeopleyByCollege(formData.college, pagination.offset - pagination.limit, pagination.limit)} className="page-link">
          Anterior
        </button>
      </li>

      {paginationElements}

      <li className="paginate_button page-item next" id="example2_next">
        <button href="#" aria-controls="example2" onClick={() => getAllPeopleyByCollege(formData.college, pagination.offset + pagination.limit, pagination.limit)} className="page-link">
          Siguiente
        </button>
      </li>
    </ul>
  </div>
</div>
:""
}
{
  citizens?
  <>
  <h5 className="mb-2">
  {collegeData?.precinctData.recintoNombre} 
    <small style={{marginLeft:"10px"}}>
        <b>Mesa:</b>  {collegeData?.id.toString().padStart(4, '0')}
    </small>
    <small style={{marginLeft:"10px"}}>
        <b>Total Colegio:</b>  {pagination.count}
    </small>
    </h5>
    <ListByCollege  
    citizens={citizens} 
    getAllPeopleyByCollege={getAllPeopleyByCollege}
    formData={formData.college}
    pagination={pagination.limit} />

<div className="card">
  
  <div className="card-header">
    <h3 className="card-title">{collegeData?.precinctData.recintoNombre} 
    <small style={{marginLeft:"10px"}}>
        <b>Mesa:</b>  {collegeData?.id.toString().padStart(4, '0')}
    </small>
    <small style={{marginLeft:"10px"}}>
        <b>Total Colegio:</b>  {pagination.count}
    </small>
    </h3>
  </div>
  {/* /.card-header */}
 
  <div className="card-body ">
    
  <table className="table table-hover text-nowrap">
          <thead>
            <tr>
              <th>Foto</th>
              <th>Datos</th>
          
            </tr>
          </thead>
          <tbody>
           
            {citizens?.map(item => (
              <tr key={item.id}>
                <td style={{width:'150px'}}>
                <Link to={`/mypeople/${item.id}`}>
                <img src={`${import.meta.env.VITE_API_SERVER}/api/v1/images/citizen/${item?.picture}`} alt="user-avatar" className="img-fluid" />
                </Link>
                    </td>
                <td>
                <ul className='ciudadanosColegio'>
                    <li>
                    <Link to={`/mypeople/${item.id}`}>
                    {item.firstName} {item.lastName} {item.nickname? `(${item.nickname})`:""} </Link>
                    </li>
                    <li>
                        {item.citizenID.substring(0,3)+'-'+item.citizenID.substring(3,10)+'-'+item.citizenID.substring(10,11)}
                    </li>
                    <li>
                        <b>Cel:</b> {item.celphone}
                    </li>
                    <li>
                        <b>Tel: </b>{item.telephone}
                    </li>
                    <li>
                        <b>Otro Tel: </b>{item.otherphone}
                    </li>
                    <li>
                        Dir: {item.adress}
                    </li>
                    <li>
                    
                        {
                          item.leaders?.id? <span> Lider:  <Link to={`/peoplebyuser/${item.leaders?.id}`}>{item.leaders?.censu?.firstName}</Link></span>:
                          <a className='btn btn-xs btn-primary' onClick={()=>{addPeople(item.id)}}> <i className="fas fa-user-plus"/> Agregar a Mi Gente</a>
                        }

                      
                    </li>
                    
                </ul>
                <ul className='ciudadanosColegio'>
                    <li>
                <b>Posicion: </b>{item.position}
                </li>
                {item.outside?
                <li>
                {item.outside?'Exterior':''}
                </li>
                :""
                }

                {item.condition?
                <li>
                <b>Condicion:</b> {item.condition.conditionDetails}
                
                </li>
                :""
                }
                <li>
                    <b>Votó:</b> {item.sufragio?"Si":"No"}
                </li>
                </ul>
                </td>
            
                </tr>
            ))}

          </tbody>
        </table>
        <div className="row">
          <div className="col-sm-12 col-md-5">
            <div className="dataTables_info" id="example2_info" role="status" aria-live="polite">
              {/* Mostrando {pagination.offset+1} to {pagination.limit+pagination.offset} de {pagination.count} ciudadanos */}
              </div>
          </div>
  
          </div>
        

</div>

</div>
</>
:""
}

{
  paginationElements.length>0?
  <div className="col-sm-12 col-md-12 " style={{ textAlign:"center"}}> {/* Agrega la clase text-center para centrar horizontalmente */}

  <div className="dataTables_paginate paging_simple_numbers" id="example2_paginate">
    <ul className="pagination" style={{display:"flex", justifyContent:"center"}}>
      <li className="paginate_button page-item previous" id="example2_previous">
        <button href="#" aria-controls="example2" onClick={() => getAllPeopleyByCollege(formData.college, pagination.offset - pagination.limit, pagination.limit)} className="page-link">
          Anterior
        </button>
      </li>

      {paginationElements}

      <li className="paginate_button page-item next" id="example2_next">
        <button href="#" aria-controls="example2" onClick={() => getAllPeopleyByCollege(formData.college, pagination.offset + pagination.limit, pagination.limit)} className="page-link">
          Siguiente
        </button>
      </li>
    </ul>
  </div>
</div>
:""
}



</div>
  </section>
</div>

    <Footer/>
    </>
  )
}

export default Delegate