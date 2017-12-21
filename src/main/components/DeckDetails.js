import React from 'react';
import { connect } from 'react-redux';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { green, white, lightGreen, orange, red } from '../utils/Colors';
import { countDaysSinceDate } from '../utils/Utils';

import Button from './Button';

class DeckDetails extends React.Component {

  // Override title in page header
  static navigationOptions = () => {
    return {
      title: `Deck details`
    };
  };

  render() {
    const { deck } = this.props;

    if (!deck) {
      return null;
    }

    const dayCount = deck.lastQuizDate && countDaysSinceDate(new Date(deck.lastQuizDate));

    return (
      <View>
        <Text>{deck.title}</Text>
        <Text>{deck.questions.length} questions</Text>
        {dayCount && (
          <Text>
            <MaterialCommunityIcons name="alert-outline" />
            <Text>You haven't taken a quiz in {dayCount} days</Text>
          </Text>
        )}
        <Button onPress={() => this.props.navigation.navigate('CreateCard', { deckId: deck.title })}>Add card</Button>
        <Button style={{ backgroundColor: red }}
          onPress={() => this.props.navigation.navigate('DeckQuiz', { deckId: deck.title })}>Start quiz</Button>
      </View>
    );
  }
}

function mapStateToProps (state, { navigation }) {
  const { deckId } = navigation.state.params;

  return {
    deck: state[deckId]
  };
}

export default connect(mapStateToProps, null)(DeckDetails);