import React from 'react'

const Calendar = () => {
  return (
    <>
    <div className="card bg-gradient-success">
  <div className="card-header border-0">
    <h3 className="card-title">
      <i className="far fa-calendar-alt" />
      Calendar
    </h3>
    {/* tools card */}
    <div className="card-tools">
      {/* button with a dropdown */}
      <div className="btn-group">
        <button type="button" className="btn btn-success btn-sm dropdown-toggle" data-toggle="dropdown" data-offset={-52}>
          <i className="fas fa-bars" />
        </button>
        <div className="dropdown-menu" role="menu">
          <a href="#" className="dropdown-item">Add new event</a>
          <a href="#" className="dropdown-item">Clear events</a>
          <div className="dropdown-divider" />
          <a href="#" className="dropdown-item">View calendar</a>
        </div>
      </div>
      <button type="button" className="btn btn-success btn-sm" data-card-widget="collapse">
        <i className="fas fa-minus" />
      </button>
      <button type="button" className="btn btn-success btn-sm" data-card-widget="remove">
        <i className="fas fa-times" />
      </button>
    </div>
    {/* /. tools */}
  </div>
  {/* /.card-header */}
  <div className="card-body pt-0">
    {/*The calendar */}
    <div id="calendar" style={{width: '100%'}} />
  </div>
  {/* /.card-body */}
</div>

</>
)
}

export default Calendar