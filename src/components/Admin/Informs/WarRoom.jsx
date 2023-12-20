import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, ArcElement, Tooltip, Legend } from 'chart.js';
import Header from '../../Header';
import Aside from '../../Aside';
import Footer from '../../Footer';
import axios from 'axios';
import getConfig from '../../../utils/getConfig';
ChartJS.register(LineElement, ArcElement, Tooltip, Legend);

const WarRoom = () => {

    const [info, setInfo] = useState()
    const getInfo = () => {
          let URL = `${import.meta.env.VITE_API_SERVER}/api/v1/reports/urna`;
          
          axios.get(URL, getConfig())
          .then((res) => {
            setInfo(res.data)
          })
          .catch((err) => {
              console.log(err);
          });
      };
    
      useEffect(() => {
        const getInfoAndSetInterval = () => {
            getInfo();  // Realiza la consulta al cargar la página
    
            // Configura un intervalo para realizar la consulta cada 1 minuto (ajusta según tus necesidades)
            const intervalId = setInterval(() => {
                getInfo();
            }, 60000*5);  // 60000 milisegundos es igual a 1 minuto
    
            // Devuelve una función de limpieza para detener el intervalo cuando el componente se desmonte
            return () => clearInterval(intervalId);
        };
    
        // Llama a la función para la primera vez
        getInfoAndSetInterval();
    }, []); 
      
      const groupedData = {};

      // Iterar sobre los datos y agrupar por nombre
      info?.forEach((obj) => {
          if (!groupedData[obj.name]) {
              groupedData[obj.name] = {
                  nombre: obj.name.substr(0,10)+' ('+obj.partyAcronyms+')',
                  color: obj.color,
                  puntos: new Array(24).fill(0), // Crear un array de 24 horas con valores iniciales de 0
              };
          }
          // Incrementar el total en la hora correspondiente
          groupedData[obj.name].puntos[obj.hour] += obj.total;
      });
      
      // Convertir el objeto de datos agrupados de nuevo a un array
      const resultArray = Object.values(groupedData);
  

      const datasets = resultArray.map((candidato, index) => ({
        label: candidato.nombre,
        data: candidato.puntos,
        borderColor: candidato.color,
        fill: false,
        backgroundColor: candidato.color,
        cubicInterpolationMode: 'monotone',
        tension: 0.4,
        pointStyle: 'circle',
        pointRadius: 5,
        hoverRadius: 15,
      }));
  const startHour = 0; // Inicio de la cuenta de horas
  const endHour = 23; // Fin de la cuenta de horas
  const hoursArray = Array.from({ length: endHour - startHour + 1 }, (_, index) => {
    const hour = (index + startHour) % 24;
  
    // Convertir de 24 a 12 horas y agregar AM/PM
    const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
    const ampm = hour >= 12 ? 'pm' : 'am';
  
    return `${displayHour}:00 ${ampm}`;
  });

  const data = {
    labels: hoursArray,
    datasets: datasets
  };

  const options = {


    animations: {
        radius: {
          duration: 250,
          easing: 'linear',
          loop: (context) => context.active
        }
      },
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Boca de urna',
    },
    },
    interaction: {
    intersect: false,
    mode: 'index',
    },
    scales: {
        x: {
        display: true,
        title: {
            display: true,
            text: 'Horas'
        },
        },
        y: {
        
            display: true,
            title: {
              display: true,
              text: 'Votos',
            },
            suggestedMin: 0,
            suggestedMax: 10, // Ajusta según tus necesidades
      
    } ,
    },
  };


  return (
    <>
    <Header/>
    <Aside/>
    <div className="content-wrapper">
    <section class="content-header">
        <div class="container-fluid">
            <div class="row mb-2">
                <div class="col-sm-6"><h1>Cuarto de Guerra</h1></div>
                <div class="col-sm-6"><ol class="breadcrumb float-sm-right"><li class="breadcrumb-item"><a href="#">Home</a></li><li class="breadcrumb-item"><a href="#/mypeople">My People</a></li><li class="breadcrumb-item active">Perfil del  Ciudadano</li></ol></div></div></div></section>
        <div className="container-fluid">

    <div className='row'>
        <div className='col-md-12'>
            <div className='card card-primary'>
            <div className="card-header">
    <h3 className="card-title"><i className="fas fa-filter"/> Informe por hora</h3>
    <div className="card-tools">
    <button type="button" className="btn btn-tool" data-card-widget="collapse" title="Collapse"><i className="fas fa-minus" /></button>
    </div>
</div>

          <div className="card-body">

      <Line data={data} options={options} />
      </div>
      </div>
      </div></div>
      
      </div>
      </div>
      <Footer/>
    </>
  );
};

export default WarRoom;