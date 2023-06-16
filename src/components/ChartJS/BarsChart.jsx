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

    console.log(preferedPresidents)
    const presidentes = []
    const puntos = []
    const colores = []
    
    
         //acronimos de presidentes 
        preferedPresidents.map(presidente => presidentes.push(presidente.presidentName))


    //puntos de partidos 
    preferedPresidents.map(presidente => puntos.push(presidente.total ))

 
    
      //Colores de partidos 
    preferedPresidents.map(presidente => colores.push(presidente.partyDetails.color )) 

var beneficios = puntos
var meses = presidentes
var coloresMeses = colores

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
            max : 10
        },
        x: {
            ticks: { color:coloresMeses},
        }
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


    return <Bar data={midata} options={misoptions} />
}