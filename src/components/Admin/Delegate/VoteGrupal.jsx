import React, { useEffect, useState } from 'react';
import Footer from '../../Footer';
import Header from '../../Header';
import Aside from '../../Aside';
import CreateOrUpdateVoteGrupal from './createOrUpdateVoteGrupal' // Asegúrate de que la ruta de importación sea correcta
import axios from 'axios';
import getConfig from '../../../utils/getConfig';

const VoteGrupal = () => {
  const [positions, setPositions] = useState('');
  const [collegeId, setCollegeId] = useState('');
  const [suffrageValue, setSuffrageValue] = useState(false);
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

  const handleSubmit = (e) => {
    e.preventDefault();
    const positionsArray = positions.split(',').map(Number); // Convierte el string de posiciones en un array de números
    CreateOrUpdateVoteGrupal(positionsArray, collegeId, suffrageValue);
  };

  const handleChange = (e) => {
  
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <>
      <Header />
      <Aside />
      <div className="content-wrapper" style={{minHeight: '1258.94px'}}>
      <section className="content">

        <div className="container-fluid">
    <div className="row">
    <div className="row">
          <div className="col-md-12">
            <form>
            <div className="row">
              <div className="col-sm-8">
              <div className="form-group">
              <label>Recinto</label>
              <div style={{backgroundColor:"white", padding:"20px", overflowX:"hidden", overFlowY:'scroll',  height:"150px"}}>
              {precints?.map((recinto) => (
                      <div  key={recinto?.id}  className="custom-control custom-radio">
                      <input className="custom-control-input" type="radio" id={recinto?.id} name="precinct" onChange={() => setSelectedPrecint(recinto?.colegios)}/>
                      <label htmlFor={recinto?.id} className="custom-control-label">
                      <small className="badge badge-primary">

                        {recinto?.precintNumber.toString().padStart(5, '0')} </small> 
                        {' '}
                        <small className="badge badge-info"> 
                        {recinto?.PrecinctsDistrito[0]?.name? `${recinto?.PrecinctsMunicipio[0]?.name}, ${recinto?.PrecinctsDistrito[0]?.name}`:recinto?.PrecinctsMunicipio[0]?.name}
                        </small>
                        {' '}
                        {recinto?.recintoNombre}
                        </label>
                    </div>
                  ))}
              </div>
              </div>  
              </div>
              <div className="col-sm-4">
              <div className="form-group">
                  <label>Colegios en este recinto</label>
                  <select
                    className="form-control"
                    name="college"
                    value={collegeId} onChange={(e) => setCollegeId(e.target.value)}
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
</div>
</form>
</div>
</div>
    </div>
    <div className="row">
 
        <form onSubmit={handleSubmit}>
        <div className="col-sm-12">
        <div class="form-group">
                        <label> Posiciones (separadas por comas):</label>
                        <textarea value={positions} onChange={(e) => setPositions(e.target.value)} class="form-control" rows="5"  placeholder="Posiciones (separadas por comas)">

                        </textarea>
</div>
</div>
        {/* <div className="col-sm-12">
          <label>
            Posiciones (separadas por comas):
            <textarea value={positions} onChange={(e) => setPositions(e.target.value)} />
          </label>
          </div>  */}
          
         <label>
            ID del Colegio:
            <input type="text" disabled value={collegeId} onChange={(e) => setCollegeId(e.target.value)} />
          </label>
    
          <label>
            Valor del Sufragio:
            <select value={suffrageValue} onChange={(e) => setSuffrageValue(e.target.value === 'true')}>
              <option value="false">Falso</option>
              <option value="true">Verdadero</option>
            </select>
          </label>
          <br />
          <button type="submit">Enviar Votos</button>
        </form>
        </div>
        </div>
      </section>
      </div>
      <Footer />
    </>
  );
};

export default VoteGrupal;
