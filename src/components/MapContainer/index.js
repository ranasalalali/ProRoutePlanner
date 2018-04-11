import React from 'react';
import { View,Button,Text } from 'native-base';
import MapView from 'react-native-maps';
import SearchBox from '../SearchBox/Index.js';
import SearchResults from '../SearchResults/Index.js';
import styles from './MapContainerStyles.js';
import Polyline from '@mapbox/polyline';
import bus from '../../Images/bus-pin.png'
import Icon from "react-native-vector-icons/FontAwesome";
import { getLiveBusCoords } from '../../actions/index.js';

export const MapContainer = ({region,
  getInputData,
  toggleSearchResultModal,
  getAddressPredictions,
  resultTypes,
  predictions,
  getSelectedAddress,
  selectedSourceAddress,
  selectedDestinationAddress,
  coords,
  livebuscoords}) => {


    function handleButton(){
      getLiveBusCoords();
    }

    function busmarkers(){
      if (livebuscoords.length>0){
				return(
					  livebuscoords.map((marker, index) => ( 
            <MapView.Marker 
            key={index} 
            coordinate={marker.coordinates} 
            title={marker.title} 
            image={bus}
            /> ))
				);
			}
    }

  return(
    <View style={styles.container}>
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
      <Button iconLeft dark onPress={handleButton.bind(this)}>
            <Icon name='repeat' style={{color:'white'}} />
      </Button>
      { (resultTypes.Source || resultTypes.Destination)  &&
        <SearchResults predictions={predictions} getSelectedAddress={getSelectedAddress}/>
      }
    </View>
  )
}

export default MapContainer;
