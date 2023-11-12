import React from 'react'

const TransferCensus = () => {
  return (
    <>
     <div className="card card-default">
  <div className="card-header">
    <h3 className="card-title">Transferir Padroncillo</h3>
    <div className="card-tools">
      <button type="button" className="btn btn-tool" data-card-widget="collapse">
        <i className="fas fa-minus" />
      </button>
      <button type="button" className="btn btn-tool" data-card-widget="remove">
        <i className="fas fa-times" />
      </button>
    </div>
  </div>
  {/* /.card-header */}
  <div className="card-body"></div>
<div className="lockscreen-item">
  <div className="lockscreen-image">
    <img src="../../dist/img/user1-128x128.jpg" alt="User Image" />
  </div>
  <form className="lockscreen-credentials">
    <div className="input-group">
      <input type="password" className="form-control" placeholder="password" />
      <div className="input-group-append">
        <button type="button" className="btn">
          <i className="fas fa-arrow-right text-muted" />
        </button>
      </div>
    </div>
  </form>
</div>
</div>
    </>
  )
}

export default TransferCensus