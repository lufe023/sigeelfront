import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import getConfig from '../../../utils/getConfig'

const ShowTies = ({ties, setPeople}) => {

  return (
    <>
    <ul style={{padding:"7px"}}>
        {
        ties?.rows?.map(tie => 
        <li key={tie.id} style={{display:"inline-block", margin:'0 10px'}}>
        <div className="info-box" style={{maxWidth:"300px"}}>
        <Link to={`/mypeople/${tie.aties.id}`} onClick={()=> setPeople()} >
        <span className="info-box-icon">
        <img src={`${import.meta.env.VITE_API_SERVER}/api/v1/images/citizen/${tie.aties.picture}`} alt="User Image" className="concurrencia-citizen-image" />
        </span>
        </Link>
        <div className="info-box-content" >
          <span className="info-box-text">{tie.aties.firstName}</span>
          
            {tie.tieType.tiesDescription} de  {tie.bties.firstName}
      
            <span className="info-box-text"></span>
        </div>
        <Link to={`/mypeople/${tie.bties.id}`}  onClick={()=> setPeople()}>
        <span className="info-box-icon">
        <img src={`${import.meta.env.VITE_API_SERVER}/api/v1/images/citizen/${tie.bties.picture}`} alt="User Image" className="concurrencia-citizen-image" />
        </span>
        </Link>
        </div>
        </li>

            )
        }

    </ul>
    </>
  )
}

export default ShowTies