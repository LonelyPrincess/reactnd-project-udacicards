import React from 'react';
import { connect } from 'react-redux';
import { View, StyleSheet } from 'react-native';
import { NavigationActions } from 'react-navigation';

import Button from './Button';
import InfoMessage from './InfoMessage';
import CustomTextInput from './CustomTextInput';

import { addNewDeck } from '../actions';
import { white } from '../constants/Colors';
import { displayToast } from '../utils/Utils';

import * as SCREEN_KEYS from '../constants/Screens';

/**
 * Component that renders a form to create a new deck.
 *
 * @module components/DeckForm
 */
class DeckForm extends React.Component {

  state = {
    title: ''
  };

  // Object to store refs to directly access form inputs
  inputRef = {};

  /**
   * Check if form fields are correctly filled.
   * @return {boolean} - Returns 'false' if an error ocurred during validation.
   */
  validateDeck = () => {
    const { title } = this.state;

    // Validate that title is not empty
    if (!title) {
      displayToast(`You need to specify a name for the deck!`);
      this.inputRef.title.focus();
      return false;
    }

    // Check if there's already a deck with the specified name
    if (this.props.decks[title]) {
      displayToast(`A deck with that name already exists!`);
      this.inputRef.title.focus();
      return false;
    }

    return true;
  };

  /**
   * If form validation succeeds, add new deck to the list and redirect to a
   * screen with its details.
   */
  submitDeck = () => {

    if (!this.validateDeck()) {
      console.log(`Card form validation failed!`);
      return;
    }

    const { title } = this.state;

    this.props.actions.addNewDeck(title)
      .then(() => {
        this.setState({ title: '' });
        displayToast(`New deck ${title} created!`);

        // Redirect to deck details after creation
        // We also reset nav queue so it doesn't go back to create form after redirecting
        const resetAction = NavigationActions.reset({
          index: 1,
          actions: [
            NavigationActions.navigate({ routeName: SCREEN_KEYS.MAIN }),
            NavigationActions.navigate({ routeName: SCREEN_KEYS.DECK_DETAILS, params: { deckId: title }})
          ]
        });
        this.props.navigation.dispatch(resetAction);
      });
  };

  /**
   * Returns the view of the component.
   * @returns JSX template for the component.
   */
  render() {
    return (
      <View style={styles.container}>
        <View style={{ flexGrow: 1 }}>
          <InfoMessage>
            Introduce the name for your new deck.
          </InfoMessage>
          <CustomTextInput
            inputRef={(ref) => this.inputRef['title'] = ref}
            value={this.state.title} placeholder="Deck title"
            onChangeText={(title) => this.setState({ title })} />
        </View>
        <Button onPress={this.submitDeck}>Create deck</Button>
      </View>
    );
  }
}

/* --- Component styles ---------------------------------------------------- */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    backgroundColor: white
  }
});

/* --- Redux mapping methods ----------------------------------------------- */

function mapStateToProps (state) {
  return {
    decks: state
  };
}

function mapDispatchToProps (dispatch) {
  return {
    actions: {
      addNewDeck: (title) => dispatch(addNewDeck(title))
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DeckForm);