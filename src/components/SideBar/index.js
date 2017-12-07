import React, { Component } from 'react';
import {
  Text,Image
} from 'react-native';
import {Content,Button} from 'native-base';
import {Actions} from 'react-native-router-flux';

export default class Sidebar extends Component {
  render() {
    return (
          <Content style={{backgroundColor:'#FFFFFF'}}>
            <Button rounded full primary onPress={()=>Actions.userhome()}><Text style={{color:'white'}}>Home</Text></Button>
            <Button rounded full success onPress={()=>Actions.busroutes()}><Text style={{color:'white'}}>Bus Routes</Text></Button>
            <Button rounded full success onPress={()=>Actions.userhome()}><Text style={{color:'white'}}>Site Seeing</Text></Button>
            <Button rounded full danger onPress={()=>Actions.login()}><Text style={{color:'white'}}>Logout</Text></Button>
          </Content>
    );
  }
}

module.exports = Sidebar;
