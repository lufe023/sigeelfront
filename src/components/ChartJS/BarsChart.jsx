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


export default function Bars({preferedPresidents}) {

    const presidentes = []
    const puntos = []
    const colores = []
    
    
         //acronimos de presidentes 
        preferedPresidents?.map(presidente =>
            presidentes.push(
            presidente.locationDetails[0].municipalDistrict?presidente.presidentName+' - '+presidente.locationDetails[0].municipalDistrict:presidente.presidentName+' - '+presidente.locationDetails[1].municipality ))
    //puntos de partidos 
    preferedPresidents?.map(presidente => puntos.push(presidente.total ))
    
      //Colores de partidos 
    preferedPresidents?.map(presidente => colores.push(presidente.partyDetails.color )) 

var beneficios = puntos
var meses = presidentes
var coloresMeses = colores

var misoptions = {
    responsive : true,
    animation : true,
    plugins : {
        legend : {
            display : true
        }
    },
    scales : {
        y : {
            min : 0,
            max : Math.max(...puntos)+1
        },
        x: {
            ticks: { color:coloresMeses,
            display:false},
            
        },

    }
};

var midata = {
    labels: meses,
    datasets: [
        {
            label: 'Electores',
            data: beneficios,
            backgroundColor: coloresMeses
        }
    ]
};


    return (
<div className="card" >
  <div className="card-header ui-sortable-handle">
    <h3 className="card-title">
      Presidentes
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