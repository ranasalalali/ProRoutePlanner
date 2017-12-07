import React from 'react';
import { View } from 'native-base';
import MapView from 'react-native-maps';
import SearchBox from '../SearchBox/Index.js';
import SearchResults from '../SearchResults/Index.js';
import styles from './MapContainerStyles.js';
import Polyline from '@mapbox/polyline';

export const MapContainer = ({region,
  getInputData,
  toggleSearchResultModal,
  getAddressPredictions,
  resultTypes,
  predictions,
  getSelectedAddress,
  selectedSourceAddress,
  selectedDestinationAddress,
  coords}) => {

  return(
    <View style={styles.container}>
      <MapView
        provider={MapView.PROVIDER_GOOGLE}
        style={styles.map}
        showsUserLocation={true}
        showsMyLocationButton={true}
        initialRegion={{
          latitude: 24.8615,
          longitude: 67.0099,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        region={region}
      >
        <MapView.Polyline
            coordinates={coords}
            strokeColor="blue"
            strokeWidth={3}/>
      </MapView>

      <SearchBox getInputData={getInputData}
       toggleSearchResultModal={toggleSearchResultModal}
       getAddressPredictions={getAddressPredictions}
       selectedSourceAddress={selectedSourceAddress}
       selectedDestinationAddress={selectedDestinationAddress}
      />
      { (resultTypes.Source || resultTypes.Destination)  &&
        <SearchResults predictions={predictions} getSelectedAddress={getSelectedAddress}/>
      }
    </View>
  )
}

export default MapContainer;
