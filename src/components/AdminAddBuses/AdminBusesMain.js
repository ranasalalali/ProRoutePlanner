import _ from 'lodash';
import React, { Component } from 'react';
import { Platform, StatusBar } from 'react-native';
import { View, Footer, FooterTab, Container, Text, Button, Content, Right, List, ListItem, Header, Drawer, Left, Icon, Body } from 'native-base';
import MapContainer from '../MapContainer';
import SideBar from '../SideBar';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { resetAddBus, getBusList, BusInput, getcurrentbuscoords } from '../../actions';
class AdminBusesMain extends Component {

  componentWillMount() {
    this.props.getBusList();
  }
  onBusPress(bus) {
    this.props.BusInput(bus);
    this.props.getcurrentbuscoords();
    Actions.buswaypoints();
  }

  BusesList() {
    var Items = this.props.buslist;
    return (
      <Content scrollenabled={true}>
        <List dataArray={Items}
          renderRow={(item) =>
            <ListItem onPress={() => this.onBusPress(item)}>
              <Body>
                <Text>{item}</Text>
              </Body>
              <Right>
                <Icon name='bus' style={{ color: 'black' }} />
              </Right>
            </ListItem>
          }>
        </List>
      </Content>
    )
  }



  render() {
    AddBus = () => {
      this.props.resetAddBus();
      Actions.addbus();
    }

    closeDrawer = () => {
      this.drawer._root.close()
    };
    openDrawer = () => {
      this.drawer._root.open()
    };
    return (
      <Container>
        <Header style={{ backgroundColor: 'black' }} androidStatusBarColor='black'>
          <Left>
            <Button transparent onPress={() => {
              Actions.adminmain()
            }}>
              <Icon name='arrow-back' />
            </Button>
          </Left>
          <Body>
            <Text style={{ color: 'white' }}>Buses List</Text>
          </Body>
          <Right>
            <Button transparent onPress={() => AddBus()}>
              <Icon name='add' />
            </Button>
          </Right>
        </Header>
        {this.BusesList()}
      </Container>
    );
  }
}

const mapStateToProps = ({ auth }) => {
  const { busname, buserror, busadded, buslist } = auth;
  return { busname, buserror, busadded, buslist };
};

export default connect(mapStateToProps, { resetAddBus, getBusList, BusInput, getcurrentbuscoords })(AdminBusesMain);
