import firebase from 'firebase';
import {Actions} from 'react-native-router-flux';
import RNGooglePlaces from 'react-native-google-places';
import request from '../util/request';
import Polyline from '@mapbox/polyline';
import RNPolyline  from 'rn-maps-polyline'
import {
  EMAIL_CHANGED,
  PASSWORD_CHANGED,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  LOGIN_USER,
  GET_CURRENT_LOCATION,
  GET_INPUT,
  TOGGLE_SEARCH_RESULT,
  GET_ADDRESS_PREDICTIONS,
  GET_SELECTED_ADDRESS,
  GET_DIRECTION_POLYLINE,
  GET_CHANGED_REGION,
  GET_MUSLIM_COORDS,
  ADD_BUS_NAME
} from './types';


//LOGIN FORM

export const emailChanged = (text) => {
  return{
    type: EMAIL_CHANGED,
    payload: text
  };
};

export const passwordChanged = (text) => {
  return{
    type: PASSWORD_CHANGED,
    payload: text
  };
};

export const loginUser = ({ email, password }) => {
  return (dispatch) => {
    dispatch({type:LOGIN_USER});

    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(user => loginUserSuccess(dispatch,user))
      .catch(() => {
        firebase.auth().createUserWithEmailAndPassword(email, password)
          .then(user => loginUserSuccess(dispatch,user))
          .catch(()=>loginUserFail(dispatch));
      });
  };
};


const loginUserSuccess = (dispatch, user) => {
  dispatch({
    type: LOGIN_USER_SUCCESS,
    payload:user
  });
  Actions.userhome();
};

const loginUserFail = (dispatch) => {
  dispatch({type:LOGIN_USER_FAIL});
};



//USERHOMEMAP

export const getCurrentLocation = () => {
  return(dispatch) => {
    navigator.geolocation.getCurrentPosition(
      (position)=>{
        dispatch({
          type:GET_CURRENT_LOCATION,
          payload:position
        });
      },
      (error)=>console.log(error.message),
      {enableHighAccuracy: false, timeout: 5000, maximumAge: 0}
    );
  }
};

export const getAddressPredictions=()=>{
  return(dispatch, store) => {
    let userInput = store().auth.resultTypes.Source ? store().auth.inputData.Source : store().auth.inputData.Destination;
    RNGooglePlaces.getAutocompletePredictions(userInput,{
  	  latitude: 24.934993,
  	  longitude: 67.122951,
  	  radius: 30
    })
    .then((place)=>
      dispatch({
        type:GET_ADDRESS_PREDICTIONS,
        payload:place
      })
    )
    .catch((error)=>console.log(error.message));
  };
};

export const getInputData = (payload) => {
  return{
    type:GET_INPUT,
    payload:payload
  };
};

export const toggleSearchResultModal= (payload)=>{
  return{
    type:TOGGLE_SEARCH_RESULT,
    payload:payload
  };
};


export const getSelectedAddress = (payload,current)=>{
  return(dispatch, store)=>{
    RNGooglePlaces.lookUpPlaceByID(payload)
    .then((results)=>{
      dispatch({
        type:GET_SELECTED_ADDRESS,
        payload:results
      })
    })
    .then(()=>{
      if(store().auth.selectedSourceAddress.selectedSource && store().auth.selectedDestinationAddress.selectedDestination){
        request.get("https://maps.googleapis.com/maps/api/directions/json")
        .query({
          origin:store().auth.selectedSourceAddress.selectedSource.latitude + "," + store().auth.selectedSourceAddress.selectedSource.longitude,
          destination:store().auth.selectedDestinationAddress.selectedDestination.latitude + "," + store().auth.selectedDestinationAddress.selectedDestination.longitude,
          mode:"driving",
          key:"AIzaSyBW0I2DCKuHU5ZsbDJM9aIe2O4WM-9StqQ"
        })
        .finish((error, res)=>{
          let lat = store().auth.selectedSourceAddress.selectedSource.latitude;
          let long = store().auth.selectedSourceAddress.selectedSource.longitude;
          console.log(lat);
          let points = RNPolyline.decode(res.body.routes[0].overview_polyline.points);
          let coords = points.map((point,index) => {
              return {
                 latitude: point[1],
                 longitude: point[0],
              }
          });
          dispatch({
            type:GET_DIRECTION_POLYLINE,
            payload:points
          });
          dispatch({
            type:GET_CHANGED_REGION,
            payload:{lat,long}
          });
        })
      }
    })
    .catch((error)=>console.log(error.message));
  };
};


export const GetBusRoute=(busname)=>{
  return(dispatch, store)=>{
    firebase.database().ref('/buses/'+busname).once("value")
    .then(function(snapshot){
      console.log(snapshot.val());
      var startpoint = snapshot.child("Startpoint").val();
      var endpoint = snapshot.child("Endpoint").val();
      var waypoint = snapshot.child("Waypoint").val();
      request.get("https://maps.googleapis.com/maps/api/directions/json")
      .query({
        origin:startpoint,
        destination:endpoint,
        waypoints:waypoint,
        mode:"driving",
        key:"AIzaSyBW0I2DCKuHU5ZsbDJM9aIe2O4WM-9StqQ"
      })
      .finish((error, res)=>{
        console.log(res);
        let points = RNPolyline.decode(res.body.routes[0].overview_polyline.points);
        let coords = points.map((point,index) => {
            return {
               latitude: point[1],
               longitude: point[0],
            }
        });
        dispatch({
          type:GET_MUSLIM_COORDS,
          payload:points
        });
      })
    })
  };
};






//BUSES Add

export const BusInput = (text) => {
  return{
    type: ADD_BUS_NAME,
    payload: text
  };
};

export const resetAddBus = () => {
  return{
    type: "RESET_ADD_BUS"
  };
};

export const AddNewBus = (name)=>{
  console.log(name);
  let check = false;
  return(dispatch)=>{
    if(name==="")
    {
      dispatch({
        type:"BUS_ADDED_FAILED"
      })
    }
    else {
      firebase.database().ref('buses/')
      .once('value', function(snapshot){
        if(!snapshot.hasChild(name)){
          firebase.database().ref('buses/'+name+'/waypoints/')
          dispatch({
            type:"BUS_ADDED_SUCCESS"
          })
          Actions.startpointmap();
        }
        else
        {
          dispatch({
            type:"BUS_ADDED_FAILED"
          })
        }
      });
    }

  }


};

export const addBusStartPoint = (coords) => {
  return(dispatch,store)=>{
      var busname = store().auth.busname;
      var waypoint = coords.latitude+","+coords.longitude;
      firebase.database().ref('/buses/'+busname).update({Startpoint:waypoint});
      Actions.endpointmap();
      dispatch({
        type:"START_POINT_ADDED"
      })
  }
}

export const addBusEndPoint = (coords) => {
  return(dispatch,store)=>{
      var busname = store().auth.busname;
      var waypoint = coords.latitude+","+coords.longitude;
      firebase.database().ref('/buses/'+busname).update({Endpoint:waypoint});

      Actions.addbus();
      dispatch({
        type:"END_POINT_ADDED"
      })
  }
}


export const getcurrentbuscoords = () => {
  return(dispatch,store)=>{
    var busname = store().auth.busname;
    firebase.database().ref('/buses/'+busname).once("value")
    .then(function(snapshot){
      console.log(snapshot.val());
      var startpoint = snapshot.child("Startpoint").val();
      var endpoint = snapshot.child("Endpoint").val();
      var waypoint = snapshot.child("Waypoint").val();
      request.get("https://maps.googleapis.com/maps/api/directions/json")
      .query({
        origin:startpoint,
        destination:endpoint,
        waypoints:waypoint,
        mode:"driving",
        key:"AIzaSyBW0I2DCKuHU5ZsbDJM9aIe2O4WM-9StqQ"
      })
      .finish((error, res)=>{
        console.log(res);
        let points = RNPolyline.decode(res.body.routes[0].overview_polyline.points);
        let coords = points.map((point,index) => {
            return {
               latitude: point[1],
               longitude: point[0],
            }
        });
        dispatch({
          type:"CURRENT_BUS_COORDS",
          payload:points
        });
      })
    })

  }
}


export const addBusWayPoint = (coords)=>{
  return(dispatch,store)=>{
      var busname = store().auth.busname;
      var waypoint = coords.latitude+","+coords.longitude;
      firebase.database().ref('buses/'+busname)
      .once('value', function(snapshot){
        if(!snapshot.hasChild("Waypoint")){
          firebase.database().ref('/buses/'+busname).update({Waypoint:waypoint})
          Actions.addbus();
        }
        else
        {
          firebase.database().ref('/buses/'+busname).once("value")
          .then(function(snapshot){
            console.log(snapshot.val());
            var waypoint = snapshot.child("Waypoint").val();
            waypoint = waypoint + "|" + coords.latitude+","+coords.longitude;
            firebase.database().ref('/buses/'+busname).update({Waypoint:waypoint})
            Actions.addbus();
        });
      }
    });
  }
};



export const getBusList = ()=>{
  return(dispatch)=>{
      const list = [];
      firebase.database().ref("buses").orderByKey()
      .once('value').then(function(snapshot){
        snapshot.forEach(function(childSnapshot){
          list.push(childSnapshot.key)
        });
      });
      dispatch({
        type:"GET_BUS_LIST",
        payload:list
      })
    }
};

export const getWaypointList = () => {
  return(dispatch,store )=>{
    const list = [];
    var busname = store().auth.busname;
    busname.concat('/waypoints');
    firebase.database().ref("buses/"+busname).orderByKey()
    .once('value').then(function(snapshot){
      snapshot.forEach(function(childSnapshot){
        var item = childSnapshot.val();
        list.push(item.key);
      })
    })
    dispatch({
      type:"GET_WAYPOINT_LIST",
      payload:list
    })
  }
}
