import React from 'react';
import { connect } from 'react-redux';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { green, white, lightGreen, orange, red, gray, lightGray, lightYellow } from '../utils/Colors';
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
      <View style={styles.container}>
        {dayCount && (
            <View style={styles.row}>
              <MaterialCommunityIcons name="alert-outline" size={20} style={{ color: orange }} />
              <Text style={{ marginLeft: 5, color: gray }}>{dayCount} days since your last quiz!</Text>
            </View>
          )}
        <View style={{ flexGrow: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text style={styles.title}>{deck.title}</Text>
          <Text style={styles.subtitle}>~ {deck.questions.length} cards ~</Text>
        </View>
        <View style={{ marginTop: 10 }}>
          <Button onPress={() => this.props.navigation.navigate('CreateCard', { deckId: deck.title })}>Add card</Button>
          {deck.questions.length > 0 && (<Button style={{ backgroundColor: orange }}
            onPress={() => this.props.navigation.navigate('DeckQuiz', { deckId: deck.title })}>Start quiz</Button>)}
        </View>
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
    color: gray,
    fontSize: 40,
    marginBottom: 10
  },
  subtitle: {
    color: lightGray,
    fontSize: 18
  },
  row: {
    flexDirection: 'row',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: lightYellow,
    marginBottom: 10
  }
});

function mapStateToProps (state, { navigation }) {
  const { deckId } = navigation.state.params;

  return {
    deck: state[deckId]
  };
}

export default connect(mapStateToProps, null)(DeckDetails);