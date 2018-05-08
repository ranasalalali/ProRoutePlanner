import React, { Component } from 'react';
import { Platform, StatusBar, BackHandler, ToastAndroid } from 'react-native';
import { View, Footer, FooterTab, Container, Text, Button, Content, Header, Drawer, Left, Icon, Body } from 'native-base';
import MapContainer from './MapContainer';
import SideBar from './SideBar';
import Fare from './Fare';
import {
  getCurrentLocation,
  getInputData,
  toggleSearchResultModal,
  getAddressPredictions,
  getSelectedAddress,
  getBusList,
  getLiveBusCoords,
  getLiveTaxiCoords,
  getLiveRickshawCoords,
  buildBusMap,
  buildGraph
} from '../actions';

import { connect } from 'react-redux';

class UserHome extends Component {

  constructor(props) {
    super(props);
    this.state = {
      intervalid: null,
      livebus: [],
      livetaxi: [],
      liverickshaw: [],
      activetab: 'taxi'
    };


  }


  componentWillMount() {
    this.props.buildGraph();
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
  }
  handleBackButton() {
    ToastAndroid.show('Back button is pressed', ToastAndroid.SHORT);
    return true;
  }
  componentDidMount() {
    intervalid = setInterval(() => {
      this.props.getLiveTaxiCoords();
      this.props.getLiveBusCoords();
      this.props.getLiveRickshawCoords();
      this.setState({
        intervalid: intervalid,
        livebus: this.props.livebuscoords,
        livetaxi: this.props.livetaxicoords,
        liverickshaw: this.props.liverickshawcoords
      })
    }, 5000)
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
    clearInterval(this.state.intervalid);
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
        <Drawer
          ref={(ref) => { this.drawer = ref; }}
          content={<SideBar navigator={this._navigator} />}
          onClose={() => closeDrawer()}
        >


          <View>
            <Header style={{ backgroundColor: 'black' }} androidStatusBarColor='black'>
              <Left>
                <Button transparent onPress={() => openDrawer()}>
                  <Icon name='menu' />
                </Button>
              </Left>
              <Body>
                <Text style={{ color: 'white' }}>H O M E</Text>
              </Body>

            </Header>
          </View>
          {this.props.region.latitude &&
            <MapContainer region={this.props.region}
              getInputData={this.props.getInputData}
              toggleSearchResultModal={this.props.toggleSearchResultModal}
              getAddressPredictions={this.props.getAddressPredictions}
              resultTypes={this.props.resultTypes}
              predictions={this.props.predictions}
              getSelectedAddress={this.props.getSelectedAddress}
              selectedDestinationAddress={this.props.selectedDestinationAddress}
              selectedSourceAddress={this.props.selectedSourceAddress}
              coords={this.props.coords}
              livebuscoords={this.state.livebus}
              livetaxicoords={this.state.livetaxi}
              liverickshawcoords={this.state.liverickshaw}
              bus_route_coords={this.props.bus_route_coords}
              origin_walk_coords={this.props.origin_walk_coords}
              dest_walk_coords={this.props.dest_walk_coords}
              bus_stop_markers={this.props.bus_stop_markers}
              coords2={this.props.coords2}
            />
          }

          {
            (this.props.taxifare && this.props.ETA && this.props.ETAG) &&
            <Fare fare={this.props.taxifare} ETA={this.props.ETA} ETAG={this.props.ETAG} />
          }


        </Drawer>
      </Container>
    );
  }
}

const mapStateToProps = ({ auth }) => {
  const { ETA, ETAG, coords2, bus_stop_markers, origin_walk_coords, dest_walk_coords, bus_route_coords, liverickshawcoords, livetaxicoords, taxifare, livebuscoords, region, inputData, resultTypes, predictions, selectedSourceAddress, selectedDestinationAddress, coords } = auth;
  return { ETA, ETAG, coords2, bus_stop_markers, origin_walk_coords, dest_walk_coords, bus_route_coords, liverickshawcoords, livetaxicoords, taxifare, livebuscoords, region, inputData, resultTypes, predictions, selectedSourceAddress, selectedDestinationAddress, coords };
};


export default connect(mapStateToProps, {
  buildGraph, buildBusMap, getLiveRickshawCoords, getLiveTaxiCoords, getLiveBusCoords, getCurrentLocation, getInputData, toggleSearchResultModal, getAddressPredictions, getSelectedAddress, getBusList
})(UserHome);
