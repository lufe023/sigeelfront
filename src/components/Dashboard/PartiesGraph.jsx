import React from 'react'



const PartiesGraph = () => {

    var xValues = ["Italy", "France", "Spain", "USA", "Haiti"];
    var yValues = [55, 49, 44, 24, 15];
    var barColors = [
      "#b91d47",
      "#00aba9",
      "#2b5797",
      "#e8c3b9",
      "#1e7145"
    ];
    
    new Chart("myChart", {
      type: "doughnut",
      data: {
        labels: xValues,
        datasets: [{
          backgroundColor: barColors,
          data: yValues
        }]
      },
      options: {
        title: {
          display: false,
  
        }
      }
    });

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
  <div className="card-body" style={{backgroundColor:"#f1f1f1"}}><div className="chartjs-size-monitor"><div className="chartjs-size-monitor-expand"><div className /></div><div className="chartjs-size-monitor-shrink"><div className /></div></div>
  <canvas id="myChart" style={{width: '100%', maxWidth: 600}} />

  </div>
  {/* /.card-body */}
</div>


    </>
  )
}



export default PartiesGraph