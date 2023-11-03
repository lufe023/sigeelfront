import React from 'react'
import { Link } from 'react-router-dom'

const AllUsers = ({users}) => {
  return (
   <div className="card">
  <div className="card-header">
    <h3 className="card-title">Recently Added Products</h3>
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
  <div className="card-body p-0" style={{display: 'block'}}>
    <ul className="products-list product-list-in-card pl-2 pr-2">
    { 
    users?.map((user) => 
    <li className="item" key={user.id}> 
    {console.log(user)}
     <div className="product-img">
          <img src={`${import.meta.env.VITE_API_SERVER}/api/v1/images/citizen/${user?.censu?.picture}`} alt="Product Image" className="img-size-50" />
        </div>
        <div className="product-info">
          <Link to={`/peoplebyuser/${user.id}`} className="product-title">{`${user.censu.first_name} ${user.censu.last_name}`}
            <span className="badge badge-warning float-right">{user.user_role.roleName}</span></Link>
          <span className="product-description">
          {user.email}
          </span>
          <Link to={`/peoplebyuser/${user.id}`}>
          <button className='btn btn-primary btn-xs'>Seguimiento</button></Link>
          {' '}
          <Link to={`/mypeople/${user.censu.id}`}>
          <button className='btn btn-warning btn-xs'>Adminsitrar</button></Link>
        </div>
    </li>
    )}

    </ul>
  </div>
  {/* /.card-body */}
  <div className="card-footer text-center" style={{display: 'block'}}>
    <a href="javascript:void(0)" className="uppercase">View All Products</a>
  </div>
  {/* /.card-footer */}
</div>

  )
}

export default AllUsers