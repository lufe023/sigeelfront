import axios from 'axios'
import React, { useEffect, useState } from 'react'
import getConfig from '../../../utils/getConfig'

const DataConsistency = () => {
const [data, setData] = useState()

  const getAllData = ()=> {
    const URL = `${import.meta.env.VITE_API_SERVER}/api/v1/jce/dataConsistency`
    axios.get(URL, getConfig())
    .then(res => {
      setData(res.data)
    })
}

useEffect(() => {
  getAllData()
  }, [])

console.log(data)
  return (
    <>

{
    data?.map((recinto) =>
    <div className={`card collapsed-card ${recinto.electLocal === recinto.localCitizens && recinto.electExterior == recinto.exteriorCitizens?`` :`card-warning` }`}>
  <div className="card-header">
    <h3 className="card-title">{recinto.id.toString().padStart(5, '0')} {recinto.recintoNombre}
    <small>{recinto.electLocal === recinto.localCitizens && recinto.electExterior == recinto.exteriorCitizens?'':' (Recinto Incompleto)'}</small>
    </h3>
    <div className="card-tools">
        <button type="button" className="btn btn-tool" data-card-widget="collapse">
          <i className="fas fa-plus" />
        </button>
      </div>
  </div>
  {/* /.card-header */}
  <div className="card-body">

  <div className="form-group">
  Local: <small> {recinto.electLocal}</small> Actuales: <small>{recinto.localCitizens}</small>
  <div className="custom-control custom-switch custom-switch-off-danger custom-switch-on-success">
    {recinto.electLocal == recinto.localCitizens? 
    <input type="checkbox" checked className="custom-control-input" id="customSwitch3" />: 
    <input type="checkbox" className="custom-control-input" id="customSwitch3" />
    } 
    <label className="custom-control-label">Los datos locales {recinto.electLocal == recinto.localCitizens? "son concistentes": "no son consistentes"} </label>
  </div>
</div>

<div className="form-group">
  Exterior: <small> {recinto.electExterior}</small> Actuales: <small>{recinto.exteriorCitizens}</small>
  <div className="custom-control custom-switch custom-switch-off-danger custom-switch-on-success">
    {recinto.electExterior == recinto.exteriorCitizens? 
    <input type="checkbox" checked className="custom-control-input" id="customSwitch3" />: 
    <input type="checkbox" className="custom-control-input" id="customSwitch3" />
    } 
    <label className="custom-control-label">Los datos exteriores {recinto.electExterior == recinto.exteriorCitizens? "son concistentes": "no son consistentes"} </label>
  </div>
</div>

    <table className="table table-sm">
      <thead>
        <tr>
          <th >colegio</th>
          <th>En Padrón Local</th>
          <th>En Sistema Local</th>
          <th >Diferencia Local</th>
          
          <th >En Padron Exterior</th>
          <th >En Sistema Exterior</th>
          <th >Diferencia Exterior</th>
        </tr>
      </thead>
      <tbody>
      {recinto.colegios?.map((colegio) => (
  <tr key={colegio.id}>
    <td>
    <span className={`badge ${colegio.electExterior === colegio.collegeCitizensExterior && colegio.electLocal === colegio.collegeCitizensLocal ? "bg-success" : "bg-danger"}`}>
    {colegio.id.toString().padStart(4, '0')}
      </span>
    </td>
    <td>{colegio.electLocal}</td>
    <td>
      {colegio.collegeCitizensLocal}
    </td>
    <td>
      <span className={`badge ${colegio.electLocal === colegio.collegeCitizensLocal ? "bg-success" : "bg-danger"}`}>
        {(colegio.electLocal  - colegio.collegeCitizensLocal )}
      </span>
    </td>

    <td>
      {colegio.electExterior}
    </td>
    <td>
      {colegio.collegeCitizensExterior}
    </td>
    <td>
      <span className={`badge ${colegio.electExterior === colegio.collegeCitizensExterior ? "bg-success" : "bg-danger"}`}>
        {(colegio.electExterior - colegio.collegeCitizensExterior)}
      </span>
      </td>
  </tr>
))}

      </tbody>
    </table>
   
  </div>
  {/* /.card-body */}
</div>
    )}

    </>
  )
}

export default DataConsistency