import { AsyncStorage } from 'react-native';
import { createAsyncAction } from '../utils/ActionHelper';

// Key for deck data in AsyncStorage
const DECKS_STORAGE_KEY = 'UdaciCards::DeckList';

/* --- Action types --- */
export const FETCH_DECK_LIST = 'FETCH_DECK_LIST';
export const ADD_NEW_DECK = 'ADD_NEW_DECK';
export const ADD_CARD_TO_DECK = 'ADD_CARD_TO_DECK';
export const UPDATE_LAST_QUIZ_DATE = 'UPDATE_LAST_QUIZ_DATE';

/* --- Action creators --- */
export function fetchDeckList () {
  return createAsyncAction(
    FETCH_DECK_LIST,
    AsyncStorage.getItem(DECKS_STORAGE_KEY)
  );
};
