import {Dimensions} from 'react-native';


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
} from '../actions/types';

const INITIAL_STATE = {
  email:  '',
  password: '',
  user: null,
  error: '',
  loading: false,
  region:{},
  inputData:{},
  resultTypes:{},
  predictions:[]
};

const {width, height} = Dimensions.get("window");
const ASPECT_RATIO = width/height;

const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = ASPECT_RATIO * LATITUDE_DELTA;


export default (state = INITIAL_STATE, action) => {
  console.log(action);
  switch(action.type){
    case EMAIL_CHANGED:
      return { ...state, email: action.payload };
    case PASSWORD_CHANGED:
      return { ...state, password: action.payload};
    case LOGIN_USER:
      return { ...state, loading: true, error:''};
    case LOGIN_USER_SUCCESS:
      return {...state, ...INITIAL_STATE, user: action.payload };
    case LOGIN_USER_FAIL:
      return { ...state, error: 'Authentication Failed.', password: '', loading: false };
    case GET_CURRENT_LOCATION:
      return { ...state, region:{
          latitude:Number(action.payload.coords.latitude),
          longitude:Number(action.payload.coords.longitude),
          latitudeDelta:LATITUDE_DELTA,
          longitudeDelta:LONGITUDE_DELTA
        }
      };
    case GET_INPUT:
      const {key, value } = action.payload;
      return { ...state, inputData:{
        [key]:value
      }};
    case TOGGLE_SEARCH_RESULT:
      if(action.payload === 'Source'){
          return { ...state, resultTypes:{Source:true,
            Destination:false
          },
          predictions:[]
        };
      }
      if(action.payload === 'Destination'){
          return { ...state, resultTypes:{Source:false,
            Destination:true
          },
          predictions:[]
        };
      }
    case GET_ADDRESS_PREDICTIONS:
      return { ...state, predictions:action.payload};
    default:
      return state;
  }
};
