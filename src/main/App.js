import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { StyleSheet, Text, View, Platform } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { TabNavigator, StackNavigator } from 'react-navigation';

import rootReducer from './reducers';
import DeckList from './components/DeckList';
import DeckForm from './components/DeckForm';
import DeckDetails from './components/DeckDetails';

import CustomStatusBar from './components/CustomStatusBar';
import { green, white } from './utils/Colors';

const store = createStore(
  rootReducer,
  applyMiddleware(thunk)
);


/* --- Tabs --- */
const tabItems = {
  DeckList: {
    screen: DeckList,
    navigationOptions: {
      tabBarLabel: 'Deck list',
      tabBarIcon: ({ tintColor }) => <MaterialCommunityIcons name='library-books' size={30} color={tintColor} />
    }
  },
  CreateDeck: {
    screen: DeckForm,
    navigationOptions: {
      tabBarLabel: 'Create deck',
      tabBarIcon: ({ tintColor }) => <MaterialCommunityIcons name='library-plus' size={30} color={tintColor} />
    }
  }
};

const tabSettings = {
  navigationOptions: {
    header: null
  },
  tabBarOptions: {
    style: {
      height: 56,
      backgroundColor: Platform.OS === 'ios' ? white : green,
      shadowRadius: 6,
      shadowOpacity: 1,
      shadowColor: 'rgba(0,0,0,0.24)',
      shadowOffset: {
        width: 0,
        height: 3
      }
    },
    activeTintColor: Platform.OS === 'ios' ? green : white
  }
};

const Tabs = TabNavigator(tabItems, tabSettings);

/* --- Stack --- */
const MainNavigator = StackNavigator({
  Home: {
    screen: Tabs
  },
  DeckDetails: {
    screen: DeckDetails,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: green
      }
    }
  }
});

export default class App extends React.Component {
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
