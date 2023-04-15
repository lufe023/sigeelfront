import React from 'react'
import GoogleMapReact from 'google-map-react';

const GPS = ({lat, long, peopleName, picture}) => {

  const defaultProps = {
    center: {
      lat: 18.4944264,
      lng: -71.6415358
    },
    zoom: 9
  }
  const AnyReactComponent = ({ text }) => <div style={{backgroundColor:"green", width:"10px", height: "10px", borderRadius:"50%"}}>
    <img src={`${import.meta.env.VITE_API_SERVER}/api/v1/images/citizen/${picture}`} style={{width:"40px", height: "40px", borderRadius:"50%"}} />


    <div style={{marginTop:"10px", width:"100px"}}>
    {text}
    <a href='#1'>Click</a>
    </div>
    </div>;
    return (
      <>
  <h1>GPS</h1>
  <div style={{ height: '100vh', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyBrPKvk4bruxATYGQ-CcxouXxiwMeUuKDY" }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
      >
        <AnyReactComponent
        lat={lat}
        lng={long}
        text={peopleName}
        />
      </GoogleMapReact>
    </div>
  </>
  )
}


export default GPS