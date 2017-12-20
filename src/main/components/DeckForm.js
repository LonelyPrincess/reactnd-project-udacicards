import React from 'react';
import { connect } from 'react-redux';
import { Text, View, TouchableOpacity, TextInput } from 'react-native';

import { addNewDeck } from '../actions';
import { displayToast } from '../utils/Utils';

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
      <View>
        <TextInput value={this.state.title} placeholder="Deck title"
          onChangeText={(title) => this.setState({ title })} />

        <TouchableOpacity onPress={this.submitDeck}>
          <Text>Create deck</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

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