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
            label: 'Simpatisantes',
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
    <div className="card-tools">
        <button type="button" className="btn btn-tool" data-card-widget="collapse">
        <i className="fas fa-minus" />
        </button>
        <button type="button" className="btn btn-tool" data-card-widget="remove">
        <i className="fas fa-times" />
        </button>
    </div>
    </div>
    <div className="card-body" style={{backgroundColor:"#f1f1f1"}}>
    <Doughnut data={data} />
    </div>
</div>
    </>
)
}

export default DonutChart