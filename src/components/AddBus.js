import React, { Component } from 'react';
import { Platform, StatusBar } from 'react-native';
import { View, Footer, FooterTab,Card,CardItem,Item,Input, Container, Text, Button,Content,Right,List,ListItem, Header,Drawer,Left,Icon,Body } from 'native-base';
import MapContainer from './MapContainer';
import SideBar from './SideBar';
import {Actions} from 'react-native-router-flux';
import { connect } from 'react-redux';
import {AddNewBus,BusInput} from '../actions'

class AddBus extends Component {

  onBusNameChange(text){
    this.props.BusInput(text);
  }

  onAddPress(){
    const {busname} = this.props;
    this.props.AddNewBus(busname);
  }

  listorbutton(){
    if(this.props.busadded && this.props.startadded && this.props.endadded){
      return(
        <View>
        <Button full primary onPress={()=>Actions.coordmap()}>
          <Icon name='add' />
          <Text>Add New Waypoint</Text>
        </Button>
        </View>
      )
    }
    else {
      return(
            <Button full primary onPress={this.onAddPress.bind(this)}>
              <Text>NEXT</Text>
            </Button>
      )

    }
  }

  render() {



    return (
      <Container>
        <Header>
          <Left>
            <Button transparent onPress={()=>Actions.adminmain()}>
              <Icon name='arrow-back'  />
            </Button>
          </Left>
          <Body>
            <Text style={{color:'white'}}>Add New Bus</Text>
          </Body>
        </Header>
        <Card>
          <CardItem>
            <Item>
              <Input
                label="BusName"
                placeholder="Enter Bus Name"
                onChangeText={this.onBusNameChange.bind(this)}
                value={this.props.busname}
              />
            </Item>
          </CardItem>
          <Text style={styles.errorTextStyle}>
            {this.props.buserror}
          </Text>
          {this.listorbutton()}

        </Card>
      </Container>
    );
  }
}

const styles = {
  errorTextStyle:{
    fontSize: 15,
    alignSelf: 'center',
    color:'red'
  }
};

const mapStateToProps = ({auth}) => {
  const {busname,buserror,busadded,waypointlist,startadded,endadded} = auth;
  return{busname,buserror,busadded,waypointlist,startadded,endadded};
};

export default connect(mapStateToProps,{AddNewBus,BusInput})(AddBus);
