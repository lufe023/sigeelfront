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


export default function Bars({preferedMayor}) {

   
    const alcaldes = []
    const puntos = []
    const colores = []

 //acronimos de dipitados 
 preferedMayor?.map(alcalde =>alcaldes.push(alcalde.mayorName))

    //puntos de partidos 
    preferedMayor?.map(alcalde => puntos.push(alcalde.total ))

 
    
      //Colores de partidos 
      preferedMayor?.map(alcalde => colores.push(alcalde.partyDetails.color )) 


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
    labels: alcaldes,
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
      Alcaldes
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