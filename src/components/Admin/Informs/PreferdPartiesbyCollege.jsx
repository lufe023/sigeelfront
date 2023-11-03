import axios from 'axios';
import React, { useEffect, useState } from 'react';
import getConfig from '../../../utils/getConfig';
import DonutChart from '../../ChartJS/DonutChart';
import CargandoB from '../../../utils/CargandoB/CargandoB';
import * as XLSX from 'xlsx';

const PreferdPartiesByCollege = ({campainId, collegeId}) => {
    const [data , setData] = useState([])
    const [loading, setLoading] = useState(false)

    const getCampains = () => {
      setLoading(true)

        let URL = `${import.meta.env.VITE_API_SERVER}/api/v1/reports/collegeReport?campainId=${campainId}&collegeId=${collegeId}`;
        
        axios.get(URL, getConfig())
        .then((res) => {
          console.log(res)
          if(res.data[1].undefined[0].preferedParty){
            setData(res.data)
            setLoading(false)
          }
          else{
            setData([])
          }
        })
        .catch((err) => {
            console.log(err);
        });
    };

    const acentos = {
      á: 'a',
      é: 'e',
      í: 'i',
      ó: 'o',
      ú: 'u',
      Á: 'A',
      É: 'E',
      Í: 'I',
      Ó: 'O',
      Ú: 'U',
    };

    let nameMunicipality = data?.[0]?.[0].municipalities.name.replace(/[áéíóúÁÉÍÓÚ]/g, (letra) => acentos[letra] || letra);
console.log(data?.[0]?.[0].municipalities.name)

    function convertToExcel(data) {
      
          const ws = XLSX.utils.json_to_sheet(data);
          const wb = XLSX.utils.book_new();
          XLSX.utils.book_append_sheet(wb, ws, nameMunicipality);
          return wb;
        }
  
    function handleExportToExcel() {
      const partyData = data[1].undefined?.map((voto) => {
        return {
          PreferedParty: voto.preferedPartyDetails[0].partyName,
          Acronyms: voto.preferedPartyDetails[0].partyAcronyms,
          Color: voto.preferedPartyDetails[0].color,
        };
      });
  
      const wb = convertToExcel(partyData);
      XLSX.writeFile(wb, 'Informe Partido Preferido por Colegio.xlsx');
    }

// Crear un objeto para almacenar la información agrupada por 'preferedParty'
const partyData = {};

// Iterar a través de los datos originales y agrupar por 'preferedParty'
data[1]?.undefined?.forEach((item) => {
  const preferedParty = item.preferedParty;
  if (!partyData[preferedParty]) {
    // Inicializar un nuevo objeto si aún no existe
    partyData[preferedParty] = {
      id: item.preferedPartyDetails[0].id,
      partyName: item.preferedPartyDetails[0].partyName,
      partyAcronyms: item.preferedPartyDetails[0].partyAcronyms,
      color: item.preferedPartyDetails[0].color,
      total: 0,
    };
  }
  // Incrementar el total cada vez que aparece un partido
  partyData[preferedParty].total++;
});

// Obtener un nuevo array a partir del objeto partyData
const resultArray = Object.values(partyData);

  return(
    <>
    <div className='row'>
      <div className='col-lg-12'>
      <div className="card">
  <div className="card-header border-0">
    <div className="d-flex justify-content-between">
      <h3 className="card-title"> {data[0]?.[0]?.name}  <small>Métricas de Partidos por Colegios Electorales</small></h3>
    <div className="card-tools">
  <button type="button" className="btn btn-tool" data-card-widget="collapse">
    <i className="fas fa-minus" />
  </button>
  
  <button className='btn btn-tool bg-primary' onClick={getCampains}>
    <i className="fas fa-cogs"/> Generar</button>
</div>

    </div>
  </div>
  <div className="card-body">

      <p className="d-flex flex-column">
        <span className="text-bold text-lg"> {data[0]?.[0]?.name}</span>
        <span> {data[0]?.[0]?.details}</span>
        
        {
          loading?
          <div className='loading' style={{height:"100px", marginBottom:"50px"}}>
          <CargandoB scale={'1.9'}/><span style={{marginLeft:"-80px"}}>No hay datos</span></div>:""
          
        }

      </p>

      {
      
      data[1]?.undefined[0]?.preferedParty?
    <button className='btn btn-app bg-success' onClick={handleExportToExcel}><i className="fas fa-file-excel"></i>Exportar a Excel</button>:""
      }
    <div className="d-flex flex-row justify-content-end">

    <button className='btn btn-primary btn-block' onClick={getCampains}> <i className="fas fa-cogs"/> Generar Informe</button>
    </div>
  </div>
</div>

    </div>
    </div>
    {
          loading?"":
  <div className='row'>
    <div className='col-lg-8 connectedSortable ui-sortable'>
    <DonutChart preferedParties={resultArray}/>
    </div>
    <div className='col-lg-4 connectedSortable ui-sortable'>
    <div className="card">
    <div className="card-header">
    <h3 className="card-title">Detallado</h3>
    </div>
    <div className='card-body'  style={{backgroundColor:"#f1f1f1"}}>
        <ul className='chart-legend clearfix'>
        {resultArray?.map((partido)=> 
        <li key={partido.id} >
            <span style={{backgroundColor:`${partido.color}`,
            padding:"0 10px", 
            marginRight:'3px', 
            display:'inline-blok',
            borderRadius:'10px'}}></span>
            {partido.partyAcronyms} : {partido.total}
        </li>
        )
        }
</ul>

    </div>
    </div>
    </div>
  </div>
}
  </>
  )
};

export default PreferdPartiesByCollege;
