import axios from 'axios'
import React, { useState } from 'react'
import getConfig from '../../utils/getConfig'

const FindUser = ({setResults}) => {

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
            console.log(err)
        })
        }

    const findingWord = e => {
        const fn = e.target.value.trim()
        findPeople(fn)
        if(fn!=''){
    
}
}

    return (
    <div>
    <div className="form-group">
    <label htmlFor="exampleInputEmail1">Buscar un usuario</label>
    <input type="text" autoComplete="off" className="form-control" id="exampleInputEmail1" placeholder="Apodo, nombre, apellido o cedula sin guiones" onChange={findingWord}/>
</div>

    </div>
)
}

export default FindUser