import { AsyncStorage } from 'react-native';
import { generateRandomId } from '../utils/Utils';
import { createAsyncAction } from '../utils/ActionHelper';

import deckData from '../../../res/data/decks.json';

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
      .then((data) => {
        if (!data) {
          console.log(`There's no deck data in AsyncStorage. Initializing storage with local json values...`);
          const initialData = JSON.stringify(deckData);
          AsyncStorage.setItem(DECKS_STORAGE_KEY, initialData);
          return initialData;
        }

        return data;
      })
  );
}

export function addNewDeck (title) {
  const deck = {
    [title]: {
      title,
      questions: []
    }
  };

  return createAsyncAction(
    ADD_NEW_DECK,
    AsyncStorage.mergeItem(DECKS_STORAGE_KEY, JSON.stringify(deck)),
    { deck }
  );
}


export function addCardToDeck (deck, card) {
  const updatedDeck = {
    [deck.title]: {
      ...deck,
      questions: [
        ...deck.questions,
        card
      ]
    }
  };

  return createAsyncAction(
    ADD_CARD_TO_DECK,
    AsyncStorage.mergeItem(DECKS_STORAGE_KEY, JSON.stringify(updatedDeck)),
    { deck: updatedDeck, card }
  );
}
