import React from 'react';
import { connect } from 'react-redux';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { countDaysSinceDate } from '../utils/Utils';
import { fetchDeckList } from '../actions';

class DeckList extends React.Component {
  componentWillMount() {
    console.log("Fetching deck data...");
    this.props.actions.fetchDeckList();
  }

  render() {
    const deckList = this.props.decks;

    return (
      <View style={styles.container}>
        {Object.keys(deckList).map((key, index) => {
          const deck = deckList[key];
          const dayCount = deck.lastQuizDate && countDaysSinceDate(new Date(deck.lastQuizDate));

          return (
            <TouchableOpacity key={key} onPress={() => { console.log(`Selected deck: ${deck.title}`); }}>
              <Text>{deck.title} has {deck.questions.length} questions</Text>
              {dayCount && (
                <Text>
                  <MaterialCommunityIcons name="alert-outline" /> {dayCount} days since your last quiz!
                </Text>
              )}
            </TouchableOpacity>
          );
        })}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

function mapStateToProps(state) {
  return {
    decks: state
  };
}

function mapDispatchToProps (dispatch) {
  return {
    actions: {
      fetchDeckList: () => dispatch(fetchDeckList())
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DeckList);