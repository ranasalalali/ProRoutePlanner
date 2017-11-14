import React from 'react';
import { Platform, StatusBar, Text } from 'react-native';
import {Scene, Router} from 'react-native-router-flux';
import LoginForm from './components/LoginForm';
import UserRegister from './components/UserRegister';
import UserHome from './components/UserHome';
import RegisterDriver from './components/RegisterDriver';
import RegisterMain from './components/RegisterMain';

const RouterComponent = () => {
  return(
    <Router sceneStyle={{paddingTop:50}}>
      <Scene key="login" component={LoginForm} title="Please Login" />
      <Scene key="userhome" component={UserHome} title="Welcome User" />
      <Scene key="registermain" component={RegisterMain} title="RegisterMain"/>
    </Router>
  );
};


export default RouterComponent;
