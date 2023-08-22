import React from 'react'
import GoogleMapReact from 'google-map-react';

const GPS = ({lat, long, peopleName, picture, gotAutomatic}) => {

  const defaultProps = {
    center: {
      lat: 18.4944264,
      lng: -71.6415358
    },
    zoom: 9
  }
  const AnyReactComponent = ({ text }) => 
  <div >
      <i className="fas fa-map-marker" style={{color:"#bd0000"}}></i>
        <div style={{marginTop:"10px", width:"100px"}}>
    <img src={`${import.meta.env.VITE_API_SERVER}/api/v1/images/citizen/${picture}`} style={{width:"40px", height: "40px", borderRadius:"50%"}} />
    <p style={{ margin:"0", backgroundColor:"#eeeee4", padding:"5px", width:"100px", borderRadius:"0px"}}>
        {text} {gotAutomatic?"":<span style={{color:"red"}}> Manual</span>}
        <a style={{display:"block"}}
        className='btn-sm btn-dark'
        href={`https://www.google.com/maps/search/${lat},+${long}?shorturl=1`} 
      target={'_blank'} >
      Localizar 
      <i className="fas fa-location-arrow" style={{marginLeft:"3px"}}></i>
      </a>
      </p>
        </div>
      </div>
    
    return (
      <>
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