import React, { useState } from "react";
import GoogleMapReact from "google-map-react";
import Swal from "sweetalert2";
import axios from "axios";
import getConfig from "../../../utils/getConfig";
const LocationPicker = ({citizenID, getPeople}) => {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [gpsLocation, setGpsLocation] = useState({
    latitud: '',
    longitud: '',
    gotAutomatic: false
  }
  )
  const defaultProps = {
    center: {
      lat: 18.4944264,
      lng: -71.6415358
    },
    zoom: 15,
    
  }


  const handleMapClick = ({ lat, lng }) => {
    setSelectedLocation({ latitud: lat, longitud: lng, gotAutomatic:false});
  };


// position:"absolute", marginTop:"-35px", marginLeft:"-15px"
  const AnyReactComponent = () => <div style={{color:"red", fontSize:"30px", width:"5px", position:"relative", marginTop:"-35px", marginLeft:"-15px"}}><i className="fas fa-map-pin"></i></div>

  const handleGetLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          const { latitude, longitude } = position.coords;
          //console.log(`latitud: ${latitud}, longitud: ${longitud}`);
          setGpsLocation({
            latitud: latitude,
            longitud: longitude,
            gotAutomatic: true
          })
        },
        error => {
          console.log(error.message);
        }
      );
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  };

  const saveGPS = (gps) => {
    Swal.fire({
      title: `¿Seguro quieres establecer la ubicación?`,
      text: `estas a punto de establecer una ubicación ${gps.gotAutomatic? 'Automatica':'Manual'}. Asegurate de lo que haces`,
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: "Dejar sin efecto",
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, establecer!'
    }).then((result) => {
      if (result.isConfirmed) {
        let timerInterval
        Swal.fire({
          title: 'Agregando...',
          timer: 0,
          timerProgressBar: true,
          didOpen: () => {
            Swal.showLoading()
            const b = Swal.getHtmlContainer().querySelector('b')
            timerInterval = setInterval(() => {
            
            }, 100)
          },
          willClose: () => {
            clearInterval(timerInterval)
          }
        }).then((result) => {
          /* Read more about handling dismissals below */
        })
        const URL = `${import.meta.env.VITE_API_SERVER}/api/v1/gps/${citizenID}`
        axios
        .post(URL, gps, getConfig())
        .then(res => {
          Swal.fire(
            'Ya está',
            'Ubicación agregada con éxito',
            'success'
          )
          getPeople()     
    })
    .catch(err =>{
        console.log(err)
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Hubo un error!',
          
        })
    })
      }
    })
  
  }
  return (
    <div className="card card-info collapsed-card">
    <div className="card-header">
      <h3 className="card-title"><i className="fas fa-map-pin"></i> Seleccion de GPS</h3>
      <div className="card-tools">
      <button type="button" className="btn btn-tool" data-card-widget="maximize"><i className="fas fa-expand" />
        </button>
        <button type="button" className="btn btn-tool" data-card-widget="collapse">
          <i className="fas fa-plus" />
        </button>
      </div>
    </div>
    <div className="card-body">
    <div className="form-group">
      {
        gpsLocation?.gotAutomatic?<button className="btn btn-warning" onClick={()=>saveGPS(gpsLocation)}>Guardar Ubicación Actual</button> 
        : <button className="btn btn-primary" onClick={handleGetLocation}>Obtener GPS Actual</button> 
      }
   
    </div>
    
    {selectedLocation && (
        <div style={{marginBottom:"15px"}}>
          <button onClick={()=>saveGPS(selectedLocation)} className="btn btn-danger"><i className="fas fa-map-pin"></i> Guardar Seleccion Manual</button>
        </div>
      )}

    
<strong><i className="far fa-file-alt mr-1"></i> Importante</strong>
<p className="text-muted text-justify">Para seleccionar de forma <strong>Manual </strong>
presione en cualquier punto del mapa inferior, debe saber que las ubicaciones marcadas de forma manual no se considerarán confiables.
</p>
    <div style={{ height: "100vh", width: "100%" }}>
      <GoogleMapReact
        defaultCenter={{ lat: 18.852363220354913, lng: -70.36574844648437 }} 
        defaultZoom={8}
        onClick={handleMapClick}     
        options={{
          fullscreenControl: false,
        }}   
      >
        
        {selectedLocation?
        <AnyReactComponent
        lat={selectedLocation.latitud}
        lng={selectedLocation.longitud}
        />:""
        }
        </GoogleMapReact>
    </div>
  </div>
  </div>
  );
};

export default LocationPicker;
