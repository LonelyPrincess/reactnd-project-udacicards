import React from 'react';
import { View } from 'react-native';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import rootReducer from './reducers';

import CustomStatusBar from './components/CustomStatusBar';
import MainNavigator from './navigators/MainNavigator';

import { setLocalNotification } from './utils/LocalNotifications';

const store = createStore(
  rootReducer,
  applyMiddleware(thunk)
);

export default class App extends React.Component {
  componentDidMount() {
    setLocalNotification();
  }

  render() {
    return (
      <Provider store={store}>
        <View style={{ flex: 1 }}>
          <CustomStatusBar />
          <MainNavigator />
        </View>
      </Provider>
    );
  }
}
