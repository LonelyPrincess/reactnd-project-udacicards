import {
  FETCH_DECK_LIST,
  ADD_NEW_DECK
} from '../actions';

import deckData from '../../../res/data/decks.json';

function decks (state = {}, action) {
  switch (action.type) {
    case FETCH_DECK_LIST:
      if (!action.response) {
        console.log(`There's no deck data in AsyncStorage. Initializing store from local json...`);
        return deckData;
      }

      return JSON.parse(action.response);
    case ADD_NEW_DECK:
      return {
        ...state,
        ...action.deck
      };
    default:
      return state;
  }
}

// TODO: include selected deck reducer?

export default decks;