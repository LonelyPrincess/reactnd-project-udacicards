import React from 'react';
import { connect } from 'react-redux';
import { View, Text, TextInput, StyleSheet } from 'react-native';

import { addNewDeck } from '../actions';
import { displayToast } from '../utils/Utils';
import { white, gray } from '../utils/Colors';

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
      this.refs.inputTitle.focus();
      return;
    }

    // Check if there's already a deck with that name
    if (this.props.decks[title]) {
      displayToast('A deck with that name already exists!');
      this.refs.inputTitle.focus();
      return;
    }

    console.log(`Adding new deck ${title}`);
    this.props.actions.addNewDeck(title)
      .then(() => {
        this.setState({ title: '' });
        displayToast(`New deck ${title} created!`);

        // Redirect to deck list after creation
        this.props.navigation.navigate('DeckList');
      });
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Choose a name for your new deck:</Text>
        <TextInput value={this.state.title} placeholder="Deck title"
          ref="inputTitle" style={styles.input}
          onChangeText={(title) => this.setState({ title })} />
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
  },
  title: {
    fontSize: 25,
    color: gray,
    textAlign: 'center',
    marginBottom: 20
  },
  input: {
    padding: 20
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