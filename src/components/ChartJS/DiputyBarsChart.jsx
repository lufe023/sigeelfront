import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    Filler,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    Filler
);


export default function Bars({preferedDiputys}) {

   
    const dipitados = []
    const puntos = []
    const colores = []
    
    
 //acronimos de dipitados 
 preferedDiputys?.map(dipitado =>
    dipitados.push(
    dipitado.locationDetails[0].municipalDistrict?dipitado.diputyName+' - '+dipitado.locationDetails[0].municipalDistrict:dipitado.diputyName+' - '+dipitado.locationDetails[1].municipality ))

    //puntos de partidos 
    preferedDiputys?.map(dipitado => puntos.push(dipitado.total ))

 
    
      //Colores de partidos 
      preferedDiputys?.map(dipitado => colores.push(dipitado.partyDetails.color )) 


var misoptions = {
    responsive : true,
    animation : true,
    plugins : {
        legend : {
            display : false
        }
    },
    scales : {
        y : {
            min : 0,
            max :  Math.max(...puntos)+1
        },
        x: {
            ticks: { color:colores},
        }
    }
};

var midata = {
    labels: dipitados,
    datasets: [
        {
            label: 'Electores',
            data: puntos,
            backgroundColor: colores
        }
    ]
};


    return (
<div className="card">
  <div className="card-header ui-sortable-handle">
    <h3 className="card-title">
      Dipitados
    </h3>
    <div className="card-tools">
    
    </div>
  </div>
  {/* /.card-header */}
  
  <div className="card-body">
    <Bar data={midata} options={misoptions} />
</div>
</div>
    )
}