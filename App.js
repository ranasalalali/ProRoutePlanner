import React from 'react';
import {Provider} from 'react-redux';
import {createStore,applyMiddleware} from 'redux';
import firebase from 'firebase';
import ReduxThunk from 'redux-thunk';
import reducers from './src/reducers';
import Router from './src/Router';
import {View, Text, Root} from 'native-base';
class App extends React.Component{

  componentWillMount(){
    const config = {
      apiKey: 'AIzaSyA9y2zYhu5djo-0aSVvQEJN-ggdCQE2Ojk',
      authDomain: 'pro-route-planner.firebaseapp.com',
      databaseURL: 'https://pro-route-planner.firebaseio.com',
      projectId: 'pro-route-planner',
      storageBucket: 'pro-route-planner.appspot.com',
      messagingSenderId: '92599910914'
    };
    firebase.initializeApp(config);
  }
  render(){
    console.disableYellowBox = true;
    const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));
    return (
      <Provider store={store}>
        <Root>
          <Router/>
        </Root>
      </Provider>
    );
  }
}

export default App;
