import React from 'react';
import { connect } from 'react-redux';
import { View, StyleSheet } from 'react-native';
import { NavigationActions } from 'react-navigation';

import { addNewDeck } from '../actions';
import { displayToast } from '../utils/Utils';
import { white } from '../constants/Colors';

import Button from './Button';
import InfoMessage from './InfoMessage';
import CustomTextInput from './CustomTextInput';

class DeckForm extends React.Component {
  state = {
    title: ''
  };

  inputRef = {};

  submitDeck = () => {
    const { title } = this.state;

    // Validate title is not empty
    if (!title) {
      displayToast('You need to specify a name for the deck!');
      this.inputRef.title.focus();
      return;
    }

    // Check if there's already a deck with that name
    if (this.props.decks[title]) {
      displayToast('A deck with that name already exists!');
      this.inputRef.title.focus();
      return;
    }

    console.log(`Adding new deck ${title}`);
    this.props.actions.addNewDeck(title)
      .then(() => {
        this.setState({ title: '' });
        displayToast(`New deck ${title} created!`);

        // Redirect to deck details after creation
        // We also reset nav queue so it doesn't go back to create form after redirecting
        const resetAction = NavigationActions.reset({
          index: 1,
          actions: [
            NavigationActions.navigate({ routeName: 'Home' }),
            NavigationActions.navigate({ routeName: 'DeckDetails', params: { deckId: title }})
          ]
        });
        this.props.navigation.dispatch(resetAction);
      });
  };

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    backgroundColor: white
  }
});

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