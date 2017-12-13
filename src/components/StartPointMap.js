import React, { Component } from 'react';
import { View,Button,Icon,Text,Container,Header,Left,Body } from 'native-base';
import {StyleSheet} from 'react-native';
import MapView from 'react-native-maps';
import Polyline from '@mapbox/polyline';
import {addBusWayPoint,getWaypointList,addBusStartPoint} from '../actions';
import {Actions} from 'react-native-router-flux';
import { connect } from 'react-redux';


class StartPointMap extends Component{
  constructor(props) {
    super(props);
    this.state = {x:{latitude: 24.8615,
    longitude: 67.0099,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,}};
  }

  AddStartpoint(){
    console.log(this.state.x);
    this.props.addBusStartPoint(this.state.x);
  }


  render (){
    return(
      <Container>
        <Header>
          <Left>
            <Button transparent onPress={()=>Actions.adminmain()}>
              <Icon name='arrow-back'  />
            </Button>
          </Left>
          <Body>
            <Text style={{color:'white'}}>Add Start Point</Text>
          </Body>
        </Header>
        <Button full primary onPress={()=>this.AddStartpoint()}>
          <Icon name='add' />
          <Text>NEXT</Text>
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

export default connect(mapStateToProps,{addBusWayPoint,getWaypointList,addBusStartPoint})(StartPointMap);
