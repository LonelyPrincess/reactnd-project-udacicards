import React from 'react';
import { connect } from 'react-redux';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import Button from './Button';

import { countDaysSinceDate } from '../utils/Utils';
import * as SCREEN_KEYS from '../constants/Screens';
import { white, orange, gray, lightGray, lightYellow } from '../constants/Colors';

/**
 * Component that renders a view with details on a specified deck.
 *
 * @module components/DeckDetails
 */
class DeckDetails extends React.Component {

  /**
   * Returns the view of the component.
   * @returns JSX template for the component.
   */
  render() {
    const { deck, navigation } = this.props;

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
          <Button onPress={() => navigation.navigate(SCREEN_KEYS.CARD_FORM, { deckId: deck.title })}>Add card</Button>
          {deck.questions.length > 0 && (<Button style={{ backgroundColor: orange }}
            onPress={() => navigation.navigate(SCREEN_KEYS.QUIZ, { deckId: deck.title })}>Start quiz</Button>)}
        </View>
      </View>
    );
  }
}

/* --- Component styles ---------------------------------------------------- */

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

/* --- Redux mapping methods ----------------------------------------------- */

function mapStateToProps (state, { navigation }) {
  const { deckId } = navigation.state.params;

  return {
    deck: state[deckId]
  };
}

export default connect(mapStateToProps, null)(DeckDetails);