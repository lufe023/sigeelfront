import React from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);


const DonutChart = ({preferedParties}) => {

const partidos = []
const puntos = []
const colores = []


      //acronimos de partidos 
  preferedParties.map(party => partidos.push(party.partyAcronyms))

  //puntos de partidos 
  preferedParties.map(party => puntos.push(party.total
    ))

  //Colores de partidos 
    preferedParties.map(party => colores.push(party.color
      ))  

    const data = {
        labels: partidos,
        datasets: [
        {
            label: 'Simpatizantes',
            data: puntos,
            backgroundColor: colores,
            borderWidth: 1,
        },
        ],
        };

return (
    <>
    <div className="card">
    <div className="card-header">
    <h3 className="card-title">Partidos</h3>
    </div>
    <div className="card-body" style={{backgroundColor:"#f1f1f1"}}>
    <Doughnut data={data} />
    </div>
</div>
    </>
)
}

export default DonutChart