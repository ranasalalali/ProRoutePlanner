import React, {Component} from 'react';
import { View,Form,Picker,Item,Icon,Text,Drawer,Container,Header,Left,Button,Body } from 'native-base';
import MapView from 'react-native-maps';
import RNGooglePlaces from 'react-native-google-places';
import request from '../util/request';
import Polyline from '@mapbox/polyline';
import RNPolyline  from 'rn-maps-polyline'
import { StyleSheet } from 'react-native';
import SideBar from './SideBar';
import { connect } from 'react-redux';
import { GetMuslimCoords, GetD1Coords, GetGreenBusCoords
} from '../actions';

class BusRoutes extends Component {


  constructor(props) {
    super(props);
    this.state = {
      selected2: undefined
    };
  }
  onValueChange2(value: string) {
    this.setState({
      selected2: value
    });
    if(value==="Muslim")
    {
      this.props.GetMuslimCoords();
    }
    if(value==="D-1")
    {
      this.props.GetD1Coords();
    }
    if(value==="Green Bus")
    {
      this.props.GetGreenBusCoords();
    }
  }

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
      <Header>
        <Left>
          <Button transparent onPress={()=>openDrawer()}>
            <Icon name='menu'  />
          </Button>
        </Left>
        <Body>
          <Text style={{color:'white'}}>Bus Routes</Text>
        </Body>

      </Header>
      <Form>
            <Picker
              mode="dropdown"
              placeholder="Select One"
              selectedValue={this.state.selected2}
              onValueChange={this.onValueChange2.bind(this)}
            >
              <Item label="Green Bus" value="Green Bus" />
              <Item label="Muslim" value="Muslim" />
              <Item label="D-1" value="D-1" />
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
            coordinates={this.props.muslimCoords}
            strokeColor="blue"
            strokeWidth={3}/>
        </MapView>
        </View>
      </Container>
      </Drawer>
    );
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
  const {muslimCoords} = auth;
  return{muslimCoords};
};


export default connect(mapStateToProps, {
  GetMuslimCoords,GetD1Coords,GetGreenBusCoords
})(BusRoutes);
