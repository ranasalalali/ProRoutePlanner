import React, { Component } from 'react';
import { View, Form, Picker, Item, Icon, Text, Drawer, Container, Header, Left, Button, Body } from 'native-base';
import MapView from 'react-native-maps';
import RNGooglePlaces from 'react-native-google-places';
import request from '../util/request';
import Polyline from '@mapbox/polyline';
import RNPolyline from 'rn-maps-polyline'
import { StyleSheet } from 'react-native';
import SideBar from './SideBar';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import {
  GetRickshawRoute, getRickshawList
} from '../actions';

class RickshawRoutes extends Component {

  constructor(props) {
    super(props);
    this.props.getRickshawList();
    this.state = {
      selected2: undefined
    };
  }
  componentWillMount() {
    this.props.getRickshawList();
  }
  onValueChange2(value: string) {
    this.setState({
      selected2: value
    });
    this.props.GetRickshawRoute(value);
  }
  updateDropdown() {
    var items = this.props.rickshawlist;
    //console.log(items);
    const all_items = items.map((category, i) => {
      //console.log(category)
      return (
        <Picker.Item key={category} label={category} value={category} />
      )
    });
    return all_items;
  }

  render() {

    closeDrawer = () => {
      this.drawer._root.close()
    };
    openDrawer = () => {
      this.drawer._root.open()
    };
    return (
      <Container>
        <View>
          <Header style={{ backgroundColor: 'black' }} androidStatusBarColor='black'>
            <Left>
              <Button transparent onPress={() => {
                Actions.pop()
              }}>
                <Icon name='arrow-back' />
              </Button>
            </Left>
            <Body>
              <Text style={{ color: 'white' }}>Rickshaw Routes</Text>
            </Body>

          </Header>
        </View>
        <Form>
          <Picker
            mode="dropdown"
            placeholder="Select One"
            selectedValue={this.state.selected2}
            onValueChange={this.onValueChange2.bind(this)}
          >
            {this.updateDropdown()}
          </Picker>
        </Form>
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
            <MapView.Polyline
              lineCap="round"
              lineJoin="round"
              coordinates={this.props.rickshawCoords}
              strokeColor="blue"
              strokeWidth={3} />
          </MapView>
        </View>
      </Container>
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
  const { rickshawCoords, rickshawlist } = auth;
  return { rickshawCoords, rickshawlist };
};


export default connect(mapStateToProps, {
  GetRickshawRoute, getRickshawList
})(RickshawRoutes);
