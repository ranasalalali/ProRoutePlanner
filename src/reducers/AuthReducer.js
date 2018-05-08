import { Dimensions } from 'react-native';


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
  ADD_RICKSHAW_NAME,
  SET_CURRENT_DRIVER_BUS,
  GET_LIVE_BUS_COORDS,
  GET_DISTANCE_MATRIX,
  GET_FARE,
  GET_LIVE_TAXI_COORDS,
  GET_LIVE_RICKSHAW_COORDS,
  GET_RICKSHAW_COORDS
} from '../actions/types';

const INITIAL_STATE = {
  email: '',
  password: '',
  user: null,
  currentdriverbus: '',
  error: '',
  loading: false,
  region: {},
  inputData: {},
  searchinput: '',
  resultTypes: {},
  predictions: [],
  selectedSourceAddress: {},
  selectedDestinationAddress: {},
  coords: [],
  coords2:[],
  muslimCoords: [],
  rickshawCoords: [],
  busname: '',
  buserror: '',
  busadded: false,
  startadded: false,
  endadded: false,
  buslist: [],
  waypointlist: [],
  currentbuscoords: [],

  rickshawname: '',
  rickshawerror: '',
  rickshawadded: false,
  rickshawstartadded: false,
  rickshawendadded: false,
  rickshawlist: [],
  rickshawwaypointlist: [],
  currentrickshawcoords: [],


  selectedregion: {
    latitude: 24.8615,
    longitude: 67.0099,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421
  },
  livebuscoords: [],
  livetaxicoords: [],
  liverickshawcoords: [],

  place_bus_map: {},
  bus_num_dict: {},
  bus_placecount_dict: {},
  bus_route_dict: {},
  waypointcoords_dict: {},
  waypointnames_dict: {},

  bus_polyline_places: "",

  bus_route_coords: [],
  dest_walk_coords: [],
  origin_walk_coords: [],

  bus_stop_markers: []

};

const { width, height } = Dimensions.get("window");
const ASPECT_RATIO = width / height;

const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = ASPECT_RATIO * LATITUDE_DELTA;


export default (state = INITIAL_STATE, action) => {
  console.log(action);
  switch (action.type) {

    case 'LOGOUT':
      return { ...state, ...INITIAL_STATE, user: '' };

    case GET_LIVE_RICKSHAW_COORDS:
      return { ...state, liverickshawcoords: action.payload };

    case GET_LIVE_BUS_COORDS:

      return { ...state, livebuscoords: action.payload };

    case GET_LIVE_TAXI_COORDS:

      return { ...state, livetaxicoords: action.payload };

    case EMAIL_CHANGED:
      return { ...state, email: action.payload };

    case PASSWORD_CHANGED:
      return { ...state, password: action.payload };

    case LOGIN_USER:
      return { ...state, loading: true, error: '' };

    case LOGIN_USER_SUCCESS:
      return { ...state, user: action.payload };

    case SET_CURRENT_DRIVER_BUS:
      return { ...state, currentdriverbus: action.payload };

    case LOGIN_USER_FAIL:
      return { ...state, error: 'Authentication Failed.', password: '', loading: false };

    case GET_CURRENT_LOCATION:
      return {
        ...state, region: {
          latitude: Number(action.payload.coords.latitude),
          longitude: Number(action.payload.coords.longitude),
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA
        }
      };

    case GET_INPUT:
      const { key, value } = action.payload;
      return {
        ...state, inputData: {
          [key]: value
        }
      };

    case "GET_SEARCH_INPUT":
      return { ...state, searchinput: action.payload };

    case "GET_SELECTED_REGION":
      return {
        ...state, selectedregion: {
          latitude: action.payload.latitude,
          longitude: action.payload.longitude,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA
        }
      };

    case "RESET_MAP":
      return {
        ...state, selectedregion: {
          latitude: 24.8615,
          longitude: 67.0099,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421
        }
      };

    case TOGGLE_SEARCH_RESULT:
      if (action.payload === 'Source') {
        return {
          ...state, resultTypes: {
            Source: true,
            Destination: false
          },
          predictions: []

        };
      }
      if (action.payload === 'Destination') {
        return {
          ...state, resultTypes: {
            Source: false,
            Destination: true
          },
          predictions: []
        };
      }

    case GET_ADDRESS_PREDICTIONS:
      return { ...state, predictions: action.payload };


    case GET_SELECTED_ADDRESS:
      if (state.resultTypes.Source) {
        return {
          ...state, selectedSourceAddress: {
            selectedSource: action.payload
          },
          resultTypes: {
            Source: false,
            Destination: false
          }
        }

      }
      else {
        return {
          ...state, selectedDestinationAddress: {
            selectedDestination: action.payload
          },
          resultTypes: {
            Source: false,
            Destination: false
          }
        }
      }

    case GET_FARE:
      return { ...state, taxifare: action.payload }

    case GET_DIRECTION_POLYLINE:
      return { ...state, coords: action.payload, ETAG:action.ETAG };

    case "GET_DIRECTION_POLYLINE_2":
      return { ...state, coords2: action.payload }
    case GET_CHANGED_REGION:
      return {
        ...state, region: {
          latitude: Number(action.payload.lat),
          longitude: Number(action.payload.long),
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA
        }
      };

    case GET_MUSLIM_COORDS:
      return { ...state, muslimCoords: action.payload };
    case "START_POINT_ADDED":
      return { ...state, startadded: true }
    case "END_POINT_ADDED":
      return { ...state, endadded: true }

    case "CURRENT_BUS_COORDS":
      return { ...state, currentbuscoords: action.payload }
    case "GET_BUS_LIST":
      return { ...state, buslist: action.payload };
    case "GET_WAYPOINT_LIST":
      return { ...state, waypointlist: action.payload };
    case ADD_BUS_NAME:
      return { ...state, busname: action.payload };
    case "BUS_ADDED_SUCCESS":
      return { ...state, buserror: '', busadded: true };
    case "BUS_ADDED_FAILED":
      return { ...state, buserror: 'Error! Bus name already exists', busadded: false };
    case "RESET_ADD_BUS":
      return { ...state, busname: '', buserror: '', busadded: false, startadded: false, endadded: false };

    case "GET_RICKSHAW_COORDS":
      return { ...state, rickshawCoords: action.payload };
    case "RICKSHAW_START_POINT_ADDED":
      return { ...state, rickshawstartadded: true }
    case "RICKSHAW_END_POINT_ADDED":
      return { ...state, rickshawendadded: true }

    case "CURRENT_RICKSHAW_COORDS":
      return { ...state, currentrickshawcoords: action.payload }
    case "GET_RICKSHAW_LIST":
      return { ...state, rickshawlist: action.payload };
    case "GET_RICKSHAWWAYPOINT_LIST":
      return { ...state, rickshawwaypointlist: action.payload };
    case ADD_RICKSHAW_NAME:
      return { ...state, rickshawname: action.payload };
    case "RICKSHAW_ADDED_SUCCESS":
      return { ...state, rickshawerror: '', rickshawadded: true };
    case "RICKSHAW_ADDED_FAILED":
      return { ...state, rickshawerror: 'Error! Bus name already exists', rickshawadded: false };
    case "RESET_ADD_RICKSHAW":
      return { ...state, rickshawname: '', rickshawerror: '', rickshawadded: false, rickshawstartadded: false, rickshawendadded: false };


    case GET_DISTANCE_MATRIX:
      return { ...state, distancematrix: action.payload }

    case "PLACE_BUS_MAP":
      return {
        ...state, place_bus_map: action.busdict,
        bus_num_dict: action.bus_num_dict,
        bus_route_dict: action.bus_route_dict,
        waypointnames_dict: action.waypointnames_dict,
        waypointcoords_dict: action.waypointcoords_dict
      }

    case "PLACES_IDS_SEARCH_RESULTS":
      return { ...state, places_ids_result: action.payload }

    case "NEAREST_STOPS":
      return { ...state, nearest_stops: action.payload }

    case "BUS_ROUTE_DICT":
      return { ...state, bus_route_dict: action.payload }

    case "FINAL_BUS_POLYLINE_PLACES":
      return { ...state, bus_polyline_places: action.payload }

    case "GET_BUS_ROUTE_COORDS":
      return { ...state, bus_route_coords: action.payload, ETA:action.ETA }

    case "GET_DEST_WALK_COORDS":
      return { ...state, dest_walk_coords: action.payload }
    case "GET_ORIGIN_WALK_COORDS":
      return { ...state, origin_walk_coords: action.payload }

    case "BUS_STOP_MARKERS":
      return { ...state, bus_stop_markers: action.payload }

    default:
      return state;
  }
};
