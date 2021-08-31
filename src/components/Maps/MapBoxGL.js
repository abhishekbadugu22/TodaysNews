import MapboxGL from '@react-native-mapbox-gl/maps';
import React, {useEffect, useState} from 'react';
import {
  Alert,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import {getPreciseDistance} from 'geolib';
import MapboxDirectionsFactory from '@mapbox/mapbox-sdk/services/directions';
import {lineString as makeLineString} from '@turf/helpers';
import circle from '@turf/circle';
import Geolocation, {
  getCurrentPosition,
} from 'react-native-geolocation-service';
import GeoFencing from 'react-native-geo-fencing';

const accessToken =
  'pk.eyJ1Ijoic2FtamhvbiIsImEiOiJja3BtcHJkYmwwNDZ2MnBwNGFxM2t6aHNhIn0.J98EOu8zFbzMQ3fi34K6zw';

// const directionsClient = MapboxDirectionsFactory({accessToken});

var center = [72.81847522286964, 19.001068535797316];
var radius = 2500;
var options = {steps: 10, units: 'meters', properties: {foo: 'bar'}};

// const route = {
//   type: 'FeatureCollection',
//   features: [
//     {
//       type: 'Feature',
//       properties: {},
//       geometry: {
//         type: 'LineString',
//         coordinates: [
//           [72.81847522286964, 19.001068535797316],
//           [72.8572557649934, 19.009246221285494],
//         ],
//       },
//     },
//   ],
// };

// const progressListener = (offlineRegion, status) =>
//   console.log(offlineRegion, status);
// const errorListener = (offlineRegion, err) => console.log(offlineRegion, err);

// MapboxGL.offlineManager
//   .createPack(
//     {
//       name: 'offlinePack',
//       styleURL:MapboxGL.StyleURL.Dark,
//       minZoom: 14,
//       maxZoom: 20,
//     //   bounds: [[neLng, neLat], [swLng, swLat]]
//     bounds: [[-74.126410, 40.797968], [-74.143727, 40.772177]],
//     },
//     progressListener,
//     errorListener,
//   )
//   .then(response => console.log('Offine Manager Success', response))
//   .catch(error => console.log('Offline Manager Error',error));

// MapboxGL.UserTrackingModes.FollowWithCourse;


const MapBoxGL = () => {
  const [coordinates, setCoordinates] = useState([72.825217, 18.99034]);
  const [direction, setDirection] = useState(null);
  const [crrLocation, setCrrLocation] = useState([
    72.83679994178752, 19.014220643559682,
  ]);
  const [circleBoundryPoint, setCircleBoundryPoint] = useState([]);

  const handleOnMapPress = data => {
    console.log(data.geometry);
    setCoordinates(data?.geometry?.coordinates);
  };



  useEffect(() => {
    MapboxGL.setAccessToken(`${accessToken}`);
  }, []);

  useEffect(() => {
    // getCrrLocation();
    const result = circle(center, radius, options);
    const boundryPoints = result.geometry.coordinates[0].map(item => {
      return {
        lat: item[1],
        lng: item[0],
      };
    });
    setCircleBoundryPoint(boundryPoints);
    // console.log('Boundry Points',boundryPoints)
  }, []);

  const checkUserInRange = async () => {
    // try {
    //   const response = await GeoFencing.containsLocation(
    //     crrLocation,
    //     circleBoundryPoint,
    //   );
    //   console.log('Geo fencing response', response);
    //   console.log('user is in range');
    // } catch (error) {
    //   console.log('Geo Fencing Error', error);
    // }

    const point = {
      lat: crrLocation[1],
      lng: crrLocation[0],
    };

    // console.log()
    try {
      const response = await GeoFencing.containsLocation(
        point,
        circleBoundryPoint,
      );
      console.log(response,'User in range');
    } catch (error) {
      console.log('User Not In Range', error);
    }
    // .then((e) => console.log('User Is In range',e))
    // .catch((e) => console.log('User Not In Range',e));
  };

  // useEffect(() => {
  //     const watch = Geolocation.watchPosition(position => {
  //       console.log('WatchPosition', position);
  //       const longitude = position.coords.longitude;
  //       const latitude = position.coords.latitude;
  //       setCrrLocation([longitude, latitude]);
  //       Alert.alert(`Latitude : ${latitude} \nLongitude : ${longitude}`)
  //     },
  //     error => {
  //       console.log(error);
  //     },
  //     {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
  //   );

  //   return () => {
  //     Geolocation.clearWatch(watch);
  //   }

  // },[crrLocation])

  // useEffect(() => {
  //   const response = circle(center, radius, options);
  //   console.log('Circle', response.geometry.coordinates);
  // });

  const getCrrLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        // console.log('UserPosition', position);
        const longitude = position.coords.longitude;
        const latitude = position.coords.latitude;
        setCrrLocation([longitude, latitude]);
        // Alert.alert(`Latitude : ${latitude} \nLongitude : ${longitude}`)
      },
      error => {
        console.log(error);
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 10000,
        accuracy: {android: 'high', ios: 'bestForNavigation'},
      },
    );
  };

  // const getDirections = async (startPoint, Destination) => {
  //   const reqOptions = {
  //     waypoints: [{coordinates: startPoint}, {coordinates: Destination}],
  //     profile: 'driving',
  //     geometries: 'geojson',
  //   };
  //   try {
  //     const response = await directionsClient.getDirections(reqOptions).send();
  //     console.log('GetDirection Success', response.body);
  //     const directionRoute = makeLineString(
  //       response.body.routes[0].geometry.coordinates,
  //     );
  //     setDirection(directionRoute);
  //   } catch (error) {
  //     console.log('GetDirection Error', error);
  //   }
  // };

  const findDistance = () => {
    const preciseDistance = getPreciseDistance(
      {latitude: 72.81847522286964, longitude: 19.001068535797316},
      {latitude: 72.857255764993, longitude: 19.009246221285494},
    );
    Alert.alert(`Distance : ${preciseDistance} meters`);
    console.log({preciseDistance});
  };

  return (
    <View style={styles.container}>
      <MapboxGL.MapView
        style={styles.map}
        logoEnabled={false}
        onPress={handleOnMapPress}
        localizeLabels={true}
        zoomEnabled={true}
        animated={true}
        // onRegionDidChange={(e)=>console.log(e.geometry)}
        styleURL={MapboxGL.StyleURL.Street}>
        <MapboxGL.Camera
          centerCoordinate={crrLocation.length > 0 ? crrLocation : coordinates}
          zoomLevel={crrLocation.length > 0 ? 14 : 11}
          animationMode={'flyTo'}
          animationDuration={1000}
        />

        {/* <MapboxGL.MarkerView
            id={'mapView'}
            key={`${coordinates[0]}_${coordinates[1]}`}
            coordinate={coordinates}
            anchor={{x:0.5,y:0.5}}>
              <View>
                <View style={styles.markerContainer}>
                  <View style={styles.markerTextContainer}>
                    <Text style={styles.markerText}>{'Mumbai'}</Text>
                  </View>
                  <Image 
                  source={{uri:'https://cdn.iconscout.com/icon/premium/png-512-thumb/location-pin-162-626841.png'}}
                  style={{width:25,height:25,resizeMode:'cover'}}
                  />
                </View>
              </View>
          </MapboxGL.MarkerView> */}
        {/* <MapboxGL.UserLocation visible={true} animated={true} /> */}

        {crrLocation.length > 0 ? (
          <MapboxGL.PointAnnotation
            id={`${crrLocation[0]}_${crrLocation[1]}`}
            key={`${crrLocation}`}
            coordinate={crrLocation}>
            {/* <View
              style={{
                height: 50,
                width: 50,
                borderRadius: 25,
                backgroundColor: '#00000026',
                justifyContent: 'center',
                alignItems: 'center',
                borderWidth: 2,
                borderColor: 'white',
              }}> */}
            <View
              style={{
                height: 20,
                width: 20,
                backgroundColor: 'dodgerblue',
                borderRadius: 50,
                borderColor: '#fff',
                borderWidth: 3,
              }}
            />
            {/* </View> */}
          </MapboxGL.PointAnnotation>
        ) : null}

        <MapboxGL.PointAnnotation
          id={`${coordinates[0]}_${coordinates[1]}`}
          key={'key'}
          coordinate={[72.81847522286964, 19.001068535797316]}
        />
        <MapboxGL.PointAnnotation
          id={`${'Key'}_${coordinates[1]}`}
          key={'key2'}
          coordinate={[72.8572557649934, 19.009246221285494]}
        />
        <MapboxGL.ShapeSource
          id="line1"
          shape={circle(center, radius, options)}>
          <MapboxGL.LineLayer
            id="linelayer1"
            style={{lineColor: 'purple', lineWidth: 2}}
          />
        </MapboxGL.ShapeSource>
        {direction ? (
          <MapboxGL.ShapeSource id="routeSource" shape={direction.geometry}>
            <MapboxGL.LineLayer
              id="routeFill"
              style={{
                lineColor: 'dodgerblue',
                lineWidth: 3.2,
                lineCap: MapboxGL.LineJoin.Round,
                lineOpacity: 1.84,
              }}
            />
          </MapboxGL.ShapeSource>
        ) : null}
      </MapboxGL.MapView>
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity style={styles.btn} onPress={getCrrLocation}>
          <Text style={styles.txt}>Get Location</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.btn, {backgroundColor: 'dodgerblue'}]}
          onPress={checkUserInRange}>
          <Text style={styles.txt}>Check if User in Range</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

//onPress={()=>getDirections([72.81847522286964, 19.001068535797316],[72.8572557649934, 19.009246221285494])}

export default MapBoxGL;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  map: {
    flex: 1,
  },
  marker: {
    height: 25,
    width: 20,
  },
  btn: {
    width: '100%',
    height: 60,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'tomato',
    flex: 1,
  },
  txt: {
    fontSize: 17,
    color: 'white',
  },
  markerContainer: {
    alignItems: 'center',
    width: 70,
    backgroundColor: 'transparent',
    height: 70,
  },
  markerTextContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  markerText: {
    textAlign: 'center',
    paddingHorizontal: 5,
    flex: 1,
  },
});
