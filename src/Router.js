import React from 'react';
import { Platform, StatusBar, Text } from 'react-native';
import { Scene, Router, Stack } from 'react-native-router-flux';
import LoginForm from './components/LoginForm';
import UserHome from './components/UserHome';
import RegisterMain from './components/RegisterMain';
import RegisterTaxiDriver from './components/RegisterTaxiDriver';
import RegisterBusDriver from './components/RegisterBusDriver';
import RegisterRickshawDriver from './components/RegisterRickshawDriver';
import BusRoutes from './components/BusRoutes';
import RickshawRoutes from './components/RickshawRoutes';
import AdminMain from './components/AdminMain';

import AdminBusesMain from './components/AdminAddBuses/AdminBusesMain';
import AddBus from './components/AdminAddBuses/AddBus';
import CoordMap from './components/AdminAddBuses/CoordMap';
import EndPointMap from './components/AdminAddBuses/EndPointMap';
import StartPointMap from './components/AdminAddBuses/StartPointMap';
import BusWayPoints from './components/AdminAddBuses/BusWayPoints';

import AdminRickshawMain from './components/AdminAddRickshaw/AdminRickshawMain';
import AddRickshaw from './components/AdminAddRickshaw/AddRickshaw';
import RickshawCoordMap from './components/AdminAddRickshaw/RickshawCoordMap';
import RickshawEndPointMap from './components/AdminAddRickshaw/RickshawEndPointMap';
import RickshawStartPointMap from './components/AdminAddRickshaw/RickshawStartPointMap';
import RickshawWayPoints from './components/AdminAddRickshaw/RickshawWayPoints';

import RickshawDriverMain from './components/RickshawDriverMain';
import BusDriverMain from './components/BusDriverMain';
import TaxiDriverMain from './components/TaxiDriverMain';

const RouterComponent = () => {
  return (
    <Router hideNavBar>
      <Stack key='root' hideNavBar>
        <Scene key="busroutes" component={BusRoutes} title="BusRoutes" panHandlers={null} />
        <Scene key="rickshawroutes" component={RickshawRoutes} title="RickshawRoutes" panHandlers={null} />
        <Scene key="userhome" component={UserHome} title="Welcome User" panHandlers={null} />
        <Scene key="login" component={LoginForm} title="Please Login" panHandlers={null} initial />
        <Scene key="registermain" component={RegisterMain} title="RegisterMain" panHandlers={null} />
        <Scene key="registertaxidriver" component={RegisterTaxiDriver} title="RegisterTaxiDriver" panHandlers={null} />
        <Scene key="registerbusdriver" component={RegisterBusDriver} title="RegisterBusDriver" panHandlers={null} />
        <Scene key="registerrickshawdriver" component={RegisterRickshawDriver} title="RegisterRickshawDriver" panHandlers={null} />


        <Scene key="adminmain" component={AdminMain} title="Admin Main" panHandlers={null} />

        <Scene key="adminbusesmain" component={AdminBusesMain} title="Admin Buses Main" panHandlers={null} />
        <Scene key="addbus" component={AddBus} title="Add Bus" panHandlers={null} />
        <Scene key="coordmap" component={CoordMap} title="Choose Location" panHandlers={null} />
        <Scene key="startpointmap" component={StartPointMap} title="Choose Location" panHandlers={null} />
        <Scene key="endpointmap" component={EndPointMap} title="Choose Location" panHandlers={null} />
        <Scene key="buswaypoints" component={BusWayPoints} title="Choose Location" panHandlers={null} />

        <Scene key="busdrivermain" component={BusDriverMain} title="Bus Driver Main" panHandlers={null} />

        <Scene key="taxidrivermain" component={TaxiDriverMain} title="Taxi Driver Main" panHandlers={null} />

        <Scene key="rickshawdrivermain" component={RickshawDriverMain} title="Rickshaw Driver Main" panHandlers={null} />

        <Scene key="adminrickshawmain" component={AdminRickshawMain} title="Admin Rickshaw Main" panHandlers={null} />
        <Scene key="addrickshaw" component={AddRickshaw} title="Add Rickshaw" panHandlers={null} />
        <Scene key="rickshawcoordmap" component={RickshawCoordMap} title="Choose Location" panHandlers={null} />
        <Scene key="rickshawstartpointmap" component={RickshawStartPointMap} title="Choose Location" panHandlers={null} />
        <Scene key="rickshawendpointmap" component={RickshawEndPointMap} title="Choose Location" panHandlers={null} />
        <Scene key="rickshawwaypoints" component={RickshawWayPoints} title="Choose Location" panHandlers={null} />
      </Stack>
    </Router>
  );
};


export default RouterComponent;
