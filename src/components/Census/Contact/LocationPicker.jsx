import React, { useState } from "react";
import GoogleMapReact from "google-map-react";
import GetGPS from "./GetGPS"
const LocationPicker = () => {
  const [selectedLocation, setSelectedLocation] = useState(null);

  const handleMapClick = ({ lat, lng }) => {
    setSelectedLocation({ latitude: lat, longitude: lng });
  };

  const handlePrintLocation = () => {
    if (selectedLocation) {
      console.log("Selected Location:", selectedLocation);
    }
  };

  return (
    <div className="card card-info collapsed-card">
    <div className="card-header">
      <h3 className="card-title"><i className="fas fa-map-pin"></i> Seleccion Manual de GPS</h3>
      <div className="card-tools">
        <button type="button" className="btn btn-tool" data-card-widget="collapse">
          <i className="fas fa-plus" />
        </button>
      </div>
    </div>
    <div className="card-body">
    <GetGPS/>
    <div style={{ height: "400px", width: "100%" }}>
      <GoogleMapReact
        defaultCenter={{ lat: 0, lng: 0 }}
        defaultZoom={2}
        onClick={handleMapClick}
      />
      {selectedLocation && (
        <div>
          Location: {selectedLocation.latitude}, {selectedLocation.longitude}
        </div>
      )}
      <button onClick={handlePrintLocation}>Print Location</button>
    </div>
  </div>
  </div>
  );
};

export default LocationPicker;
