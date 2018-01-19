import React from 'react';
import { connect } from 'react-redux';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { addNewDeck } from '../actions';
import { displayToast } from '../utils/Utils';
import { white, gray, lightGray } from '../utils/Colors';

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
        <View style={styles.row}>
          <MaterialCommunityIcons size={40} name="human-handsup" style={styles.infoIcon} />
          <Text style={styles.infoText}>Introduce the name for your new deck.</Text>
        </View>
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
  infoText: {
    fontSize: 18,
    flexShrink: 1,
    color: gray,
    marginTop: 20,
    marginBottom: 20
  },
  infoIcon: {
    marginRight: 20,
    color: lightGray
  },
  input: {
    padding: 20,
    fontSize: 16
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
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