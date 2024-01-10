import React, { useState } from 'react';

const CitizenForm = ({precints, getAllPrecints, getAllData}) => {
  const [citizens, setCitizens] = useState([
    {
      cedula: '',
      nombre: '',
      apellido: '',
      celular: '',
      foto: null,
    },
  ]);

  const [formData, setFormData] = useState({
    precinct: '',
    college: ''
  });

  const [selectedPrecint, setSelectedPrecint] = useState()
  const selecciones = (recinto)=> {
    setSelectedPrecint(recinto?.colegios)
    setMapa(recinto)
  }


  const selectHandleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };


  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const updatedCitizens = [...citizens];
    updatedCitizens[index][name] = value;
    setCitizens(updatedCitizens);
  };

  const handleFotoChange = (e, index) => {
    const foto = e.target.files[0];
    const updatedCitizens = [...citizens];
    updatedCitizens[index].foto = foto;
    setCitizens(updatedCitizens);
  };

  const handleAddCitizen = () => {
    setCitizens([...citizens, { cedula: '', nombre: '', apellido: '', celular: '', foto: null }]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Aquí puedes realizar alguna validación antes de enviar los datos
    // ...

    // Luego, envías los datos al componente principal
    console.log(citizens);

    // Reinicias el estado del formulario
    setCitizens([
      {
        cedula: '',
        nombre: '',
        apellido: '',
        celular: '',
        foto: null,
      },
    ]);
  };
console.log(citizens)
  return (
    <div className="card card-primary">
    <div className="card-header">
      <h3 className="card-title">Ingreso Manual de Ciudadanos</h3>
      <div className="card-tools">
  <button type="button" className="btn btn-tool" data-card-widget="collapse">
    <i className="fas fa-minus" />
  </button>
</div>
    </div>
    <div className="card-body">
    <div className='row'> 
<div className="col-md-6">
              <form encType="multipart/form-data">
                <div className="form-group">
                  <label>Recinto</label>
                  <select
                    className="form-control"
                    name="precinct"
                    value={formData.precinct}
                    onChange={selectHandleChange}
                    required
                    size={5}>
                  {
                    precints?.map(recinto => 
                    <option onClick={()=> selecciones(recinto)} key={recinto?.id} value={recinto?.id}>{recinto?.precintNumber.toString().padStart(5, '0')} ({recinto?.PrecinctsMunicipio[0]?.name}) {recinto?.recintoNombre}</option>
                    )
                  }
                  </select>
                </div>
                
              </form>
</div>
<div className="col-md-6">
              <div className="form-group">
                  <label>Colegios en este recinto</label>
                  <select
                    className="form-control"
                    name="college"
                    required
                    onChange={selectHandleChange}
                    size={5}>
                      {
                      selectedPrecint?.sort((a, b) => a.collegeNumber - b.collegeNumber).map((colegio) => 
                      <option key={colegio?.id} value={colegio?.id}>Colegio {colegio?.collegeNumber.toString().padStart(4, '0')}</option>)
                      }
                  </select>
                </div>
            </div>
          </div>
    <div className="row">

      {citizens.map((citizen, index) => (
            <form key={index} className='shadow-sm col-sm-4' style={{display:"flex", justifyContent:"space-between"}}>
             <div className="col-sm-2" style={{minHeight:"120px"}}>
    
               <div className="form-group">
               <div className="card-tools">
              <span title="3 New Messages" className="badge bg-success">{index + 1}</span>
              </div>
               {citizen.foto && (
              <img src={URL.createObjectURL(citizen.foto)} alt={`Foto del ciudadano ${citizen.nombre}`} className="img-thumbnail" style={{ maxWidth: '100px', maxHeight: '100px', margin: '10px' }} />
            )}
               </div>
             </div>
             <div className="col-sm-8">
               {/* radio */}
            <div className="form-group">
      
          <label>
            <input type="text" className="form-control" placeholder="Cédula" name="cedula" value={citizen.cedula} onChange={(e) => handleInputChange(e, index)} />
          </label>
          
          <label>
            <input type="text" className="form-control" placeholder="Nombre" name="nombre" value={citizen.nombre} onChange={(e) => handleInputChange(e, index)} />
          </label>
          <br />
          <label>
            <input type="text" className="form-control" placeholder="Apellido" name="apellido" value={citizen.apellido} onChange={(e) => handleInputChange(e, index)} />
          </label>
          <br />
          <label>
            <input type="text" className="form-control" placeholder="Celular" name="celular" value={citizen.celular} onChange={(e) => handleInputChange(e, index)} />
          </label>
          <br />
          <div className="input-group">
          <div className="custom-file">
            <input type="file" name="foto" onChange={(e) => handleFotoChange(e, index)} className="btn btn-info" id="exampleInputFile" />
          </div>
          </div>

          <br />
          </div>
          </div>
        </form>
      ))}
        </div>
       <br />
      <button type="button" onClick={handleAddCitizen}>
        Nuevo Formulario
      </button>
      <br />
      <button type="button" onClick={handleSubmit}>
        Enviar Datos
      </button>
    
    </div>
    </div>
  );
};

export default CitizenForm;
