import {
  FETCH_DECK_LIST
} from '../actions';

import deckData from '../../../res/data/decks.json';

function decks (state = {}, action) {
  switch (action.type) {
    case FETCH_DECK_LIST:
      if (!action.response) {
        console.warn(`There's no deck data in AsyncStorage. Initializing store from local json...`);
        return deckData;
      }

      return {
        ...action.response
      };
    default:
      return state;
  }
}

// TODO: include selected deck reducer?

export default decks;