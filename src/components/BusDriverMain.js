import React, { Component } from 'react';
import { BackHandler, ToastAndroid } from 'react-native';
import { View, Form, Picker, Item, Icon, Text, Drawer, Container, Header, Left, Footer, Button, Body } from 'native-base';
import MapView from 'react-native-maps';
import RNGooglePlaces from 'react-native-google-places';
import request from '../util/request';
import Polyline from '@mapbox/polyline';
import RNPolyline from 'rn-maps-polyline'
import { StyleSheet } from 'react-native';
import BusSideBar from './SideBar/BusSideBar.js';
import { connect } from 'react-redux';
import firebase from 'firebase';
import {
  GetBusRoute, getBusList, loginUser, getCurrentLocation
} from '../actions';

class BusDriverMain extends Component {

  handleBackButton() {
    ToastAndroid.show('Back button is pressed', ToastAndroid.SHORT);
    return true;
  }
  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    this.props.getCurrentLocation();
    this.state.intervalid=setInterval(this.getlocation.bind(this), 5000);
  }
  constructor(props) {
    super(props);
    this.state = {
      selected2: undefined,
      workmode: true,
      coordinates: {},
      user: this.props.user
    };
  }

  componentWillUnmount(){
    let username = this.props.user;
    firebase.database().ref('busdrivers/' + username).update({ latitude: 0, longitude: 0 });
    clearInterval(this.state.intervalid)
    
  }

  success(pos) {
    this.setState({
      coordinates: pos.coords
    })
    let username = this.props.user;
    let latitude = pos.coords.latitude;
    let longitude = pos.coords.longitude;
    ////console.log(username)
    if (this.props.user === this.state.user) {
      if (this.state.workmode) {
        firebase.database().ref('busdrivers/' + username).update({ latitude: latitude, longitude: longitude });
      }
      else {
        firebase.database().ref('busdrivers/' + username).update({ latitude: 0, longitude: 0 });
      }
    }
  }
  getlocation() {
    var options = {
      enableHighAccuracy: false, timeout: 5000, maximumAge: 0
    };
    function error(err) {
      ////console.warn(`ERROR(${err.code}): ${err.message}`);
    }
    navigator.geolocation.getCurrentPosition(this.success.bind(this), error, options);
  }

  onButtonPress() {
    if (this.state.workmode) {
      this.setState({
        workmode: false
      })
    }
    else
      this.setState({
        workmode: true
      })

  }

  renderButton() {
    if (this.state.workmode) {
      return (
        <Button full dark onPress={this.onButtonPress.bind(this)}>
          <Text style={{ color: 'white' }}>Work Mode: ON</Text>
        </Button>
      )
    }
    else
      return (
        <Button full light onPress={this.onButtonPress.bind(this)}>
          <Text style={{ color: 'black' }}>Work Mode: OFF</Text>
        </Button>
      )

  }

  render() {


    // this.state.coordinates = setInterval(this.getlocation.bind(this), 5000);

    closeDrawer = () => {
      this.drawer._root.close()
    };
    openDrawer = () => {
      this.drawer._root.open()
    };
    return (
      <Drawer
        ref={(ref) => { this.drawer = ref; }}
        content={<BusSideBar navigator={this._navigator} />}
        onClose={() => closeDrawer()}
      >

        <Container>
          <View>
            <Header style={{ backgroundColor: 'black' }} androidStatusBarColor='black'>
              <Left>
                <Button transparent onPress={() => openDrawer()}>
                  <Icon name='menu' />
                </Button>
              </Left>
              <Body>
                <Text style={{ color: 'white' }}>Welcome BusDriver</Text>
              </Body>

            </Header>
          </View>
          <View style={styles.container}>
            <MapView
              provider={MapView.PROVIDER_GOOGLE}
              style={styles.map}
              showsUserLocation={true}
              showsMyLocationButton={true}
              initialRegion={{
                latitude: 24.8615,
                longitude: 67.0099,
                latitudeDelta: 0.1,
                longitudeDelta: 0.999,
              }}
            >
              <MapView.Polyline
                lineCap="round"
                lineJoin="round"
                coordinates={this.props.muslimCoords}
                strokeColor="blue"
                strokeWidth={3} />
            </MapView>
          </View>
          <View>
            {this.renderButton()}
          </View>
        </Container>
      </Drawer>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  map: {
    ...StyleSheet.absoluteFillObject
  }
}


const mapStateToProps = ({ auth }) => {
  const { muslimCoords, buslist, user, currentDriverBus, region } = auth;
  return { muslimCoords, buslist, user, currentDriverBus, region };
};


export default connect(mapStateToProps, {
  GetBusRoute, getBusList, loginUser, getCurrentLocation
})(BusDriverMain);
