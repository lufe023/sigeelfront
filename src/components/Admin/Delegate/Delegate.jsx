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
          <div className="col-md-10 offset-md-1">
            <form>
            <div className="row">
              <div className="col-sm-6">
              <div className="form-group">
              <label>Recinto</label>
              <div style={{backgroundColor:"white", padding:"20px", overflowX:"hidden", overFlowY:'scroll',  height:"150px"}}>
              {precints?.map((recinto) => (
                      <div  key={recinto?.id}  className="custom-control custom-radio">
                      <input className="custom-control-input" type="radio" id={recinto?.id} name="precinct" onChange={() => setSelectedPrecint(recinto?.colegios)}/>
                      <label htmlFor={recinto?.id} className="custom-control-label">
                      <small className="badge badge-primary">

                        {recinto?.precintNumber.toString().padStart(5, '0')} </small>{recinto?.recintoNombre}
                        </label>
                    </div>
                  ))}
              </div>
              </div>    
              </div>
              <div className="col-sm-6">
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
                        <option key={colegio?.id} value={colegio?.id}>Colegio {colegio?.collegeNumber.toString().padStart(4, '0')}</option>
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
  <div className="card">
  <div className="card-header bg-dark">
    <h3 className="card-title">{collegeData?.precinctData.recintoNombre} 
    <small style={{marginLeft:"10px"}}>
        <b>Mesa:</b>  {collegeData?.collegeNumber.toString().padStart(4, '0')}
    </small>
    <small style={{marginLeft:"10px"}}>
        <b>Total Colegio:</b>  {pagination.count}
    </small>
    </h3>
  </div>
  {/* /.card-header */}
</div>
  
    <ListByCollege  
    citizens={citizens} 
    getAllPeopleyByCollege={getAllPeopleyByCollege}
    formData={formData.college}
    pagination={pagination.limit} 
    addPeople={addPeople}/>
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