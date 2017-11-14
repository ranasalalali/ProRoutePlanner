import React, { Component } from 'react';
import { Platform, StatusBar, Text } from 'react-native';
import { View, Container, Button } from 'native-base';
import MapContainer from './MapContainer';
import { getCurrentLocation,
  getInputData,
  toggleSearchResultModal,
  getAddressPredictions
} from '../actions';

import { connect } from 'react-redux';

class UserHome extends Component {

  componentWillMount(){
     this.props.getCurrentLocation();
  }

  render() {
    const region = {
      latitude:3.146642,
      longitude:101.695845,
      latitudeDelta:0.0922,
      longitudeDelta:0.8421
    }
    return (
      <Container>
        {this.props.region.latitude &&
        <MapContainer region={this.props.region}
          getInputData={this.props.getInputData}
          toggleSearchResultModal={this.props.toggleSearchResultModal}
          getAddressPredictions={this.props.getAddressPredictions}
          resultTypes = {this.props.resultTypes}
          predictions = {this.props.predictions}
        />
        }
      </Container>
    );
  }
}

const mapStateToProps = ({auth}) => {
  const {email, password, error, loading,region,inputData,resultTypes,predictions} = auth;
  return{email, password, error, loading,region,inputData,resultTypes,predictions};
};


export default connect(mapStateToProps, {
  getCurrentLocation, getInputData, toggleSearchResultModal, getAddressPredictions
})(UserHome);
