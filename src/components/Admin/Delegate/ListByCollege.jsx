import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../../Precints/CitizenByCollege.css';
import CreateOrUpdateVote from './CreateOrUpdateVote';

const ListByCollege = ({ citizens, addPeople }) => {

    return (
        <div className="row">
            {citizens?.map(item => (
    <div key={item.id} className="col-md-4 col-sm-6 col-xl-4 col-12" style={{minWidth:"400px"}}>
    <div className="info-box" >
        <span className=" " style={{width:"auto"}}>
        <Link to={`/mypeople/${item.id}`}>
        <img
        style={{width:"150px", height:"150px"}} src={`${import.meta.env.VITE_API_SERVER}/api/v1/images/citizen/${item?.picture}`} alt="user-avatar" className="img-fluid" />
        </Link>
        <div className="card-footer">
        <div className="form-group">
        <div className="custom-control custom-switch custom-switch-off-danger custom-switch-on-success">
        <input type="checkbox"
        className="custom-control-input" 
        id={item.id}
        name="includeExterior"
        checked={item.sufragio?.suffrage}
        onChange={()=>CreateOrUpdateVote(item.citizenID,!item.sufragio?.suffrage)}/>
        <label className="custom-control-label" htmlFor={item.id}> {item.sufragio?.suffrage?"Votó":"No Votó"}</label>
        </div>
        </div>
        </div>
        </span>
        <div className="info-box-content">
        <span className="info-box-text">
        <Link to={`/mypeople/${item.id}`} style={{color:"#000"}}>
        {item.firstName} {item.lastName} {item.nickname? `(${item.nickname})`:""}
        </Link>
        </span>
        
        <ul className='ciudadanosColegio' style={{padding:"0", lineHeight:"20px", minWidth:"100px"}}>
                    <li>
                    <b>Ced: </b>{item.citizenID.substring(0,3)+'-'+item.citizenID.substring(3,10)+'-'+item.citizenID.substring(10,11)}
                    </li>
                    <li>
                        <b>Cel: </b><a href={`tel:${item.celphone}`}>{item.celphone}</a>
                    </li>
                    <li>
                        <b>Tel: </b><a href={`tel:${item.telephone}`}>{item.telephone}</a>
                    </li>
                    <li>
                        <b>Otro Tel: </b>{item.otherphone}
                    </li>
                    <li>
                        <b>Dir:</b> {item.adress}
                    </li>
                    <li>
                        <b>Posición:</b> {item.position}
                    </li>
                    <li>
                        {
                        item.leaders?.id? <span> Lider:  <Link to={`/peoplebyuser/${item.leaders?.id}`}>{item.leaders?.censu?.firstName}</Link></span>:
                        addPeople?
                        <a className='btn btn-xs btn-primary' onClick={()=>{addPeople(item.id)}}> <i className="fas fa-user-plus"/> Agregar a Mi Gente</a>
                        :""
                        }
                    </li>
                    
        </ul>
    </div>
</div>
</div>
))}
        </div>
    );
};

export default ListByCollege;
