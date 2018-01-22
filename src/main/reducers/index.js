import {
  FETCH_DECK_LIST,
  ADD_NEW_DECK,
  ADD_CARD_TO_DECK
} from '../actions';

/**
 * Reducer for the deck list. It will manage an object in Redux store
 * with a list of decks. Depending on the dispatched action, it will
 * return a new state with the updated list.
 *
 * @param {object} state - Current Redux state.
 * @param {object} action - Dispatched action.
 *
 * @returns {object} New state for Redux store.
 */
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

export default decks;