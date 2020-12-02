import React, { useState, useEffect } from 'react'
import GoogleMapReact from 'google-map-react';
import axios from 'axios'

export default function ReactMap () {
const [location , setLocation] = useState({
  center: {
    lat: 23.290004,
    lng: 77.437377
    , 
  }
})
// const [myLocation , setMyLocation]
const [zoom , setZoom] = useState(20)

  const AnyReactComponent = ({latitude  ,  longitude   }) => <div>lat : {latitude} , lng : {longitude}</div>;
  const getLocation = () => {
    debugger;
    axios.get('/api/branch/getBranchLocation').then((res) => {
      setLocation({
        center: {
          lat: res.data[0].location ? res.data[0].location.latitude : 23.290004,  
          lng: res.data[0].location ? res.data[0].location.longitude : 77.437377
        }
      })
    }).catch((error) => {

    })
  }
  const saveLocation = () => {
    var data = {lat : location.center.lat  ,lng : location.center.lng }
    axios.post('/api/branch/saveBranchLocation' , data).then((res) => {

    }).catch((error) => {

    })
  }
  useEffect(() => {
    getLocation()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return(
<div>
  { location && location.center && location.center.lat && location.center.lng && 
      <div style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyAmEXEE2SToTSNKMqoxl1w71nJ-q5zXPOE" }}
          defaultCenter={location.center}
          defaultZoom={zoom}
          fullscreenControl
          onClick={(e) => setLocation({
            center : {
              lat : e.lat,
              lng : e.lng
            }
          })}
        >
          <AnyReactComponent
            lat={location.center.lat}
            lng={location.center.lng}
            latitude = {location.center.lat}
            longitude={location.center.lng}
            
          /> 
        </GoogleMapReact>
       
          <p>latitude : {location.center.lat} , longitude : {location.center.lng} &nbsp; &nbsp; &nbsp; <button onClick={saveLocation}>Submit Your Location</button></p> 
         
      </div>
        }
    
    
    </div>
  )
}