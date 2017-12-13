import React, { Component } from 'react';
import { View,Button,Icon,Text,Container ,Header,Left,Body} from 'native-base';
import {StyleSheet} from 'react-native';
import MapView from 'react-native-maps';
import Polyline from '@mapbox/polyline';
import {addBusWayPoint,getWaypointList,addBusEndPoint} from '../actions';
import {Actions} from 'react-native-router-flux';
import { connect } from 'react-redux';


class EndPointMap extends Component{
  constructor(props) {
    super(props);
    this.state = {x:{latitude: 24.8615,
    longitude: 67.0099,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,}};
  }

  AddEndpoint(){
    console.log(this.state.x);
    this.props.addBusEndPoint(this.state.x);
  }


  render (){
    return(
      <Container>
        <Header>
          <Left>
            <Button transparent onPress={()=>Actions.startpointmap()}>
              <Icon name='arrow-back'  />
            </Button>
          </Left>
          <Body>
            <Text style={{color:'white'}}>Add End Point</Text>
          </Body>
        </Header>
        <Button full primary onPress={()=>this.AddEndpoint()}>
          <Icon name='add' />
          <Text>Add</Text>
        </Button>
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
          >
          <MapView.Marker draggable
            coordinate={this.state.x}
            onDrag={(e) => this.setState({ x: e.nativeEvent.coordinate })}
          />
          </MapView>
        </View>
      </Container>
    )
  }
}

const styles = {
  container:{
    flex:1,
    justifyContent:'center',
    alignItems:'center'
  },
  map:{
    ...StyleSheet.absoluteFillObject
  }
}


const mapStateToProps = ({auth}) => {
  const {busname,buserror,busadded} = auth;
  return{busname,buserror,busadded};
};

export default connect(mapStateToProps,{addBusWayPoint,getWaypointList,addBusEndPoint})(EndPointMap);
