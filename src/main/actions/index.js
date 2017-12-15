
/* Action types */
export const FETCH_DECK_LIST = 'FETCH_DECK_LIST';
export const ADD_NEW_DECK = 'ADD_NEW_DECK';
export const ADD_CARD_TO_DECK = 'ADD_CARD_TO_DECK';

/* Action creators */
export function fetchDeckList (decks) {
  return {
    type: FETCH_DECK_LIST,
    decks
  };
};
