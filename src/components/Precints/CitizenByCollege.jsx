import React, { useEffect, useState } from 'react'
import Header from '../Header'
import Aside from '../Aside'
import Footer from '../Footer'
import axios from 'axios'
import getConfig from '../../utils/getConfig'
import Cargando from '../../utils/Cargando'
import './CitizenByCollege.css'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'
const CitizenByCollege = () => {
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

      const getAllPeopleyByCollege = (collegeId)=>{
        const URL = `${import.meta.env.VITE_API_SERVER}/api/v1/census/colegio/${collegeId}`
          axios.get(URL, getConfig())
          .then(res => {
            setCitizens(res.data[0].rows)
            setCollegeData(res.data[1])
            setIsloading(false)
          })
          .catch(err =>
            console.log(err))
            setIsloading(false)
      }
    
      console.log(citizens)

      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
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
  <div className="col-md-12">
    <button type="button" className="btn btn-primary btn-block" onClick={()=>{getAllPeopleyByCollege(formData.college), setIsloading(true)}}><i className="fa fa-search" /> Ver</button>
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
<div className="card">
  <div className="card-header">
    <h3 className="card-title">{collegeData?.precinctData.recintoNombre} 
    <small style={{marginLeft:"10px"}}>
        <b>Mesa:</b>  {collegeData?.id.toString().padStart(4, '0')}
    </small>
    </h3>
    
  </div>
  {/* /.card-header */}
  <div className="card-body table-responsive p-0">
  <table className="table table-hover text-nowrap">
          <thead>
            <tr>
              <th>Foto</th>
              <th>Datos</th>
              <th>Colegio</th>
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
                          <a className='btn btn-xs btn-primary' onClick={()=>addPeople(item.id)}> <i className="fas fa-user-plus"/> Agregar a Mi Gente</a>
                        }
                        
                        {/* {people.leader
        ?<i className="fas fa-user-check search-tool less"></i>
        :<i className="fas fa-user-plus search-tool" onClick={()=>addPeople(people.id, people.citizenID)}></i> } */}
                    
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
                <td>
                
                </td>
                </tr>
            ))}
          </tbody>
        </table>
</div>

  {/* /.card-body */}
</div>
</div>
  </section>
</div>

    <Footer/>
    </>
  )
}

export default CitizenByCollege