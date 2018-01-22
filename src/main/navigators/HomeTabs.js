import { Platform } from 'react-native';
import { TabNavigator } from 'react-navigation';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import DeckList from '../components/DeckList';
import DeckForm from '../components/DeckForm';

import { green, white } from '../constants/Colors';
import * as SCREEN_KEYS from '../constants/Screens';

/* --- Tabs --- */
const tabItems = {
  [SCREEN_KEYS.DECK_LIST]: {
    screen: DeckList,
    navigationOptions: {
      tabBarLabel: 'Deck list',
      tabBarIcon: ({ tintColor }) => <MaterialCommunityIcons name='library-books' size={30} color={tintColor} />
    }
  },
  [SCREEN_KEYS.DECK_FORM]: {
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

const HomeTabs = TabNavigator(tabItems, tabSettings);

export default HomeTabs;