import React from 'react'

const ConcurrenciaPanel = () => {
  return (
    <>
    <div className='row'>
        <div className='col-md-12'>
            <div className='card'>
            <div className="card-header">
  <h5 className="card-title">Concurrencia</h5>
  <div className="card-tools">
    <button type="button" className="btn btn-tool" data-card-widget="collapse">
      <i className="fas fa-minus" />
    </button>
    <button type="button" className="btn btn-tool" data-card-widget="remove">
      <i className="fas fa-times" />
    </button>
  </div>
</div>
<div className='card-body'>
<div className='row'>
    {/* contenido 1 */}
    <div className='col-md-8' style={{backgroundColor:"rgb(241, 241, 241", padding:"5px", borderRadius:"20px"}}>
    <ul className="users-list clearfix">
  <li>
    <img src="dist/img/user1-128x128.jpg" alt="User Image" style={{border:"solid 3px green"}}/>
    <a className="users-list-name" href="#">Alexander Pierce</a>
    <span className="users-list-date text-success">Votó</span>
  </li>
  <li>
    <img src="dist/img/user8-128x128.jpg" alt="User Image" style={{border:"solid 3px red"}}/>
    <a className="users-list-name" href="#">Norman</a>
    <span className="users-list-date text-danger">No Votó</span>
  </li>
  <li>
    <img src="dist/img/user7-128x128.jpg" alt="User Image"  />
    <a className="users-list-name" href="#">Jane</a>
    <span className="users-list-date">12 Jan</span>
  </li>
  <li>
    <img src="dist/img/user6-128x128.jpg" alt="User Image" />
    <a className="users-list-name" href="#">John</a>
    <span className="users-list-date">12 Jan</span>
  </li>
  <li>
    <img src="dist/img/user2-160x160.jpg" alt="User Image" />
    <a className="users-list-name" href="#">Alexander</a>
    <span className="users-list-date">13 Jan</span>
  </li>
  <li>
    <img src="dist/img/user5-128x128.jpg" alt="User Image" />
    <a className="users-list-name" href="#">Sarah</a>
    <span className="users-list-date">14 Jan</span>
  </li>
  <li>
    <img src="dist/img/user4-128x128.jpg" alt="User Image" />
    <a className="users-list-name" href="#">Nora</a>
    <span className="users-list-date">15 Jan</span>
  </li>
  <li>
    <img src="dist/img/user3-128x128.jpg" alt="User Image" />
    <a className="users-list-name" href="#">Nadia</a>
    <span className="users-list-date">15 Jan</span>
  </li>
</ul>

    </div>

    {/* contenido 2*/}
    <div className="col-md-4">
  <p className="text-center">
    <strong>Situaciones Especiales</strong>
  </p>
  <div className="progress-group">
    Alexander Pierce
    <span className="float-right"><b>Silla de rueda</b> | Transportar</span>
        <hr/>
  </div>
  {/* /.progress-group */}
  <div className="progress-group">
    Norman
    <span className="float-right"><b>No Vidente</b> | Ayudar en urna</span>
    <hr/>
  </div>
  {/* /.progress-group */}
  <div className="progress-group">
    <span className="progress-text">Jane</span>
    <span className="float-right"><b>Vota Solo</b> | Asegurar voto</span>
    <hr/>
  </div>
  {/* /.progress-group */}
  <div className="progress-group">
    John
    <span className="float-right"><b>Anciano</b> | Transportar, Ayudar en urna</span>
    <hr/>
  </div>
  {/* /.progress-group */}
</div>

</div>
</div>
            </div>
        </div>
    </div>
    </>
  )
}

export default ConcurrenciaPanel