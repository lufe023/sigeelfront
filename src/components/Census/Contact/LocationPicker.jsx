import React, { useState } from "react";
import GoogleMapReact from "google-map-react";
import GetGPS from "./GetGPS"
const LocationPicker = ({citizenID, getPeople}) => {
  const [selectedLocation, setSelectedLocation] = useState(null);

  const defaultProps = {
    center: {
      lat: 18.4944264,
      lng: -71.6415358
    },
    zoom: 9,
    
  }


  const handleMapClick = ({ lat, lng }) => {
    setSelectedLocation({ latitude: lat, longitude: lng });
  };

  const handlePrintLocation = () => {
    if (selectedLocation) {
      console.log("Selected Location:", selectedLocation);
    }
  };
// position:"absolute", marginTop:"-35px", marginLeft:"-15px"
  const AnyReactComponent = () => <div style={{color:"red", fontSize:"30px", width:"5px", position:"relative", marginTop:"-35px", marginLeft:"-15px"}}><i className="fas fa-map-pin"></i></div>

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
    <GetGPS/>

    {selectedLocation && (
        <div style={{marginBottom:"15px"}}>
          <button onClick={handlePrintLocation} className="btn btn-danger"><i className="fas fa-map-pin"></i> Guardar Seleccion Manual</button>
        </div>
      )}

    
    <div style={{ height: "50vh", width: "100%" }}>
      <GoogleMapReact
        defaultCenter={{ lat: 18.852363220354913, lng: -70.36574844648437 }} 
        defaultZoom={7}
        onClick={handleMapClick}
      >
        {selectedLocation?
        <AnyReactComponent
        lat={selectedLocation.latitude}
        lng={selectedLocation.longitude}
        />:""
        }
        </GoogleMapReact>
    </div>
  </div>
  </div>
  );
};

export default LocationPicker;
