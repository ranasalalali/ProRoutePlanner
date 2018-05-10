import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import RNGooglePlaces from 'react-native-google-places';
import request from '../util/request';
import Polyline from '@mapbox/polyline';
import RNPolyline from 'rn-maps-polyline'
import jsgraphs from 'js-graph-algorithms';
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
  GET_LIVE_TAXI_COORDS,
  GET_LIVE_RICKSHAW_COORDS,
  GET_DISTANCE_MATRIX,
  GET_FARE
} from './types';
import calculateFare from '../util/fairCalculator';


//LOGIN FORM

export const emailChanged = (text) => {
  return {
    type: EMAIL_CHANGED,
    payload: text
  };
};

export const passwordChanged = (text) => {
  return {
    type: PASSWORD_CHANGED,
    payload: text
  };
};


export const getLiveBusCoords = () => {
  return (dispatch) => {
    var Markers = new Array();
    firebase.database().ref("/busdrivers/").orderByKey()
      .once('value').then(function (snapshot) {
        snapshot.forEach(function (childSnapshot) {
          var busdriver = childSnapshot.key;
          firebase.database().ref("/busdrivers/" + busdriver)
            .once('value').then(function (snapshot) {
              var bus = snapshot.child("Bus").val();
              var latitude = snapshot.child("latitude").val();
              var longitude = snapshot.child("longitude").val();
              dic = { title: bus, coordinates: { latitude: latitude, longitude: longitude } }
              Markers.push(dic);
              //console.log(Markers);
            })
        });
      }).then(() => {
        dispatch({
          type: GET_LIVE_BUS_COORDS,
          payload: Markers
        })
      });
  }
}

export const getLiveRickshawCoords = () => {
  return (dispatch) => {
    var Markers = new Array();
    firebase.database().ref("/rickshawdrivers/").orderByKey()
      .once('value').then(function (snapshot) {
        snapshot.forEach(function (childSnapshot) {
          var rickshawdriver = childSnapshot.key;
          firebase.database().ref("/rickshawdrivers/" + rickshawdriver)
            .once('value').then(function (snapshot) {
              var Rickshaw = snapshot.child("Rickshaw").val();
              var latitude = snapshot.child("latitude").val();
              var longitude = snapshot.child("longitude").val();
              dic = { title: Rickshaw, coordinates: { latitude: latitude, longitude: longitude } }
              Markers.push(dic);
              // ////console.log(Markers);
            })
        });
      }).then(() => {
        dispatch({
          type: GET_LIVE_RICKSHAW_COORDS,
          payload: Markers
        })
      });
  }
}

export const getLiveTaxiCoords = () => {
  return (dispatch) => {
    var TaxiMarkers = new Array();
    firebase.database().ref("/taxidrivers/").orderByKey()
      .once('value').then(function (snapshot) {
        snapshot.forEach(function (childSnapshot) {
          var busdriver = childSnapshot.key;
          firebase.database().ref("/taxidrivers/" + busdriver)
            .once('value').then(function (snapshot) {
              var name = snapshot.child("Name").val();
              var number = snapshot.child("Phone").val();
              var latitude = snapshot.child("latitude").val();
              var longitude = snapshot.child("longitude").val();
              dict = { title: name, phone: number, coordinates: { latitude: latitude, longitude: longitude } }
              TaxiMarkers.push(dict);
              // ////console.log(Markers);
            })
        })
      }).then(() => {
        dispatch({
          type: GET_LIVE_TAXI_COORDS,
          payload: TaxiMarkers
        })
      });
  }
}

export const logoutUser = () => {
  return {
    type: 'LOGOUT'
  };
};

export const loginUser = ({ email, password }) => {
  return (dispatch) => {
    dispatch({ type: LOGIN_USER });
    if (email.includes(".") || email.includes("#") || email.includes("$") || email.includes("[") || email.includes("]")) {
      dispatch({ type: LOGIN_USER_FAIL })
    }
    else {
      var db = firebase.database();
      db.ref('users/')
        .once('value', function (snapshot) {
          if (snapshot.hasChild(email)) {
            db.ref("/users/" + email)
              .once('value').then(function (snapshot) {
                var pass = snapshot.child("password").val();
                if (pass !== password) {
                  dispatch({
                    type: LOGIN_USER_FAIL
                  })
                }
                else {
                  dispatch({
                    type: LOGIN_USER_SUCCESS,
                    payload: email
                  });
                  Actions.pop();
                  Actions.userhome();
                }
              })
          }
          else
            db.ref('busdrivers/')
              .once('value', function (snapshot) {
                if (snapshot.hasChild(email)) {
                  db.ref("/busdrivers/" + email)
                    .once('value').then(function (snapshot) {
                      var pass = snapshot.child("Password").val();
                      var busname = snapshot.child("Bus").val();
                      if (password !== pass) {
                        dispatch({
                          type: LOGIN_USER_FAIL
                        })
                      }
                      else {
                        db.ref('/buses/' + busname).once("value")
                          .then(function (snapshot) {
                            var startpoint = snapshot.child("Startpoint").val();
                            var endpoint = snapshot.child("Endpoint").val();
                            var waypoint = snapshot.child("Waypoint").val();
                            request.get("https://maps.googleapis.com/maps/api/directions/json")
                              .query({
                                origin: startpoint,
                                destination: endpoint,
                                waypoints: waypoint,
                                mode: "driving",
                                key: "AIzaSyBW0I2DCKuHU5ZsbDJM9aIe2O4WM-9StqQ"
                              })
                              .finish((error, res) => {
                                ////console.log(res);
                                let points = RNPolyline.decode(res.body.routes[0].overview_polyline.points);
                                let coords = points.map((point, index) => {
                                  return {
                                    latitude: point[1],
                                    longitude: point[0],
                                  }
                                });
                                dispatch({
                                  type: GET_MUSLIM_COORDS,
                                  payload: points
                                });
                              })
                          })
                        dispatch({
                          type: LOGIN_USER_SUCCESS,
                          payload: email
                        });
                        Actions.pop();
                        Actions.busdrivermain();
                      }
                    })
                }
                else
                  db.ref('taxidrivers/')
                    .once('value', function (snapshot) {
                      ////console.log("CheckTaxiDrivers");
                      if (snapshot.hasChild(email)) {
                        db.ref("/taxidrivers/" + email)
                          .once('value').then(function (snapshot) {
                            var pass = snapshot.child("Password").val();
                            if (pass !== password) {
                              dispatch({
                                type: LOGIN_USER_FAIL
                              })
                            }
                            else {
                              dispatch({
                                type: LOGIN_USER_SUCCESS,
                                payload: email
                              });
                              Actions.pop();
                              Actions.taxidrivermain();
                            }
                          })
                      }
                      else
                        db.ref('rickshawdrivers/')
                          .once('value', function (snapshot) {
                            ////console.log("CheckRickshawDrivers");
                            if (snapshot.hasChild(email)) {
                              db.ref("/rickshawdrivers/" + email)
                                .once('value').then(function (snapshot) {
                                  var pass = snapshot.child("Password").val();
                                  var rickshaw = snapshot.child("Rickshaw").val();
                                  if (pass !== password) {
                                    dispatch({
                                      type: LOGIN_USER_FAIL
                                    });
                                  }
                                  else {
                                    firebase.database().ref('/rickshaws/' + rickshaw).once("value")
                                      .then(function (snapshot) {
                                        ////console.log(snapshot.val());
                                        var startpoint = snapshot.child("Startpoint").val();
                                        var endpoint = snapshot.child("Endpoint").val();
                                        var waypoint = snapshot.child("Waypoint").val();
                                        request.get("https://maps.googleapis.com/maps/api/directions/json")
                                          .query({
                                            origin: startpoint,
                                            destination: endpoint,
                                            waypoints: waypoint,
                                            mode: "driving",
                                            key: "AIzaSyBW0I2DCKuHU5ZsbDJM9aIe2O4WM-9StqQ"
                                          })
                                          .finish((error, res) => {
                                            ////console.log(res);
                                            let points = RNPolyline.decode(res.body.routes[0].overview_polyline.points);
                                            let coords = points.map((point, index) => {
                                              return {
                                                latitude: point[1],
                                                longitude: point[0],
                                              }
                                            });
                                            dispatch({
                                              type: "GET_RICKSHAW_COORDS",
                                              payload: points
                                            });
                                          })
                                      })
                                    dispatch({
                                      type: LOGIN_USER_SUCCESS,
                                      payload: email
                                    });
                                    Actions.pop();
                                    Actions.rickshawdrivermain();
                                  }

                                })
                            }
                            else
                              db.ref('admins/')
                                .once('value', function (snapshot) {
                                  ////console.log("CheckAdmins");
                                  if (snapshot.hasChild(email)) {
                                    db.ref("/admins/" + email)
                                      .once('value').then(function (snapshot) {
                                        var pass = snapshot.child("password").val();
                                        if (pass !== password) {
                                          dispatch({
                                            type: LOGIN_USER_FAIL
                                          })
                                        }
                                        else {
                                          dispatch({
                                            type: LOGIN_USER_SUCCESS,
                                            payload: email
                                          });
                                          Actions.pop();
                                          Actions.adminmain();
                                        }
                                      })
                                  }
                                  else {
                                    loginUserFail(dispatch);
                                  }
                                })
                          })
                    })
              })
        })
    }

  };
};


const loginUserSuccess = (dispatch, user) => {
  dispatch({
    type: LOGIN_USER_SUCCESS,
    payload: user
  });
};

const loginUserFail = (dispatch) => {
  dispatch({ type: LOGIN_USER_FAIL });
};



//USERHOMEMAP

export const getCurrentLocation = () => {
  
  return (dispatch) => {
    dispatch({
      type:"LOADING_MAP"
    })
    navigator.geolocation.getCurrentPosition(
      (position) => {
        dispatch({
          type: GET_CURRENT_LOCATION,
          payload: position
        });
        dispatch({
          type:"LOADING_MAP_COMPLETE"
        })
      },
      (error) => console.log(error.message),
      { enableHighAccuracy: false, timeout: 300000, maximumAge: 0 }
    );
  }
};


export const getSearchPredictions = (val) => {
  return (dispatch) => {
    let userInput = val;
    RNGooglePlaces.getAutocompletePredictions(userInput, {
      latitude: 25.0700,
      longitude: 67.2848,
      radius: 30,
      country: 'PK',
      types: ["bus_station", "transit_station"]
    })
      .then((place) =>
        dispatch({
          type: GET_ADDRESS_PREDICTIONS,
          payload: place
        })
      )
      .catch((error) => console.log(error.message));
  };
}

export const getAddressPredictions = () => {
  return (dispatch, store) => {
    let userInput = store().auth.resultTypes.Source ? store().auth.inputData.Source : store().auth.inputData.Destination;
    RNGooglePlaces.getAutocompletePredictions(userInput, {
      latitude: 25.0700,
      longitude: 67.2848,
      radius: 30,
      country: 'PK',
      types: ["bus_station", "transit_station", "establishment"]
    })
      .then((place) =>
        dispatch({
          type: GET_ADDRESS_PREDICTIONS,
          payload: place
        })
      )
      .catch((error) => console.log(error.message));
  };
};

export const getInputData = (payload) => {
  return {
    type: GET_INPUT,
    payload: payload
  };
};

export const getSearchInput = (payload) => {
  return {
    type: "GET_SEARCH_INPUT",
    payload: payload
  }
}

export const toggleSearchResultModal = (payload) => {
  return {
    type: TOGGLE_SEARCH_RESULT,
    payload: payload
  };
};

export const getSelectedRegion = (payload) => {
  return (dispatch, store) => {
    RNGooglePlaces.lookUpPlaceByID(payload)
      .then((results) => {
        let reg = { latitude: results.latitude, longitude: results.longitude }
        dispatch({
          type: "GET_SELECTED_REGION",
          payload: reg
        })
      })
  }
}

export const resetMap = () => {
  return {
    type: "RESET_MAP"
  }
}




export const getSelectedAddress = (payload, current) => {
  const dummyNumbers = {
    baseFare: 0.4,
    timeRate: 0.14,
    distanceRate: 90,
    surge: 1
  }
  return (dispatch, store) => {
    RNGooglePlaces.lookUpPlaceByID(payload)
      .then((results) => {
        dispatch({
          type: GET_SELECTED_ADDRESS,
          payload: results
        })
      })
      .then(() => {
        dispatch({
          type:"LOADING_MAP"
        })
        if (store().auth.selectedSourceAddress.selectedSource && store().auth.selectedDestinationAddress.selectedDestination) {
          let origin = store().auth.selectedSourceAddress.selectedSource.latitude + "," + store().auth.selectedSourceAddress.selectedSource.longitude;
          let destination = store().auth.selectedDestinationAddress.selectedDestination.latitude + "," + store().auth.selectedDestinationAddress.selectedDestination.longitude;
          request.get("https://maps.googleapis.com/maps/api/directions/json")
            .query({
              origin: origin,
              destination: destination,
              mode: "driving",
              traffic_model: "optimistic",
              alternatives: true,
              departure_time: "now",
              key: "AIzaSyBW0I2DCKuHU5ZsbDJM9aIe2O4WM-9StqQ"
            })
            .finish((error, res) => {
              //console.log(res.body)
              let lat = store().auth.selectedSourceAddress.selectedSource.latitude;
              let long = store().auth.selectedSourceAddress.selectedSource.longitude;
              ////console.log(lat);
              var ETAG = 0
              res.body.routes[0].legs.forEach(function (key) {
                ETAG = ETAG + key.duration.value;
              })
              let points = RNPolyline.decode(res.body.routes[0].overview_polyline.points);
              let coords = points.map((point, index) => {
                return {
                  latitude: point[1],
                  longitude: point[0],
                }
              })
              if (res.body.routes.length > 0) {
                let pointsb = RNPolyline.decode(res.body.routes[0].overview_polyline.points);
                let coordsb = points.map((point, index) => {
                  return {
                    latitude: point[1],
                    longitude: point[0],
                  }
                })
                dispatch({
                  type: "GET_DIRECTION_POLYLINE_2",
                  payload: pointsb
                });
              }
              dispatch({
                type: GET_DIRECTION_POLYLINE,
                payload: points,
                ETAG: ETAG / 60 + 0.0
              });
              dispatch({
                type: GET_CHANGED_REGION,
                payload: { lat, long }
              });
              request.get("https://maps.googleapis.com/maps/api/distancematrix/json")
                .query({
                  origins: origin,
                  destinations: destination,
                  mode: "driving",
                  key: "AIzaSyCZqwfBEbHTwI0Zam7b86EK4Fb8JvckwRo"
                })
                .finish((error, res) => {
                  dispatch({
                    type: GET_DISTANCE_MATRIX,
                    payload: res.body

                  })
                  const fare = calculateFare(
                    dummyNumbers.baseFare,
                    dummyNumbers.timeRate,
                    store().auth.distancematrix.rows[0].elements[0].duration.value,
                    dummyNumbers.distanceRate,
                    store().auth.distancematrix.rows[0].elements[0].duration.value,
                    dummyNumbers.surge
                  );
                  dispatch({
                    type: GET_FARE,
                    payload: fare
                  })
                  //console.log("fare")
                  var origindist = 100000
                  var destdist = 100000
                  var originplace = ''
                  var destplace = ''
                  Object.keys(store().auth.place_bus_map).forEach(function (place) {
                    request.get("https://maps.googleapis.com/maps/api/distancematrix/json")
                      .query({
                        origins: "place_id:" + store().auth.selectedSourceAddress.selectedSource.placeID,
                        destinations: place,
                        mode: "walking",
                        key: "AIzaSyCZqwfBEbHTwI0Zam7b86EK4Fb8JvckwRo"
                      })
                      .finish((error, res) => {
                        if (res.body.rows[0].elements[0].distance.value <= origindist) {
                          //console.log("Origin")
                          origindist = res.body.rows[0].elements[0].distance.value
                          //console.log(origindist)
                          originplace = place
                          //console.log(originplace)
                        }
                        ////console.log(res.body)
                      })
                    request.get("https://maps.googleapis.com/maps/api/distancematrix/json")
                      .query({
                        origins: "place_id:" + store().auth.selectedDestinationAddress.selectedDestination.placeID,
                        destinations: place,
                        mode: "walking",
                        key: "AIzaSyCZqwfBEbHTwI0Zam7b86EK4Fb8JvckwRo"
                      })
                      .finish((error, res) => {
                        if (res.body.rows[0].elements[0].distance.value <= destdist) {
                          //console.log("Destination")
                          destdist = res.body.rows[0].elements[0].distance.value
                          //console.log(destdist)
                          destplace = place
                          //console.log(destplace)
                        }
                        ////console.log(res.body)
                      })
                  })
                  setTimeout(() => {
                    //console.log("Dispatching")
                    dispatch({
                      type: "NEAREST_STOPS",
                      payload: { originplace, destplace }
                    })
                    //console.log("BFS RUNNING")
                    //g.bfs(originplace);
                    var waypoint = g.bfs(originplace, destplace);

                    dispatch({
                      type: "BUS_MAP_ROUTE",
                      payload: waypoint
                    })

                    setTimeout(() => {

                      Markers = new Array();
                      waypoint_list = waypoint.split("|");
                      var buses_list = []
                      waypoint_list.forEach(function (place) {
                        var placename = store().auth.waypointnames_dict[place]
                        var place_coord = store().auth.waypointcoords_dict[place]
                        store().auth.place_bus_map[place].forEach(function (bus) {
                          if (bus in buses_list) {
                            buses_list.push(bus)
                          }
                          else {

                          }
                        })
                        buses_list = store().auth.place_bus_map[place]
                        var buses = store().auth.place_bus_map[place].join(", ")
                        var latlong = place_coord.split(",")
                        var latitude = parseFloat(latlong[0])
                        var longitude = parseFloat(latlong[1])
                        dic = { title: placename, desc: buses, coordinates: { latitude: latitude, longitude: longitude } }
                        Markers.push(dic);
                      })

                      dispatch({
                        type: "BUS_STOP_MARKERS",
                        payload: Markers
                      })

                      request.get("https://maps.googleapis.com/maps/api/directions/json")
                        .query({
                          origin: destplace,
                          destination: originplace,
                          waypoints: waypoint,
                          traffic_model: "pessimistic",
                          departure_time: "now",
                          mode: "driving",
                          key: "AIzaSyBW0I2DCKuHU5ZsbDJM9aIe2O4WM-9StqQ"
                        })
                        .finish((error, res) => {
                          var ETA = 0
                          res.body.routes[0].legs.forEach(function (key) {
                            ETA = ETA + key.duration.value;
                          })
                          //console.log("ETA: ", ETA)
                          //console.log(res.body)
                          let lat = store().auth.selectedSourceAddress.selectedSource.latitude;
                          let long = store().auth.selectedSourceAddress.selectedSource.longitude;
                          ////console.log(lat);
                          let points = RNPolyline.decode(res.body.routes[0].overview_polyline.points);
                          let coords = points.map((point, index) => {
                            return {
                              latitude: point[1],
                              longitude: point[0],
                            }
                          })
                          dispatch({
                            type: "GET_BUS_ROUTE_COORDS",
                            payload: points,
                            ETA: ETA / 60 + 0.0
                          });
                        })
                      request.get("https://maps.googleapis.com/maps/api/directions/json")
                        .query({
                          origin: destplace,
                          destination: destination,
                          mode: "walking",
                          key: "AIzaSyBW0I2DCKuHU5ZsbDJM9aIe2O4WM-9StqQ"
                        })
                        .finish((error, res) => {
                          //console.log(res.body)
                          let lat = store().auth.selectedSourceAddress.selectedSource.latitude;
                          let long = store().auth.selectedSourceAddress.selectedSource.longitude;
                          ////console.log(lat);
                          let points = RNPolyline.decode(res.body.routes[0].overview_polyline.points);
                          let coords = points.map((point, index) => {
                            return {
                              latitude: point[1],
                              longitude: point[0],
                            }
                          })
                          dispatch({
                            type: "GET_DEST_WALK_COORDS",
                            payload: points
                          });
                        })
                      request.get("https://maps.googleapis.com/maps/api/directions/json")
                        .query({
                          origin: origin,
                          destination: originplace,
                          mode: "walking",
                          key: "AIzaSyBW0I2DCKuHU5ZsbDJM9aIe2O4WM-9StqQ"
                        })
                        .finish((error, res) => {
                          //console.log(res.body)
                          let lat = store().auth.selectedSourceAddress.selectedSource.latitude;
                          let long = store().auth.selectedSourceAddress.selectedSource.longitude;
                          ////console.log(lat);
                          let points = RNPolyline.decode(res.body.routes[0].overview_polyline.points);
                          let coords = points.map((point, index) => {
                            return {
                              latitude: point[1],
                              longitude: point[0],
                            }
                          })
                          dispatch({
                            type: "GET_ORIGIN_WALK_COORDS",
                            payload: points
                          });
                          dispatch({
                            type:"LOADING_MAP_COMPLETE"
                          })
                        })
                    }, 2000)
                  }, 8000)
                })
            })

        }
      })
  }
}

var g

export const buildGraph = () => {
  return (dispatch, store) => {
    g = new Graph(Object.keys(store().auth.bus_num_dict).length);
    var vertices = Object.keys(store().auth.bus_num_dict);
    var dict = store().auth.bus_route_dict
    // adding vertices
    for (var i = 0; i < vertices.length; i++) {
      g.addVertex(vertices[i]);
    }
    //console.log(vertices)
    //console.log(dict)
    // adding edges
    Object.keys(dict).forEach(function (key, idx) {
      for (i = 0; i < dict[key].length; i++) {
        if (i !== dict[key].length - 1) {
          g.addEdge(dict[key][i], dict[key][i + 1])
        }
      }
    });

    g.printGraph();

  }
}

import queueFactory from 'react-native-queue';

class Queue {


  constructor() {
    this.List = []
  }

  enqueue(vertex) {
    this.List.push(vertex)
  }

  dequeue(vertex) {
    this.List.shift(vertex)
  }



}

class Graph {
  // defining vertex array and
  // adjacent list
  constructor(noOfVertices) {
    this.noOfVertices = noOfVertices;
    this.AdjList = new Map();
  }

  // functions to be implemented

  addVertex(v) {
    // initialize the adjacent list with a
    // null array
    this.AdjList.set(v, []);
  }
  addEdge(v, w) {
    // get the list for vertex v and put the
    // vertex w denoting edge betweeen v and w
    if (this.AdjList.get(w).indexOf(v) === -1) this.AdjList.get(w).push(v);
    if (this.AdjList.get(v).indexOf(w) === -1) this.AdjList.get(v).push(w);


    // request.get("https://maps.googleapis.com/maps/api/distancematrix/json")
    //   .query({
    //     origins: v,
    //     destinations: w,
    //     mode: "driving",
    //     key: "AIzaSyCZqwfBEbHTwI0Zam7b86EK4Fb8JvckwRo"
    //   })
    //   .finish((error, res) => {

    //     distance = res.body.rows[0].elements[0].distance.value
    //     this.AdjList.get(v).push({
    //       vertex: w,
    //       weight: distance
    //     });
    //     this.AdjList.get(w).push({
    //       vertex: v,
    //       weight: distance
    //     });
    //   })
    // Since graph is undirected,
    // add an edge from w to w also

  }
  printGraph() {
    var get_keys = this.AdjList.keys();

    for (var i of get_keys) {
      var get_values = this.AdjList.get(i);
      var conc = "";
      for (var j of get_values)
        //conc += j["vertex"] + " " + j["weight"];
        conc += j + " "
      //console.log(i + " -> " + conc);
    }
  }
  bfs(startingNode, endingNode) {
    // create a visited array
    //console.log("entered")
    var visited = [];
    var prev = {}
    Object.keys(this.AdjList).forEach(function (i) {
      visited[i] = false;
      prev[i] = null
    })
    // Create an object for queue
    var q = [];

    // add the starting node to the queue
    visited[startingNode] = true;
    q.push(startingNode);

    // loop until queue is element
    while (q.length !== 0) {
      // get the element from the queue
      //console.log(q.length)
      var getQueueElement = q.shift();

      // passing the current vertex to callback funtion

      // get the adjacent list for current vertex
      var get_List = this.AdjList.get(getQueueElement);

      // loop through the list and add the elemnet to the
      // queue if it is not processed yet
      for (var i in get_List) {
        //var neigh = get_List[i]["vertex"];
        var neigh = get_List[i];
        if (!visited[neigh]) {
          visited[neigh] = true;
          prev[neigh] = getQueueElement;
          q.push(neigh);
        }
      }
    }

    var waypoint = endingNode
    //console.log("Starting Path")
    previous = prev[endingNode]
    waypoint = waypoint + "|" + previous
    while (previous !== startingNode) {
      //console.log(previous)
      previous = prev[previous]
      waypoint = waypoint + "|" + previous
    }
    if (previous === startingNode) {
      //console.log(startingNode)
    }
    //console.log("Ending Path")
    //console.log("returning")
    return waypoint;
  }

  // bfs(v)
  // dfs(v)
}


var bus_route_dict = new Object();
var buseslist = [];
var busdict = new Object();
var bus_num_dict = new Object();
var spoint = "";
var epoint = "";
var waypoints = "";
var placeslist = [];
var waypointnames_dict = new Object();
var waypointcoords_dict = new Object();

export const buildBusMap = () => {
  return (dispatch, store) => {
    var count = 0
    firebase.database().ref("/buses/").orderByKey()
      .once('value').then(function (snapshot) {
        snapshot.forEach(function (childSnapshot) {
          var bus = childSnapshot.key;
          bus_route_dict[bus] = []
          firebase.database().ref("/buses/" + bus)
            .once('value').then(function (snapshot) {
              spoint = snapshot.child("Startpoint").val()
              epoint = snapshot.child("Endpoint").val()
              spointname = snapshot.child("Startplace").val()
              epointname = snapshot.child("Endplace").val()
              startcoord = snapshot.child("Startlatlong").val()
              endcoord = snapshot.child("Endlatlong").val()
              if (spoint in busdict === true) {
                busdict[spoint].push(bus)
                bus_route_dict[bus].push(spoint)
              }
              else {
                bus_num_dict[spoint] = count
                count = count + 1
                busdict[spoint] = []
                waypointnames_dict[spoint] = spointname
                waypointcoords_dict[spoint] = startcoord
                bus_route_dict[bus].push(spoint)
                busdict[spoint].push(bus)
              }
              waypoints = snapshot.child("Waypoint").val();
              placeslist = waypoints.split("|")
              waypointnames = snapshot.child("Places").val();
              waypointnames_list = waypointnames.split("||")
              waypointlatlong = snapshot.child("Waypointlatlong").val()
              waypointlatlong_list = waypointlatlong.split("||")
              var tempcount = 0
              placeslist.forEach(function (place) {
                if (place in busdict === true) {
                  busdict[place].push(bus)
                  bus_route_dict[bus].push(place)
                  waypointnames_dict[place] = waypointnames_list[tempcount]
                  waypointcoords_dict[place] = waypointlatlong_list[tempcount]
                  tempcount = tempcount + 1
                }
                else {
                  waypointcoords_dict[place] = waypointlatlong_list[tempcount]
                  waypointnames_dict[place] = waypointnames_list[tempcount]
                  tempcount = tempcount + 1
                  bus_num_dict[place] = count
                  count = count + 1
                  busdict[place] = []
                  busdict[place].push(bus)
                  bus_route_dict[bus].push(place)
                }
              })
              if (epoint in busdict === true) {
                busdict[epoint].push(bus)
                bus_route_dict[bus].push(epoint)
              }
              else {
                waypointnames_dict[spoint] = spointname
                waypointcoords_dict[spoint] = startcoord
                bus_num_dict[epoint] = count
                count = count + 1
                busdict[epoint] = []
                busdict[epoint].push(bus)
                bus_route_dict[bus].push(epoint)
              }
            })
        });
      }).then(() => {
        dispatch({
          type: "PLACE_BUS_MAP",
          busdict: busdict,
          bus_num_dict: bus_num_dict,
          bus_route_dict: bus_route_dict,
          waypointcoords_dict: waypointcoords_dict,
          waypointnames_dict: waypointnames_dict
        })

        firebase.database().ref("/rickshaws/").orderByKey()
          .once('value').then(function (snapshot) {
            snapshot.forEach(function (childSnapshot) {
              var rickshaw = childSnapshot.key;
              bus_route_dict[rickshaw] = []
              firebase.database().ref("/rickshaws/" + rickshaw)
                .once('value').then(function (snapshot) {
                  spoint = snapshot.child("Startpoint").val()
                  epoint = snapshot.child("Endpoint").val()
                  spointname = snapshot.child("Startplace").val()
                  epointname = snapshot.child("Endplace").val()
                  startcoord = snapshot.child("Startlatlong").val()
                  endcoord = snapshot.child("Endlatlong").val()
                  if (spoint in busdict === true) {
                    busdict[spoint].push(rickshaw)
                    bus_route_dict[rickshaw].push(spoint)
                  }
                  else {
                    bus_num_dict[spoint] = count
                    count = count + 1
                    busdict[spoint] = []
                    waypointnames_dict[spoint] = spointname
                    waypointcoords_dict[spoint] = startcoord
                    bus_route_dict[rickshaw].push(spoint)
                    busdict[spoint].push(rickshaw)
                  }
                  waypoints = snapshot.child("Waypoint").val();
                  placeslist = waypoints.split("|")
                  waypointnames = snapshot.child("Places").val();
                  waypointnames_list = waypointnames.split("||")
                  waypointlatlong = snapshot.child("Waypointlatlong").val()
                  waypointlatlong_list = waypointlatlong.split("||")
                  var tempcount = 0
                  placeslist.forEach(function (place) {
                    if (place in busdict === true) {
                      busdict[place].push(rickshaw)
                      bus_route_dict[rickshaw].push(place)
                      waypointnames_dict[place] = waypointnames_list[tempcount]
                      waypointcoords_dict[place] = waypointlatlong_list[tempcount]
                      tempcount = tempcount + 1
                    }
                    else {
                      waypointcoords_dict[place] = waypointlatlong_list[tempcount]
                      waypointnames_dict[place] = waypointnames_list[tempcount]
                      tempcount = tempcount + 1
                      bus_num_dict[place] = count
                      count = count + 1
                      busdict[place] = []
                      busdict[place].push(rickshaw)
                      bus_route_dict[rickshaw].push(place)
                    }
                  })
                  if (epoint in busdict === true) {
                    busdict[epoint].push(rickshaw)
                    bus_route_dict[rickshaw].push(epoint)
                  }
                  else {
                    waypointnames_dict[spoint] = spointname
                    waypointcoords_dict[spoint] = startcoord
                    bus_num_dict[epoint] = count
                    count = count + 1
                    busdict[epoint] = []
                    busdict[epoint].push(rickshaw)
                    bus_route_dict[rickshaw].push(epoint)
                  }
                })
            });
          }).then(() => {
            dispatch({
              type: "PLACE_BUS_MAP",
              busdict: busdict,
              bus_num_dict: bus_num_dict,
              bus_route_dict: bus_route_dict,
              waypointcoords_dict: waypointcoords_dict,
              waypointnames_dict: waypointnames_dict
            })
          })
      })

  }
}


const SetBusRouteForUser = (busname) => {
  return (dispatch, store) => {
    firebase.database().ref('/buses/' + busname).once("value")
      .then(function (snapshot) {
        //console.log(snapshot.val());
        var startpoint = snapshot.child("Startpoint").val();
        var endpoint = snapshot.child("Endpoint").val();
        var waypoint = snapshot.child("Waypoint").val();
        request.get("https://maps.googleapis.com/maps/api/directions/json")
          .query({
            origin: startpoint,
            destination: endpoint,
            waypoints: waypoint,
            mode: "driving",
            key: "AIzaSyBW0I2DCKuHU5ZsbDJM9aIe2O4WM-9StqQ"
          })
          .finish((error, res) => {
            //console.log(res);
            let points = RNPolyline.decode(res.body.routes[0].overview_polyline.points);
            let coords = points.map((point, index) => {
              return {
                latitude: point[1],
                longitude: point[0],
              }
            });
            dispatch({
              type: GET_MUSLIM_COORDS,
              payload: points
            });
            Actions.busdrivermain();
          })
      })
  };
};

export const GetBusRoute = (busname) => {
  return (dispatch, store) => {
    firebase.database().ref('/buses/' + busname).once("value")
      .then(function (snapshot) {
        //console.log(snapshot.val());
        var startpoint = snapshot.child("Startpoint").val();
        var endpoint = snapshot.child("Endpoint").val();
        var waypoint = snapshot.child("Waypoint").val();
        request.get("https://maps.googleapis.com/maps/api/directions/json")
          .query({
            origin: startpoint,
            destination: endpoint,
            waypoints: waypoint,
            mode: "driving",
            key: "AIzaSyBW0I2DCKuHU5ZsbDJM9aIe2O4WM-9StqQ"
          })
          .finish((error, res) => {
            //console.log(res);
            let points = RNPolyline.decode(res.body.routes[0].overview_polyline.points);
            let coords = points.map((point, index) => {
              return {
                latitude: point[1],
                longitude: point[0],
              }
            });
            dispatch({
              type: GET_MUSLIM_COORDS,
              payload: points
            });
          })
      })
  };
};



export const GetRickshawRoute = (rickshawname) => {
  return (dispatch, store) => {
    firebase.database().ref('/rickshaws/' + rickshawname).once("value")
      .then(function (snapshot) {
        //console.log(snapshot.val());
        var startpoint = snapshot.child("Startpoint").val();
        var endpoint = snapshot.child("Endpoint").val();
        var waypoint = snapshot.child("Waypoint").val();
        request.get("https://maps.googleapis.com/maps/api/directions/json")
          .query({
            origin: startpoint,
            destination: endpoint,
            waypoints: waypoint,
            mode: "driving",
            key: "AIzaSyBW0I2DCKuHU5ZsbDJM9aIe2O4WM-9StqQ"
          })
          .finish((error, res) => {
            //console.log(res);
            let points = RNPolyline.decode(res.body.routes[0].overview_polyline.points);
            let coords = points.map((point, index) => {
              return {
                latitude: point[1],
                longitude: point[0],
              }
            });
            dispatch({
              type: "GET_RICKSHAW_COORDS",
              payload: points
            });
          })
      })
  };
};




//BUSES Add

export const BusInput = (text) => {
  return {
    type: ADD_BUS_NAME,
    payload: text
  };
};

export const resetAddBus = () => {
  return {
    type: "RESET_ADD_BUS"
  };
};

export const AddNewBus = (name) => {
  let check = false;
  return (dispatch) => {
    let busname = name;
    if (busname === "") {
      dispatch({
        type: "BUS_ADDED_FAILED"
      })
    }
    else {
      firebase.database().ref('buses/')
        .once('value', function (snapshot) {
          if (!snapshot.hasChild(busname)) {
            firebase.database().ref('buses/' + busname + '/waypoints/')
            dispatch({
              type: "BUS_ADDED_SUCCESS"
            })
            Actions.startpointmap();
          }
          else {
            dispatch({
              type: "BUS_ADDED_FAILED"
            })
          }
        });
    }

  }


};

export const addBusStartPoint = (placeid) => {

  return (dispatch, store) => {
    let placename = ''
    let latlong = ''
    var busname = store().auth.busname;
    var waypoint = "place_id:" + placeid;
    RNGooglePlaces.lookUpPlaceByID(placeid)
      .then((results) => {
        placename = results.name;
        latlong = results.latitude + "," + results.longitude;
        firebase.database().ref('/buses/' + busname).update({ Startpoint: waypoint, Startlatlong: latlong, Startplace: placename });
        Actions.endpointmap();
        dispatch({
          type: "START_POINT_ADDED"
        })
      })

  }
}

export const addBusEndPoint = (placeid) => {

  return (dispatch, store) => {
    let placename = ''
    let latlong = ''
    var busname = store().auth.busname;
    var waypoint = "place_id:" + placeid;
    RNGooglePlaces.lookUpPlaceByID(placeid)
      .then((results) => {
        placename = results.name;
        latlong = results.latitude + "," + results.longitude;
        firebase.database().ref('/buses/' + busname).update({ Endpoint: waypoint, Endlatlong: latlong, Endplace: placename });
        Actions.addbus();
        dispatch({
          type: "END_POINT_ADDED"
        })
      })

  }
}


export const getcurrentbuscoords = () => {
  return (dispatch, store) => {
    var busname = store().auth.busname;
    //console.log(busname);
    firebase.database().ref('/buses/' + busname).once("value")
      .then(function (snapshot) {
        //console.log(snapshot.val());
        var startpoint = snapshot.child("Startpoint").val();
        var endpoint = snapshot.child("Endpoint").val();
        var waypoint = snapshot.child("Waypoint").val();
        request.get("https://maps.googleapis.com/maps/api/directions/json")
          .query({
            origin: startpoint,
            destination: endpoint,
            waypoints: waypoint,
            mode: "driving",
            key: "AIzaSyBW0I2DCKuHU5ZsbDJM9aIe2O4WM-9StqQ"
          })
          .finish((error, res) => {
            //console.log(res);
            let points = RNPolyline.decode(res.body.routes[0].overview_polyline.points);
            let coords = points.map((point, index) => {
              return {
                latitude: point[1],
                longitude: point[0],
              }
            });
            dispatch({
              type: "CURRENT_BUS_COORDS",
              payload: points
            });
          })
      })

  }
}


export const addBusWayPoint = (placeid) => {
  return (dispatch, store) => {
    let placename = '';
    RNGooglePlaces.lookUpPlaceByID(placeid)
      .then((results) => {
        placename = results.name;
        latlong = results.latitude + "," + results.longitude
      })
    var busname = store().auth.busname;
    var waypoint = "place_id:" + placeid;
    firebase.database().ref('buses/' + busname)
      .once('value', function (snapshot) {
        if (!snapshot.hasChild("Waypoint")) {
          firebase.database().ref('/buses/' + busname).update({ Waypoint: waypoint, Places: placename, Waypointlatlong: latlong })
          Actions.buswaypoints();
        }
        else {
          firebase.database().ref('/buses/' + busname).once("value")
            .then(function (snapshot) {
              //console.log(snapshot.val());
              var waypoint = snapshot.child("Waypoint").val();
              var places = snapshot.child("Places").val();
              var waypointlatlong = snapshot.child("Waypointlatlong").val();
              places = places + " || " + placename;
              waypoint = waypoint + "|place_id:" + placeid;
              waypointlatlong = waypointlatlong + "||" + latlong;
              firebase.database().ref('/buses/' + busname).update({ Waypoint: waypoint, Places: places, Waypointlatlong: waypointlatlong })
              Actions.buswaypoints();
            });
        }
      });
  }
};



export const getBusList = () => {
  return (dispatch) => {
    const list = [];
    firebase.database().ref("buses").orderByKey()
      .once('value').then(function (snapshot) {
        snapshot.forEach(function (childSnapshot) {
          list.push(childSnapshot.key)
        });
      }).then(() => {
        dispatch({
          type: "GET_BUS_LIST",
          payload: list
        })
      })

  }
};

export const getWaypointList = () => {
  return (dispatch, store) => {
    var list = [];
    var busname = store().auth.busname;
    firebase.database().ref("/buses/" + busname)
      .once('value').then(function (snapshot) {
        var places = snapshot.child("Places").val();

        let list = places.split("||");
        dispatch({
          type: "GET_WAYPOINT_LIST",
          payload: list
        })
      })

  }
}


// Rickshaw Add

export const RickshawInput = (text) => {
  return {
    type: ADD_RICKSHAW_NAME,
    payload: text
  };
};

export const resetAddRickshaw = () => {
  return {
    type: "RESET_ADD_RICKSHAW"
  };
};

export const AddNewRickshaw = (name) => {
  //console.log(name);
  let check = false;
  return (dispatch) => {
    if (name === "") {
      dispatch({
        type: "RICKSHAW_ADDED_FAILED"
      })
    }
    else {
      firebase.database().ref('rickshaws/')
        .once('value', function (snapshot) {
          if (!snapshot.hasChild(name)) {
            firebase.database().ref('rickshaws/' + name + '/waypoints/')
            dispatch({
              type: "RICKSHAW_ADDED_SUCCESS"
            })
            Actions.rickshawstartpointmap();
          }
          else {
            dispatch({
              type: "RICKSHAW_ADDED_FAILED"
            })
          }
        });
    }

  }


};

export const addRickshawStartPoint = (placeid) => {
  return (dispatch, store) => {
    let placename = ''
    let latlong = ''
    var rickshawname = store().auth.rickshawname;
    var waypoint = "place_id:" + placeid;
    RNGooglePlaces.lookUpPlaceByID(placeid)
      .then((results) => {
        placename = results.name;
        latlong = results.latitude + "," + results.longitude;
        firebase.database().ref('/rickshaws/' + rickshawname).update({ Startpoint: waypoint, Startlatlong: latlong, Startplace: placename });
        Actions.rickshawendpointmap();
        dispatch({
          type: "RICKHSAW_START_POINT_ADDED"
        })
      })
  }
}

export const addRickshawEndPoint = (placeid) => {
  return (dispatch, store) => {
    let placename = ''
    let latlong = ''
    var rickshawname = store().auth.rickshawname;
    var waypoint = "place_id:" + placeid;
    RNGooglePlaces.lookUpPlaceByID(placeid)
      .then((results) => {
        placename = results.name;
        latlong = results.latitude + "," + results.longitude;
        firebase.database().ref('/rickshaws/' + rickshawname).update({ Endpoint: waypoint, Endlatlong: latlong, Endplace: placename });
        Actions.addrickshaw();
        dispatch({
          type: "RICKSHAW_END_POINT_ADDED"
        })
      })
  }
}


export const getcurrentrickshawcoords = () => {
  return (dispatch, store) => {
    var rickshawname = store().auth.rickshawname;
    //console.log(rickshawname);
    firebase.database().ref('/rickshaws/' + rickshawname).once("value")
      .then(function (snapshot) {
        //console.log(snapshot.val());
        var startpoint = snapshot.child("Startpoint").val();
        var endpoint = snapshot.child("Endpoint").val();
        var waypoint = snapshot.child("Waypoint").val();
        request.get("https://maps.googleapis.com/maps/api/directions/json")
          .query({
            origin: startpoint,
            destination: endpoint,
            waypoints: waypoint,
            mode: "driving",
            key: "AIzaSyBW0I2DCKuHU5ZsbDJM9aIe2O4WM-9StqQ"
          })
          .finish((error, res) => {
            //console.log(res);
            let points = RNPolyline.decode(res.body.routes[0].overview_polyline.points);
            let coords = points.map((point, index) => {
              return {
                latitude: point[1],
                longitude: point[0],
              }
            });
            dispatch({
              type: "CURRENT_RICKSHAW_COORDS",
              payload: points
            });
          })
      })

  }
}


export const addRickshawWayPoint = (placeid) => {
  return (dispatch, store) => {
    let placename = '';
    RNGooglePlaces.lookUpPlaceByID(placeid)
      .then((results) => {
        placename = results.name;
        latlong = results.latitude + "," + results.longitude
      })
    var rickshawname = store().auth.rickshawname;
    var waypoint = "place_id:" + placeid;
    firebase.database().ref('rickshaws/' + rickshawname)
      .once('value', function (snapshot) {
        if (!snapshot.hasChild("Waypoint")) {
          firebase.database().ref('/rickshaws/' + rickshawname).update({ Waypoint: waypoint, Places: placename, Waypointlatlong: latlong })
          Actions.rickshawwaypoints();
        }
        else {
          firebase.database().ref('/rickshaws/' + rickshawname).once("value")
            .then(function (snapshot) {
              //console.log(snapshot.val());
              var waypoint = snapshot.child("Waypoint").val();
              var places = snapshot.child("Places").val();
              var waypointlatlong = snapshot.child("Waypointlatlong").val();
              places = places + " || " + placename;
              waypoint = waypoint + "|place_id:" + placeid;
              waypointlatlong = waypointlatlong + "||" + latlong;
              firebase.database().ref('/rickshaws/' + rickshawname).update({ Waypoint: waypoint, Places: places, Waypointlatlong: waypointlatlong })
              Actions.rickshawwaypoints();
            });
        }
      });
  }
};



export const getRickshawList = () => {
  return (dispatch) => {
    const list = [];
    firebase.database().ref("rickshaws").orderByKey()
      .once('value').then(function (snapshot) {
        snapshot.forEach(function (childSnapshot) {
          list.push(childSnapshot.key)
        });
      }).then(() => {
        dispatch({
          type: "GET_RICKSHAW_LIST",
          payload: list
        })
      })

  }
};

export const getRickshawWaypointList = () => {
  return (dispatch, store) => {
    var list = [];
    var rickshawname = store().auth.rickshawname;
    firebase.database().ref("/rickshaws/" + rickshawname)
      .once('value').then(function (snapshot) {
        var places = snapshot.child("Places").val();
        let list = places.split("||");
        dispatch({
          type: "GET_RICKSHAWWAYPOINT_LIST",
          payload: list
        })
      })

  }
}


