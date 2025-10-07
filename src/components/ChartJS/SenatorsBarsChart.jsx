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


export default function Bars({preferedSenators}) {

    const senadores = []
    const puntos = []
    const colores = []
    
    
 //acronimos de senadores 
preferedSenators?.map(senador =>
    senadores?.push(
    senador.locationDetails[0].municipalDistrict?senador.senatorName+' - '+senador.locationDetails[0].municipalDistrict:senador.senatorName+' - '+senador.locationDetails[1].municipality ))

    //puntos de partidos 
    preferedSenators?.map(senador => puntos.push(senador.total ))

 
    
      //Colores de partidos 
    preferedSenators?.map(senador => colores.push(senador.partyDetails.color )) 


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
    labels: senadores,
    datasets: [
        {
            label: 'Electores',
            data: puntos,
            backgroundColor: colores
        }
    ]
};


    return (
<div className="card" >
  <div className="card-header ui-sortable-handle">
    <h3 className="card-title">
      senadores
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