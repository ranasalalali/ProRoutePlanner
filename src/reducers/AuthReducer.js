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
  GET_ADDRESS_PREDICTIONS,
  GET_SELECTED_ADDRESS,
  GET_DIRECTION_POLYLINE,
  GET_CHANGED_REGION,
  GET_MUSLIM_COORDS,
  ADD_BUS_NAME,
  SET_CURRENT_DRIVER_BUS,
  GET_LIVE_BUS_COORDS,
  GET_DISTANCE_MATRIX,
  GET_FARE,
  GET_LIVE_TAXI_COORDS
} from '../actions/types';

const INITIAL_STATE = {
  email:  '',
  password: '',
  user: '',
  currentdriverbus:'',
  error: '',
  loading: false,
  region:{},
  inputData:{},
  searchinput:'',
  resultTypes:{},
  predictions:[],
  selectedSourceAddress:{},
  selectedDestinationAddress:{},
  coords:[],
  muslimCoords:[],
  busname:'',
  buserror:'',
  busadded:false,
  startadded:false,
  endadded:false,
  buslist:[],
  waypointlist:[],
  currentbuscoords:[],
  selectedregion:{latitude: 24.8615,
  longitude: 67.0099,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421},
  livebuscoords:[],
  livetaxicoords:[]
};

const {width, height} = Dimensions.get("window");
const ASPECT_RATIO = width/height;

const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = ASPECT_RATIO * LATITUDE_DELTA;


export default (state = INITIAL_STATE, action) => {
  console.log(action);
  switch(action.type){

    case 'LOGOUT':
      return{ INITIAL_STATE };

    case GET_LIVE_BUS_COORDS:
      
      return {...state, livebuscoords:action.payload};

    case GET_LIVE_TAXI_COORDS:

      return {...state, livetaxicoords:action.payload};

    case EMAIL_CHANGED:
      return { ...state, email: action.payload };

    case PASSWORD_CHANGED:
      return { ...state, password: action.payload};

    case LOGIN_USER:
      return { ...state, loading: true, error:''};

    case LOGIN_USER_SUCCESS:
      return {...state, ...INITIAL_STATE, user: action.payload };

    case SET_CURRENT_DRIVER_BUS:
      return {...state, currentdriverbus: action.payload };

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

    case "GET_SEARCH_INPUT":
      return {...state, searchinput:action.payload};

    case "GET_SELECTED_REGION":
      return {...state, selectedregion:{latitude: action.payload.latitude,
      longitude: action.payload.longitude,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA}};

    case "RESET_MAP":
      return { ...state, selectedregion:{latitude: 24.8615,
      longitude: 67.0099,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421}};

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


    case GET_SELECTED_ADDRESS:
      if(state.resultTypes.Source){
        return { ...state, selectedSourceAddress:{
          selectedSource:action.payload
        },
        resultTypes:{Source:false,
          Destination:false
        }
      }

      }
      else{
        return { ...state, selectedDestinationAddress:{
          selectedDestination:action.payload
        },
        resultTypes:{Source:false,
          Destination:false
        }
      }
      }

      case GET_FARE:
      return{...state,taxifare:action.payload}

      case GET_DIRECTION_POLYLINE:
        return { ...state, coords:action.payload};
      case GET_CHANGED_REGION:
        return { ...state, region:{
            latitude:Number(action.payload.lat),
            longitude:Number(action.payload.long),
            latitudeDelta:LATITUDE_DELTA,
            longitudeDelta:LONGITUDE_DELTA
          }
        };
      case GET_MUSLIM_COORDS:
        return { ...state, muslimCoords:action.payload};
      case "START_POINT_ADDED":
        return { ...state, startadded:true}
      case "END_POINT_ADDED":
        return { ...state, endadded:true}

      case "CURRENT_BUS_COORDS":
        return { ...state, currentbuscoords:action.payload}
      case "GET_BUS_LIST":
        return { ...state, buslist:action.payload};
      case "GET_WAYPOINT_LIST":
        return { ...state, waypointlist:action.payload};
      case ADD_BUS_NAME:
        return { ...state, busname:action.payload};
      case "BUS_ADDED_SUCCESS":
        return { ...state, buserror:'', busadded:true};
      case "BUS_ADDED_FAILED":
        return { ...state, buserror:'Error! Bus name already exists',busadded:false};
      case "RESET_ADD_BUS":
        return { ...state, busname:'' ,buserror:'',busadded:false,startadded:false,endadded:false};

      case GET_DISTANCE_MATRIX:
        return { ...state, distancematrix:action.payload}
     
    default:
      return state;
  }
};
