import React from 'react';
import { Platform, StatusBar, Text } from 'react-native';
import {Scene, Router} from 'react-native-router-flux';
import LoginForm from './components/LoginForm';
import UserHome from './components/UserHome';
import RegisterMain from './components/RegisterMain';
import RegisterTaxiDriver from './components/RegisterTaxiDriver';
import RegisterBusDriver from './components/RegisterBusDriver';
import BusRoutes from './components/BusRoutes';

const RouterComponent = () => {
  return(
    <Router hideNavBar>
      <Scene key="busroutes" component={BusRoutes} title="BusRoutes" panHandlers={null} initial/>
      <Scene key="userhome" component={UserHome} title="Welcome User" panHandlers={null} />
      <Scene key="login" component={LoginForm} title="Please Login" panHandlers={null} />
      <Scene key="registermain" component={RegisterMain} title="RegisterMain" panHandlers={null}/>
      <Scene key="registertaxidriver" component={RegisterTaxiDriver} title="RegisterTaxiDriver" panHandlers={null}/>
      <Scene key="registerbusdriver" component={RegisterBusDriver} title="RegisterBusDriver" panHandlers={null}/>

    </Router>
  );
};


export default RouterComponent;
