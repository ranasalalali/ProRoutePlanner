import React, { Component } from 'react';
import { View, Button, Icon, Text, Container, Header, Left, Body, InputGroup, List, ListItem, Input, Content } from 'native-base';
import { StyleSheet, Alert } from 'react-native';
import MapView from 'react-native-maps';
import Polyline from '@mapbox/polyline';
import { addRickshawWayPoint, getRickshawWaypointList, addRickshawEndPoint, getSearchPredictions, getSearchInput, getSelectedRegion, getcurrentrickshawcoords, resetMap } from '../../actions';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import styles from '../AdminStyles';

class RickshawCoordMap extends Component {
  constructor(props) {
    super(props);
    this.props.getcurrentrickshawcoords();
    this.props.resetMap();
    this.state = {
      place: '',
      x: {
        latitude: 24.8615,
        longitude: 67.0099,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      },
      marker: {
        latitude: 24.8615,
        longitude: 67.0099,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
      }
    };
  }

  AddRickshawWaypoint() {
    if (this.state.place === '') {
      Alert.alert('Choose a Location');
    }
    else {
      //console.log(this.state.place);
      this.props.addRickshawWayPoint(this.state.place);
      this.props.getRickshawWaypointList();
    }
  }

  handleInput(val) {
    this.props.getSearchInput(val);
    this.props.getSearchPredictions(val);
  }


  handleSelectedAddress(placeID) {
    this.props.getSelectedRegion(placeID);
    this.setState({
      place: placeID,
      x: {
        latitude: this.props.selectedregion.latitude,
        longitude: this.props.selectedregion.longitude,
        latitudeDelta: 0.0045,
        longitudeDelta: 0.0045
      },
      marker: {
        latitude: this.props.selectedregion.latitude,
        longitude: this.props.selectedregion.longitude,
        latitudeDelta: 0.0045,
        longitudeDelta: 0.0045
      }
    });
  }


  List() {
    if (this.props.predictions.length > 0) {
      return (
        <Content>
          <Text style={{ fontWeight: "bold", color: "#373737", alignSelf: 'center' }}>Doubletap to load</Text>
          <List
            dataArray={this.props.predictions}
            renderRow={(item) =>
              <View>
                <ListItem onPress={() => this.handleSelectedAddress(item.placeID)} button avatar>
                  <Left style={styles.leftContainer}>
                    <Icon name='pin' />
                  </Left>
                  <Body>
                    <Text style={styles.primaryText}>{item.primaryText}</Text>
                    <Text style={styles.secondaryText}>{item.secondaryText}</Text>
                  </Body>
                </ListItem>
              </View>
            }
          />
        </Content>
      );
    }
  }

  render() {
    return (
      <Container>
        <Header style={{ backgroundColor: 'black' }} androidStatusBarColor='black'>
          <Left>
            <Button transparent onPress={() => Actions.adminmain()}>
              <Icon name='arrow-back' />
            </Button>
          </Left>
          <Body>
            <Text style={{ color: 'white' }}>Add Way Point</Text>
          </Body>
        </Header>
        <View style={styles.inputWrapper}>
          <InputGroup>
            <Icon name='search' style={{ color: 'black' }} />
            <Input
              style={styles.inputSearch}
              placeholder="Choose Place"
              onChangeText={this.handleInput.bind(this)}
              value={this.props.searchinput}
            />
          </InputGroup>
        </View>
        <Button full dark onPress={() => this.AddRickshawWaypoint()}>
          <Icon name='add' />
          <Text>Add</Text>
        </Button>
        <View style={mapstyles.container}>
          <MapView
            provider={MapView.PROVIDER_GOOGLE}
            style={mapstyles.map}
            showsUserLocation={true}
            showsMyLocationButton={true}
            initialRegion={{
              latitude: 24.8615,
              longitude: 67.0099,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
            region={{
              latitude: this.props.selectedregion.latitude,
              longitude: this.props.selectedregion.longitude,
              latitudeDelta: 0.0045,
              longitudeDelta: 0.0045
            }}
          >
            <MapView.Marker draggable
              coordinate={this.state.marker}
              onDragEnd={(e) => this.setState({ marker: e.nativeEvent.coordinate })}
            />
            <MapView.Polyline
              coordinates={this.props.currentrickshawcoords}
              strokeColor="blue"
              strokeWidth={3} />
          </MapView>
        </View>
        {this.List()}
      </Container>
    )
  }
}

const mapstyles = {
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
  const { rickshawname, rickshawerror, rickshawadded, currentrickshawcoords, predictions, searchinput, selectedregion } = auth;
  return { rickshawname, rickshawerror, rickshawadded, currentrickshawcoords, predictions, searchinput, selectedregion };
};

export default connect(mapStateToProps, { addRickshawWayPoint, getRickshawWaypointList, addRickshawEndPoint, getSearchPredictions, getSearchInput, getSelectedRegion, getcurrentrickshawcoords, resetMap })(RickshawCoordMap);
