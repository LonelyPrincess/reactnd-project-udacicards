import {
  FETCH_DECK_LIST,
  ADD_NEW_DECK,
  ADD_CARD_TO_DECK
} from '../actions';

function decks (state = {}, action) {
  switch (action.type) {
    case FETCH_DECK_LIST:
      return JSON.parse(action.response);
    case ADD_NEW_DECK:
    case ADD_CARD_TO_DECK:
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