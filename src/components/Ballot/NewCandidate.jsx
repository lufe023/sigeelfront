import React from 'react'
//import "./NewCandidate.css"

const NewCandidate = () => {

    const handleSubmit = e =>{
        console.log(e)
    }
  return (
    <div className='card-body'>
    <h3>Agregar un nuevo candidato/a</h3>

    <form className='new-candidate-form'>
    <div className='row'>
    <div className="col-3">
        <input type="file" className="custom-file-input" id="canditate-picture" accept="image/png, image/jpeg"/>
        <label className="custom-file-label" htmlFor="canditate-picture">Elige una foto</label>

    </div>

    <div className="col-2">
        <input type="text" placeholder="Nombre" className="form-control" />
    </div>

    <div className="col-2">
        <input type="text" placeholder="Partido" className="form-control" />
    </div>
    <div className="col-2">
        <input type="text" placeholder="Acronimo" className="form-control"/>
    </div>
    <div className="col-2">
    <select className="form-control">
        <option>Candidatura</option>
        <hr/>
        <option>Consejal Distrital</option>
        <option>Director Municipal</option>
        <hr/>
        <option>Regidor Municipal</option>
        <option>Alcalde Municipal</option>
        <hr/>
        <option>Diputado/a</option>
        <option>Senador/a</option>
        <hr/>
        <option>Presidente</option>
        </select>
        </div>
    </div>
<div className="card-footer">
<button className="btn btn-primary float-right">Guardar</button>
</div>
</form>
    </div>
  )
}

export default NewCandidate