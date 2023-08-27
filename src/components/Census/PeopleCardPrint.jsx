import axios from 'axios'
import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'
import getConfig from '../../utils/getConfig'
import "./PeopleCard.css"


const PeopleCardPrint = ({people, getMypeople}) => {

  const user = useSelector(state=> state.userSlice)


  return (
  
      <tr>
          <td style={{width:"100px"}}>
          <img src={`${import.meta.env.VITE_API_SERVER}/api/v1/images/citizen/${people?.picture}`} alt="elector" className="img-fluid" />
          </td>
          <td style={{width:"250px"}}>
          <h6>{people.firstName} {people.lastName}{people.nickname?`(${people.nickname})`:" "}</h6>
          Dir: {people.adress}<br/>
          {`Tel:${people.telephone}`}
          <br/>
          {`Cel:${people.celphone}`}
          </td>
          <td style={{border:'solid 1px #000'}}>
         <ul className='inforecolecter'>
          <li>  Telefono: <span></span></li>
          <li>  Celular: <span></span></li>
          <li>  Direccion: <span></span></li>
        </ul>
        </td>
          <td>
          <ul className='inforecolecter'>
          <li>  Partido: <span></span></li>
          <li>  Presidente: <span></span></li>
          <li>  Senador: <span></span></li>
          <li>  Diputado: <span></span></li>
          <li>  Alcalde: <span></span></li>
          <li>  Regidor: <span></span></li>
        </ul>
          </td>
        </tr>
  )
}

export default PeopleCardPrint