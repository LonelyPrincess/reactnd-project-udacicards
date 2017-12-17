import React from 'react';
import { connect } from 'react-redux';
import { Text, View, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { countDaysSinceDate } from '../utils/utils';

class DeckList extends React.Component {
  render() {
    const deckList = this.props.decks;

    return (
      <View>
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

function mapStateToProps(state) {
  return {
    decks: state
  };
}

export default connect(mapStateToProps, null)(DeckList);