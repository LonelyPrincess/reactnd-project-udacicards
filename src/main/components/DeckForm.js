import React from 'react';
import { connect } from 'react-redux';
import { View, Text, TextInput, StyleSheet } from 'react-native';

import { addNewDeck } from '../actions';
import { displayToast } from '../utils/Utils';
import Button from './Button';

class DeckForm extends React.Component {
  state = {
    title: ''
  };

  submitDeck = () => {
    const { title } = this.state;

    // Validate title is not empty
    if (!title) {
      displayToast('You need to specify a name for the deck!');
      return;
    }

    // Check if there's already a deck with that name
    if (this.props.decks[title]) {
      displayToast('A deck with that name already exists!');
      return;
    }

    console.log(`Adding new deck ${title}`);
    this.props.actions.addNewDeck(title)
      .then(() => {
        this.setState({ title: '' });
        displayToast('New deck created');
      });
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>Choose a name for your new deck:</Text>
        <TextInput value={this.state.title} placeholder="Deck title"
          onChangeText={(title) => this.setState({ title })} />
        <Button onPress={this.submitDeck}>Create deck</Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30
  },
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