import axios from 'axios'
import React, { useEffect, useState } from 'react'
import getConfig from '../../../utils/getConfig'

const SelectCollege = ({collegeData, setCollegeData, setCampains}) => {

      const [precints, setPrecints] = useState()
      const [selectedPrecint, setSelectedPrecint] = useState()
      
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

      const handleChange = (e) => {
        const { name, value } = e.target;
        setCollegeData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      };


      const getCampains = (college)=>{

        const URL = `${import.meta.env.VITE_API_SERVER}/api/v1/campains/college?collegeId=${college}`
            axios.get(URL,
            getConfig()
            )
            .then(res => {
              setCampains(res.data)
        })
        .catch(err =>{
    
            console.log(err)
        })
        }

  return (
  <>
    <div className="row">
      <div className="col-6">
      <div className="form-group">
          <label>Recinto</label>
          <select
            className="form-control"
            name="precinct"
            value={collegeData.precinct}
            onChange={handleChange}
            required
            size={4}
            >
          {
            precints?.map((recinto) => 
            <option onClick={()=>setSelectedPrecint(recinto?.colegios)} key={recinto?.id} value={recinto?.id}>{recinto?.precintNumber.toString().padStart(5, '0')} {recinto?.recintoNombre}</option>
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
                <option key={colegio?.id} value={colegio?.id}> {colegio?.collegeNumber.toString().padStart(4, '0')}</option>
                )
            }
        </select>
        </div>
</div>
        {
          collegeData.college?
          <div className='col-12'>
          <button className='btn btn-success' onClick={()=> getCampains(collegeData.college)}>Filtrar Campañas</button>
        </div>:""
        }

    </div>
    <div className="form-group">

    </div>
</>
  )
}

export default SelectCollege