import deckData from '../../../res/data/decks.json';

// TODO: initialize decks state from asyncStorage if possible
const initialState = deckData;

function decks (state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}

export default decks;