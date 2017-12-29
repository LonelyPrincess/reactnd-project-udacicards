import React from 'react';
import { connect } from 'react-redux';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { green, white, lightGreen, orange, red, gray } from '../utils/Colors';
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
        <View style={{ flexGrow: 1 }}>
          <Text style={styles.title}>{deck.title}</Text>
          <View style={styles.row}>
            <MaterialCommunityIcons name="cards" size={25} style={{ color: green }} />
            <Text style={{ marginLeft: 10 }}>{deck.questions.length} question cards</Text>
          </View>
          {dayCount && (
            <View style={styles.row}>
              <MaterialCommunityIcons name="alert-outline" size={25} style={{ color: red }} />
              <Text style={{ marginLeft: 10 }}>{dayCount} days since your last quiz!</Text>
            </View>
          )}
        </View>
        <View>
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
  row: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5
  }
});

function mapStateToProps (state, { navigation }) {
  const { deckId } = navigation.state.params;

  return {
    deck: state[deckId]
  };
}

export default connect(mapStateToProps, null)(DeckDetails);