import React from "react";

class GetGPS extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      latitude: null,
      longitude: null,
      buttonClicked: false
    } 
  ,this.state.setGpsLocation
}



  handleGetLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          const { latitude, longitude } = position.coords;
          this.setState({ latitude, longitude, buttonClicked: true });
          //console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
          setGpsLocation({
            latitud: latitude,
            longitud: longitude,
            mode: 'automatic'
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

  render() {
    const { buttonClicked } = this.state;

    return (
      <div style={{marginBottom:"15px"}}>
        <button
          className={`btn ${buttonClicked ? 'btn-success' : 'btn-primary'}`}
          onClick={this.handleGetLocation}
          disabled={buttonClicked}
        >
          <i className="fas fa-map-pin"></i>
          {buttonClicked ? ' Guardar GPS Automatico' : ' Obtener Locacion GPS Actual'}
        </button>
      </div>
    );
  }
}

export default GetGPS;
