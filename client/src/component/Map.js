import React, { useState } from "react";
import {
  GoogleMap,
  Marker,
  useJsApiLoader,
  InfoBox,
  Geocode,
} from "@react-google-maps/api";

//require("dotenv").config({ path: "../../.env" });

const containerStyle = {
  width: "1500px",
  height: "500px",
};

const center = {
  lat: 45.61064,
  lng: -73.55887,
};

const options = { closeBoxURL: "", enableEventPropagation: true };

const marker = { lat: 45.604629, lng: -73.574471 };

const markers = {}; //

function Map({ lodgings }) {
  const { isLoaded } = useJsApiLoader({
    id: process.env.REACT_APP_GOOGLEMAP_ID, //
    googleMapsApiKey:process.env.REACT_APP_GOOGLEMAP_KEY, //
  });
 

  const [map, setMap] = React.useState(null);
  const [markers, setMarkers] = useState([]);

 

  const onLoad = (infoBox) => {
    console.log("infoBox: ", infoBox);
  };

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  React.useEffect(() => {
    getLatLong();
  }, []);

  const getLatLong = async () => {
    let tabMarkers = [];
    let promise = [];
    //https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=AIzaSyBQ-ZdWlTWlaTldRIw5Pl0j5-t1evzkSc8
    lodgings.forEach((lodging) => {
      let str =
        lodging.lodgingAddress.address +
        lodging.lodgingAddress.city +
        lodging.lodgingAddress.province +
        lodging.lodgingAddress.postcode;
      
      let newStr = str.replace(" ", "+");
     promise.push(
      fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${newStr}+CN&key=${process.env.REACT_APP_GOOGLEMAP_KEY} `
      )
        .then((res) => res.json())
        .then((data) => {
          console.log("Lat and long: ", data);
          console.log("latitude:", data.results[0].geometry.location.lat);
         
            return ({_id: lodging._id,lat: data.results[0].geometry.location.lat,lng: data.results[0].geometry.location.lng})  ;      
          
         
        })
        .catch((err) => {
          console.log("Error Reading data " + err);
          //setError(true);
        }));

        
      
    });

    Promise.all(promise).then((data)=>{setMarkers(data)});
   
  };
 console.log(markers);

  return isLoaded ? (
    <>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={12}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        {/* Child components, such as markers, info windows, etc. <Marker position={[marker.lat, marker.lng]}></Marker>*/}
        {/*<Marker
          icon={{
            scale: 15,
          }}
          position={{ lat: marker.lat, lng: marker.lng }}
        >
          <InfoBox onLoad={onLoad} options={options} position={center}>
            <div
              style={{ backgroundColor: "yellow", opacity: 0.75, padding: 12 }}
            >
              <div style={{ fontSize: 16, fontColor: `#08233B` }}>1</div>
            </div>
          </InfoBox>
        </Marker>
        */}
        {markers &&
          markers.map((item) => {
            return(<Marker
              icon={{
                scale: 16,
              }}
              position={{ lat: item.lat, lng: item.lng }}
            >
            
            </Marker>);
          })}
        <></>
      </GoogleMap>
    </>
  ) : (
    <></>
  );
}


export default React.memo(Map);
