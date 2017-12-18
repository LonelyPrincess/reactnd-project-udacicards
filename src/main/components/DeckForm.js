import React from 'react';
import { connect } from 'react-redux';
import { Text, View, TouchableOpacity, TextInput } from 'react-native';

import { addNewDeck } from '../actions';

class DeckForm extends React.Component {
  state = {
    title: ''
  };

  submitDeck = () => {
    console.log(`Adding new deck ${this.state.title}`);
    this.props.actions.addNewDeck(this.state.title)
      .then(() => this.setState({ title: '' }) );
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

function mapDispatchToProps (dispatch) {
  return {
    actions: {
      addNewDeck: (title) => dispatch(addNewDeck(title))
    }
  };
}

export default connect(null, mapDispatchToProps)(DeckForm);