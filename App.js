/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect, useState } from 'react';
import { PermissionsAndroid, StyleSheet, Text } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
// import Placesearch from 'react-native-placesearch'; Install npm package for place search

function App(){
  const [location, setLocation] = useState({ latitude: 0, longitude: 0 });
  async function getPermission(){
    await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );
  }
useEffect(() => {
  getPermission().then(()=> {
    Geolocation.getCurrentPosition(
      (position) => {
        setLocation({latitude: position.coords.latitude, longitude: position.coords.longitude})
      },
      (error) => {
        // See error code charts below.
        console.log(error.code, error.message);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
  );
  })
  
},[]);

 return(
   
  <MapView
  provider={PROVIDER_GOOGLE}
  style={{flex:1}}
  region={{
    latitude: location.latitude,
    longitude: location.longitude,
    latitudeDelta: 0.015,
    longitudeDelta: 0.0121,
  }}
  >
<Marker
  coordinate={{ latitude : location.latitude , longitude : location.longitude }}
/>
  </MapView>
 )
}

const styles = StyleSheet.create({
 
});

export default App;
//Enable places api in google cloud
// For Place Search
  // <Placesearch 
  //   apikey="AIzaSyBSdIWTCYuHkCYUnMatkKgBsGMiNCKTciw" // required *
  //   SelectedAddress={(data)=>console.log(data)} // required *
  //   onClose={(data)=>console.log(data)}
    
    
  //   placeHolder = 'Search' //optional
  //   /> 

