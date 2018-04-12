import React, { Component } from 'react';
import { Platform, StatusBar } from 'react-native';
import { View, Footer, FooterTab, Container, Text, Button,Content, Header,Drawer,Left,Icon,Body } from 'native-base';
import MapContainer from './MapContainer';
import SideBar from './SideBar';
import Fare from './Fare';
import { getCurrentLocation,
  getInputData,
  toggleSearchResultModal,
  getAddressPredictions,
  getSelectedAddress,
  getBusList,
  getLiveBusCoords,
  getLiveTaxiCoords
} from '../actions';

import { connect } from 'react-redux';

class UserHome extends Component {

  constructor(props){
    super(props);
    this.props.getCurrentLocation();
    this.state = {
      livebus:[],
      livetaxi:[],
      activetab:'taxi'
    };
    
    
 }

 componentWillMount(){
  setInterval(()=>{
    this.props.getLiveTaxiCoords();
    this.props.getLiveBusCoords();
    this.setState({livebus:this.props.livebuscoords,
        livetaxi:this.props.livetaxicoords
    })
    // if(this.state.activetab==='taxi')
    // {
    //   this.props.getLiveTaxiCoords();
    //   this.setState({livebus:[],
    //     livetaxi:this.props.livetaxicoords
    //   })
    // }
    // else if(this.state.activetab==='bus')
    // {
    //   this.props.getLiveBusCoords();
    //   this.setState({livebus:this.props.livebuscoords,
    //     livetaxi:[]
    //   })
    // }   
  }, 6000)
 }

  // componentWillUpdate(nextState){
  //   this.setState({livebus:nextState.livebus});
  // }

//  componentDidMount()
//  {
//    var rx= this;
//    this.props.getCurrentLocation();
//    rx.props.getLiveBusCoords();
//    setTimeout(function(){
//     rx.props.getLiveBusCoords();
//    },5000);
//  }


  render() {

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
      <Header style={{backgroundColor:'black'}} androidStatusBarColor='black'>
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
          livebuscoords={this.state.livebus}
          livetaxicoords={this.state.livetaxi}
        />
      }

      {
        this.props.taxifare && 
        <Fare fare={this.props.taxifare}/>
      }

      </Container>
      <Footer>
      <FooterTab style={{backgroundColor:'black'}}>
            <Button>
              <Text>TaxiCar</Text>
            </Button>
            <Button>
              <Text>Buses</Text>
            </Button>
            <Button>
              <Text>Rickshaws</Text>
            </Button>
      </FooterTab>
      </Footer>
      </Drawer>
    );
  }
}

const mapStateToProps = ({auth}) => {
  const {livetaxicoords,taxifare,livebuscoords,region,inputData,resultTypes,predictions,selectedSourceAddress,selectedDestinationAddress,coords} = auth;
  return{livetaxicoords,taxifare,livebuscoords,region,inputData,resultTypes,predictions,selectedSourceAddress,selectedDestinationAddress,coords};
};


export default connect(mapStateToProps, {
  getLiveTaxiCoords,getLiveBusCoords, getCurrentLocation, getInputData, toggleSearchResultModal, getAddressPredictions, getSelectedAddress,getBusList
})(UserHome);
