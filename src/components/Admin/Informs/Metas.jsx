import axios from 'axios';
import React, { useState } from 'react'
import getConfig from '../../../utils/getConfig';
import CargandoB from '../../../utils/CargandoB/CargandoB';
import ListByCollege from '../Delegate/ListByCollege';
import ExportToExcel from '../../ExportToExcel';

const Metas = ({college}) => {

  const [loading, setLoading] = useState(false)
  const [data, setData] = useState()
  const [colegios, setColegios] = useState()
  const [reporte, setReporte] = useState([]) 
 
  const getData = () => {
    setLoading(true);
  
    let URL = `${import.meta.env.VITE_API_SERVER}/api/v1/reports/cobertura?precinct=${college.precinct}`;
    
    axios.get(URL, getConfig())
    .then((res) => {
      setData(res.data);
      setColegios(res.data[1]);
      setLoading(false);
      const recintoNombre = res.data?.[0].recintoNombre;
      const newReporte = res.data[1]?.rows?.map(colegio => {
        const electoresTotales = colegio.electLocal;
        const sinLider = colegio.ColegioCensus.length;
        const votos = colegio.ColegioCensus.reduce((acc, item) => acc + (item.sufragio && item.sufragio.suffrage ? 1 : 0), 0);
        const porcentajeConLider = ((electoresTotales - sinLider) / electoresTotales) * 100;
        const porcentajeConLiderFormatted = porcentajeConLider.toFixed(2) + '%'; // Redondea a dos decimales y añade el símbolo %
  
        return {
          Recinto: recintoNombre,
          Colegio: colegio.collegeNumber,
          Electores: electoresTotales,
          "Con Lider": electoresTotales - sinLider,
          "Sin Lider": sinLider,
          "Votos": votos, // Añadido el conteo de votos aquí
          "Porcentaje Cubierto": porcentajeConLiderFormatted
        };
      });
      setReporte(newReporte);
    })
    .catch((err) => {
      console.log(err);
    });
  };

  return (
    <>
    {college.precinct?
    <p>
    <button onClick={getData}>Generar</button></p>:<h1>Seleccione un Recinto</h1>
    }
<div className={`card `}>
  <div className="card-header bg-dark">
    <h3 className="card-title">Datos del Recinto</h3>
  </div>
  {/* /.card-header */}
  <div className="card-body">
  <h5>{data?.[0].recintoNombre}</h5>
  <p>{data?.[0].direccionRecinto}</p>
  <div className="form-group">
  Local: <small> {data?.[0].electLocal.toLocaleString('en-EN', { useGrouping: true })}</small>
  <br/>
  Exterior: <small> {data?.[0].electExterior.toLocaleString('en-EN', { useGrouping: true })}</small>
  <br/>
  {colegios?
  <ExportToExcel data={reporte} precintName={data?.[0].recintoNombre} colegios={colegios}/>
  :""
}
</div>
  </div>
</div>
{colegios?.rows?.map((colegio)=>
  <div className={`card collapsed-card`} key={colegio.id}>
  <div className="card-header">
    <h3 className="card-title">Colegio {colegio.collegeNumber}
   {colegio.ColegioCensus.length > Math.round(colegio.electLocal- colegio.electLocal * 0.5 ) ?
    <small className="badge badge-danger"><i className="fas fa-exclamation-circle" /> Recomendaciones </small>
    :""}
    </h3>
    <div className="card-tools">
<button type="button" className="btn btn-tool" data-card-widget="collapse">
<i className="fas fa-plus"></i>
       </button>
     </div>
 </div>
 {/* /.card-header */}
 <div className="card-body ">
 <div className="form-group">
  Local: <small> {colegio.electLocal.toLocaleString('en-EN', { useGrouping: true })}</small>
  <br/>
  Exterior: <small> {colegio.electExterior.toLocaleString('en-EN', { useGrouping: true })}</small>
  <br/>
  Se muestran <b>{colegio.ColegioCensus.length}</b>, que no tienen lider asignados
  <br/>
  Pendiente sin Lider para el 50%:  <b>{Math.round(colegio.electLocal * 0.5)}</b>
  <br/>
</div>
<ListByCollege citizens={colegio.ColegioCensus} />
</div>
</div>
  )}


     {
          loading?
          <div className='loading' style={{height:"100px", marginBottom:"50px"}}>
          <CargandoB scale={'1.9'}/><span style={{marginLeft:"-80px"}}> ...Cargando</span></div>:""
          
        }
    </>
  )
}

export default Metas