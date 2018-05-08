import _ from 'lodash';
import React, { Component } from 'react';
import { Platform, StatusBar } from 'react-native';
import { View, Footer, FooterTab, Container, Text, Button, Content, Right, List, ListItem, Header, Drawer, Left, Icon, Body } from 'native-base';
import MapContainer from './MapContainer';
import AdminSideBar from './SideBar/AdminSideBar.js';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { resetAddBus, getBusList, BusInput, getcurrentbuscoords } from '../actions';
class AdminMain extends Component {



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
        content={<AdminSideBar navigator={this._navigator} />}
        onClose={() => closeDrawer()}
      >

        <Container >
          <View>
            <Header style={{ backgroundColor: 'black' }} androidStatusBarColor='black'>
              <Left>
                <Button transparent onPress={() => openDrawer()}>
                  <Icon name='menu' />
                </Button>
              </Left>
              <Body>
                <Text style={{ color: 'white' }}>Admin Main</Text>
              </Body>
              <Right>
              </Right>
            </Header>
          </View>
          <Content style={{ backgroundColor: '#FFFFFF' }}>
            <List>
              <View>
                <ListItem onPress={() => Actions.adminbusesmain()}>
                  <Left>
                    <Icon name='bus' />
                  </Left>
                  <Body>
                    <Text>Buses</Text>
                  </Body>
                  <Right>
                    <Icon name='arrow-forward' />
                  </Right>
                </ListItem>
                <ListItem onPress={() => Actions.adminrickshawmain()}>
                  <Left>
                    <Icon name='bus' />
                  </Left>
                  <Body>
                    <Text>Rickshaws</Text>
                  </Body>
                  <Right>
                    <Icon name='arrow-forward' />
                  </Right>
                </ListItem>
              </View>
            </List>
          </Content>
        </Container>
      </Drawer>
    );
  }
}

const mapStateToProps = ({ auth }) => {
  const { busname, buserror, busadded, buslist } = auth;
  return { busname, buserror, busadded, buslist };
};

export default connect(mapStateToProps, { resetAddBus, getBusList, BusInput, getcurrentbuscoords })(AdminMain);
