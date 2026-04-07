import axios from 'axios';
import React, { useEffect, useState } from 'react';
import getConfig from '../../../utils/getConfig';

const SelectCollege = ({ collegeData, setCollegeData, setCampains, selectedPrecint, setSelectedPrecint }) => {

  const [precints, setPrecints] = useState([]);
  const [selectedCollege, setSelectedCollege] = useState(null);

  const getAllPrecints = () => {
    const URL = `${import.meta.env.VITE_API_SERVER}/api/v1/jce/precints`;
    axios.get(URL, getConfig())
      .then(res => {
        setPrecints(res.data.rows);
      })
      .catch(err => console.log(err));
  };

  useEffect(() => {
    getAllPrecints();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'precinct') {
      setSelectedPrecint(null); // Reset selectedPrecint when precinct is changed
    }
    setCollegeData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const getCampains = () => {
    if (!collegeData.college || !selectedCollege) return;

    const URL = `${import.meta.env.VITE_API_SERVER}/api/v1/campains/college?collegeId=${collegeData.college}`;
    axios.get(URL, getConfig())
      .then(res => {
        setCampains(res.data);
      })
      .catch(err => console.log(err));
  };

  return (
    <>
      <div className="row">
        <div className="col-6">
          <div className="form-group">
            <label>Recinto</label>
            <select
              className="form-control"
              name="precinct"
              value={collegeData?.precinct}
              onChange={handleChange}
              required
              size={4}
            >
              {precints?.map((recinto) => (
  <option onClick={() => setSelectedPrecint(recinto.colegios)} key={recinto.id} value={recinto.id}>
    {recinto.precintNumber.toString().padStart(5, '0')} 
    {/* Ajuste según la jerarquía de tu include de Sequelize */}
    ({recinto.PrecinctsSectorParaje?.ciudadSeccion?.municipio?.description || 'N/A'}) 
    {recinto.recintoNombre}
  </option>
))}
            </select>
          </div>
        </div>
        <div className="col-6">
          <div className="form-group">
            <label>Colegios en este recinto</label>
            <select
              className="form-control"
              name="college"
              onChange={(e) => {
                const selectedValue = e.target.value;
                setSelectedCollege(selectedValue);
                setCollegeData((prevData) => ({
                  ...prevData,
                  college: selectedValue,
                }));
              }}
              required
              size={4}
            >
              {selectedPrecint ? (
                selectedPrecint.map((colegio) => (
                  <option key={colegio.id} value={colegio.id}>
                    {colegio.collegeNumber.toString().padStart(4, '0')}
                  </option>
                ))
              ) : (
                <option value="">Selecciona un recinto primero</option>
              )}
            </select>
          </div>
        </div>
      </div>
      {collegeData.college ? (
        <div className='col-12'>
          <button className='btn btn-success' onClick={getCampains}>Filtrar Campañas</button>
        </div>
      ) : ""}
    </>
  );
};

export default SelectCollege;
