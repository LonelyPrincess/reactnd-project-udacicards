import { StackNavigator } from 'react-navigation';

import HomeTabs from './HomeTabs';
import DeckDetails from '../components/DeckDetails';
import CardForm from '../components/CardForm';
import DeckQuiz from '../components/DeckQuiz';
import QuizResults from '../components/QuizResults';

import { green, white } from '../constants/Colors';
import * as SCREEN_KEYS from '../constants/Screens';

/**
 * Stack navigator to manage the navigation flow in the app.
 * @module/MainNavigator
 */

const defaultNavigationOptions = {
  headerTintColor: white,
  headerStyle: {
    backgroundColor: green
  }
};

const MainNavigator = StackNavigator({
  [SCREEN_KEYS.MAIN]: {
    screen: HomeTabs
  },
  [SCREEN_KEYS.DECK_DETAILS]: {
    screen: DeckDetails,
    navigationOptions: {
      ...defaultNavigationOptions,
      title: 'Deck details'
    }
  },
  [SCREEN_KEYS.CARD_FORM]: {
    screen: CardForm,
    navigationOptions: {
      ...defaultNavigationOptions,
      title: 'Add new card'
    }
  },
  [SCREEN_KEYS.QUIZ]: {
    screen: DeckQuiz,
    navigationOptions: {
      ...defaultNavigationOptions,
      title: 'Quiz'
    }
  },
  [SCREEN_KEYS.QUIZ_RESULTS]: {
    screen: QuizResults,
    navigationOptions: {
      ...defaultNavigationOptions,
      title: 'Quiz results',
    }
  }
});

export default MainNavigator;