import React, { Component } from 'react';
import { Platform, StatusBar } from 'react-native';
import { View, Footer, FooterTab, Container, Text, Button,Content, Header,Drawer,Left,Icon,Body } from 'native-base';
import MapContainer from './MapContainer';
import SideBar from './SideBar';
import { getCurrentLocation,
  getInputData,
  toggleSearchResultModal,
  getAddressPredictions,
  getSelectedAddress
} from '../actions';

import { connect } from 'react-redux';

class UserHome extends Component {

  componentWillMount(){
     this.props.getCurrentLocation();
  }

  render() {
    const tabs = [{
      title:"TaxiCar",
      subTitle:"",
      icon:"car"
    },
    {
      title:"Bus",
      subTitle:"",
      icon:"bus"
    }]

    closeDrawer = () => {
      this.drawer._root.close()
    };
    openDrawer = () => {
      this.drawer._root.open()
    };
    return (
      <Drawer
        ref={(ref) => { this.drawer = ref; }}
        content={<SideBar navigator={this._navigator} />}
        onClose={() => closeDrawer()}
        >

      <Container>
      <Header>
        <Left>
          <Button transparent onPress={()=>openDrawer()}>
            <Icon name='menu'  />
          </Button>
        </Left>
        <Body>
          <Text style={{color:'white'}}>Home</Text>
        </Body>

      </Header>
        {this.props.region.latitude &&
        <MapContainer region={this.props.region}
          getInputData={this.props.getInputData}
          toggleSearchResultModal={this.props.toggleSearchResultModal}
          getAddressPredictions={this.props.getAddressPredictions}
          resultTypes = {this.props.resultTypes}
          predictions = {this.props.predictions}
          getSelectedAddress={this.props.getSelectedAddress}
          selectedDestinationAddress={this.props.selectedDestinationAddress}
          selectedSourceAddress={this.props.selectedSourceAddress}
          coords={this.props.coords}
        />
      }
      <Footer>
        <FooterTab>
          {
            tabs.map((obj,index)=>{
              return(
                <Button key={index}>
                  <Icon size={20} name={obj.icon} color={(index===0)? "#FFFFFF" : "grey"}/>
                  <Text style={{fontSize:12, color:(index===0)? "#ffffff" : "grey"}}>{obj.title}</Text>
                  <Text>{obj.subTitle}</Text>
                </Button>
              )
            })
          }
        </FooterTab>
      </Footer>
      </Container>
      </Drawer>
    );
  }
}

const mapStateToProps = ({auth}) => {
  const {email, password, error, loading,region,inputData,resultTypes,predictions,selectedSourceAddress,selectedDestinationAddress,coords} = auth;
  return{email, password, error, loading,region,inputData,resultTypes,predictions,selectedSourceAddress,selectedDestinationAddress,coords};
};


export default connect(mapStateToProps, {
  getCurrentLocation, getInputData, toggleSearchResultModal, getAddressPredictions, getSelectedAddress
})(UserHome);
