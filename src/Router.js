import React from 'react';
import { Platform, StatusBar, Text } from 'react-native';
import {Scene, Router} from 'react-native-router-flux';
import LoginForm from './components/LoginForm';
import UserHome from './components/UserHome';
import RegisterMain from './components/RegisterMain';
import RegisterTaxiDriver from './components/RegisterTaxiDriver';
import RegisterBusDriver from './components/RegisterBusDriver';
import BusRoutes from './components/BusRoutes';
import AdminMain from './components/AdminMain';
import AddBus from './components/AddBus';
import CoordMap from './components/CoordMap';
import EndPointMap from './components/EndPointMap';
import StartPointMap from './components/StartPointMap';

const RouterComponent = () => {
  return(
    <Router hideNavBar>
      <Scene key="busroutes" component={BusRoutes} title="BusRoutes" panHandlers={null}/>
      <Scene key="userhome" component={UserHome} title="Welcome User" panHandlers={null} />
      <Scene key="login" component={LoginForm} title="Please Login" panHandlers={null} initial/>
      <Scene key="registermain" component={RegisterMain} title="RegisterMain" panHandlers={null}/>
      <Scene key="registertaxidriver" component={RegisterTaxiDriver} title="RegisterTaxiDriver" panHandlers={null}/>
      <Scene key="registerbusdriver" component={RegisterBusDriver} title="RegisterBusDriver" panHandlers={null}/>
      <Scene key="adminmain" component={AdminMain} title="Admin Main" panHandlers={null} />
      <Scene key="addbus" component={AddBus} title="Add Bus" panHandlers={null} />
      <Scene key="coordmap" component={CoordMap} title="Choose Location" panHandlers={null}/>
      <Scene key="startpointmap" component={StartPointMap} title="Choose Location" panHandlers={null}/>
      <Scene key="endpointmap" component={EndPointMap} title="Choose Location" panHandlers={null}/>
    </Router>
  );
};


export default RouterComponent;
