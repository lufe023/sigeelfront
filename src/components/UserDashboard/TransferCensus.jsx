import React, { useState } from 'react'
import FindUser from './FindUser'
import "./TransferCensus.css"
import Swal from 'sweetalert2'
import axios from 'axios'
import getConfig from '../../utils/getConfig'

const TransferCensus = ({people, user}) => {
  const [results, setResults] = useState()
  const [userB, setUserB] = useState()

  const transferir = (leaderIdA, leaderIdB) => {
    Swal.fire({
      title: `¿Seguro quieres transferir electores?`,
      text: `Esta accion no se puede deshacer`,
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: "Dejar sin efecto",
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, transferir!'
    }).then((result) => {
      if (result.isConfirmed) {
        let timerInterval
        Swal.fire({
          title: 'Transfiriendo!',
          timer: 0,
          timerProgressBar: true,
          didOpen: () => {
            Swal.showLoading()
            const b = Swal.getHtmlContainer().querySelector('b')
            timerInterval = setInterval(() => {
            
            }, 100)
          },
          willClose: () => {
            clearInterval(timerInterval)
            setEliminado(true)
          }
        }).then((result) => {
          /* Read more about handling dismissals below */
        })

        const URL = `${import.meta.env.VITE_API_SERVER}/api/v1/census/transfercensus`
        axios.patch(URL,
          {
            leaderIdA, leaderIdB  
          },
      getConfig(),
      )
        .then(res => {
          Swal.fire(
            'Transferido!',
            'La Transferencia tuvo lugar',
            'success'
            )
    })
    .catch(err =>{
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: `${err.response.data.message}`,
        })
    })
      }
    })
  
  }
  return (
    <>
  <div className="card card-default">
  <div className="card-header">
    <h3 className="card-title">Transferir Padroncillo</h3>
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

<FindUser setResults={setResults}/>
<ul style={{padding:0}}>
    {
        results?.map(user=>
      <li key={user.id} className={user?.colaborador?.email?'list-select-user-item': 'ist-select-user-item notPosible'}>
          <div className="user-block list-select-user">
          <div>
          <button  
          className={ user?.colaborador?.email?'float-right  btn  btn-success' :'float-right  btn  btn-success disabled'}
          onClick={()=>setUserB(user)}>
              <i className="fas fa-plus-circle"/> Seleccionar</button>
          </div>
              <div>
              <img className="img-circle img-bordered-sm" src={`${import.meta.env.VITE_API_SERVER}/api/v1/images/citizen/${user?.picture}`} alt="user image" />
          <span className="username">
              <a href="#">{user.firstName}</a>
          </span>
          <span className="description">{user?.colaborador?.email || user?.citizenID }</span>
              </div>
          </div>
      </li>
)
}
<li>
{
  userB?<button className='btn btn-danger btn-block' onClick={()=> {setUserB(), setResults()}}>Cancelar</button>:""
}

</li>
</ul>
{userB?
<div>
<div className='transferContainer'>

  <img className='transferUserPicture' src={`${import.meta.env.VITE_API_SERVER}/api/v1/images/citizen/${people?.picture}`} />
<div style={{fontSize:"40px", width:"100%" }}>
<i className="fas fa-running iconoAnimadob" />
<i className="fas fa-arrow-right iconoAnimado" />

<i className="fas fa-running iconoAnimadoc" />
<i className="fas fa-arrow-right iconoAnimadob" />

<i className="fas fa-running iconoAnimado" />
<i className="fas fa-arrow-right iconoAnimadoc" />
<i className="fas fa-running iconoAnimadob" />
</div>

<img className="transferUserPicture" src={`${import.meta.env.VITE_API_SERVER}/api/v1/images/citizen/${userB?.picture}`} alt="User Image" />
</div>
<button className='btn btn-primary btn-xl btn-block' onClick={()=> transferir(user.id, userB.colaborador.id)}>Iniciar transferencia de padroncillo</button>
</div>:""}
</div>
</div>
    </>
  )
}

export default TransferCensus