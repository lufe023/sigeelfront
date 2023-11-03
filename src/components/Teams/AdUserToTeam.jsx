import axios from 'axios';
import React, { useState } from 'react'
import Swal from 'sweetalert2';
import getConfig from '../../utils/getConfig';
import "./AdUserToTeams.css"


const AdUserToTeam = ({teamId, getOneteam}) => {
    const [results, setResults] = useState([])

    
    const findPeople = (findWord)=>{
        const URL = `${import.meta.env.VITE_API_SERVER}/api/v1/users/userSearch`
            axios.post(URL,
                {
                    findUser:findWord  
                },
            getConfig(),
            )
            .then(res => {
                setResults(res.data.data.rows)
        })
        .catch(err =>{
            setResults([])
        })
        }




const handleSubmit = (teamId, id) => {
  
  const URL = `${import.meta.env.VITE_API_SERVER}/api/v1/teams/${teamId}`;
  const data = { members:[id] };
  
  axios.post(URL, {members:[id]}, getConfig() )
  
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
      getOneteam(teamId)
      Toast.fire({
        icon: 'success',
        title: `fue agregado con éxito`
      });
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
      });

      Toast.fire({
        icon: 'error',
        title: `Hubo un error: `
      });
    });
};


const findingWord = e => {
    const fn = e.target.value.trim()
    findPeople(fn)
    if(fn!=''){
    
}else{
    
}
}
 return (
    <div>
        <div className="form-group">
  <label htmlFor="exampleInputEmail1">Añadir colaborador al equipo</label>
  <input type="text" className="form-control" id="exampleInputEmail1" placeholder="Apodo, nombre, apellido o cedula sin guiones" onChange={findingWord}/>
</div>

<ul style={{padding:0}}>
    {
        results?.map(user=>
                <li key={user.id} className={user?.colaborador?.email?'list-select-user-item': 'ist-select-user-item notPosible'}>
                            <div className="user-block list-select-user">
                            <div>
                            <button  
                            className={ user?.colaborador?.email?'float-right  btn  btn-success' :'float-right  btn  btn-success disabled'}
                            onClick={()=>handleSubmit(teamId,user?.colaborador.id)}>
                                <i className="fas fa-plus-circle"/> Agregar</button>
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
</ul>

    </div>
  )
}

export default AdUserToTeam