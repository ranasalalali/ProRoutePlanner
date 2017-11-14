import firebase from 'firebase';
import {Actions} from 'react-native-router-flux';
import RNGooglePlaces from 'react-native-google-places';

import {
  EMAIL_CHANGED,
  PASSWORD_CHANGED,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  LOGIN_USER,
  GET_CURRENT_LOCATION,
  GET_INPUT,
  TOGGLE_SEARCH_RESULT,
  GET_ADDRESS_PREDICTIONS
} from './types';


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
      {enableHighAccuracy: false, timeout: 10000, maximumAge: 3000}
    );
  }
};

export const getAddressPredictions=()=>{
  return(dispatch, store) => {
    let userInput = store().auth.resultTypes.Source ? store().auth.inputData.Source : store().auth.inputData.Destination;
    RNGooglePlaces.getAutocompletePredictions(userInput,{
      country:"PK"
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


const initialState = {
  resultTypes:{}
};
