import React from 'react';
import { View, KeyboardAvoidingView } from 'react-native';
import { Button, Text } from 'native-base';
import MapView from 'react-native-maps';
import SearchBox from '../SearchBox/Index.js';
import SearchResults from '../SearchResults/Index.js';
import styles from './MapContainerStyles.js';
import Polyline from '@mapbox/polyline';
import bus from '../../Images/bus-pin.png'
import taxi from '../../Images/taxi-pin.png'
import rickshaw from '../../Images/rickshaw-pin.png'
import bus_stop from '../../Images/bus_stop.png'
import Icon from "react-native-vector-icons/FontAwesome";

export const MapContainer = ({ region,
  getInputData,
  toggleSearchResultModal,
  getAddressPredictions,
  resultTypes,
  predictions,
  getSelectedAddress,
  selectedSourceAddress,
  selectedDestinationAddress,
  coords,
  livebuscoords,
  livetaxicoords,
  liverickshawcoords,
  bus_route_coords,
  origin_walk_coords,
  dest_walk_coords,
  bus_stop_markers,
  coords2,
  loading_map }) => {


  function busstopmarkers() {
    if (bus_stop_markers.length > 0) {
      return (
        bus_stop_markers.map((marker, index) => (
          <MapView.Marker
            key={index}
            coordinate={marker.coordinates}
            title={marker.title}
            description={marker.desc}
            image={bus_stop}
          />))
      );
    }
  }
  function busmarkers() {
    if (livebuscoords.length > 0) {
      return (
        livebuscoords.map((marker, index) => (
          <MapView.Marker
            key={index}
            coordinate={marker.coordinates}
            title={marker.title}
            image={bus}
          />))
      );
    }
  }

  function taximarkers() {
    if (livetaxicoords.length > 0) {
      return (
        livetaxicoords.map((marker, index) => (
          <MapView.Marker
            key={index}
            description={marker.phone}
            coordinate={marker.coordinates}
            title={marker.title}
            image={taxi}
          />))
      );
    }
  }

  function rickshawmarkers() {
    if (liverickshawcoords.length > 0) {
      return (
        liverickshawcoords.map((marker, index) => (
          <MapView.Marker
            key={index}
            description={marker.phone}
            coordinate={marker.coordinates}
            title={marker.title}
            image={rickshaw}
          />))
      );
    }
  }
  return (
    <KeyboardAvoidingView style={styles.container}>
      <Text>{livebuscoords.title}</Text>
      <MapView
        provider={MapView.PROVIDER_GOOGLE}
        style={styles.map}
        showsUserLocation={true}
        showsMyLocationButton={true}
        initialRegion={{
          latitude: 25.0700,
          longitude: 67.2848,
          latitudeDelta: 0.043,
          longitudeDelta: 0.655,
        }}
      >
        {busmarkers()}
        {taximarkers()}
        {rickshawmarkers()}
        {busstopmarkers()}
        <MapView.Polyline
          coordinates={coords}
          strokeColor="red"
          strokeWidth={3} />
        <MapView.Polyline
          coordinates={coords}
          strokeColor="grey"
          strokeWidth={2} />
        <MapView.Polyline
          coordinates={bus_route_coords}
          strokeColor="black"
          strokeWidth={3} />
        <MapView.Polyline
          coordinates={origin_walk_coords}
          strokeColor="green"
          strokeWidth={4} />
        <MapView.Polyline
          coordinates={dest_walk_coords}
          strokeColor="green"
          strokeWidth={4} />
      </MapView>

      <SearchBox getInputData={getInputData}
        toggleSearchResultModal={toggleSearchResultModal}
        getAddressPredictions={getAddressPredictions}
        selectedSourceAddress={selectedSourceAddress}
        selectedDestinationAddress={selectedDestinationAddress}
      />
      {(resultTypes.Source || resultTypes.Destination) &&
        <SearchResults predictions={predictions} getSelectedAddress={getSelectedAddress} loading_map={loading_map} />
      }
    </KeyboardAvoidingView>
  )
}

export default MapContainer;
