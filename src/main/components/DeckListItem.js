import React from 'react';
import PropTypes from 'prop-types';
import { Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import * as SCREEN_KEYS from '../constants/Screens';
import { green, lightGreen, orange, red, gray, lightYellow, lightGray } from '../constants/Colors';

/**
 * Stateless component that renders an entry in the deck list. The styles will
 * be different depending on its index.
 *
 * @module components/DeckListItem
 * @param {object} deck - Deck to display.
 * @param {number} index - Position of current deck in the deck list.
 */
export default function DeckListItem({ deck, index, navigation }) {
  const hasEvenIndex = index % 2 === 0;

  return (
    <TouchableOpacity
      style={[styles.deckCard, styles.row, { backgroundColor: (hasEvenIndex ? lightGreen : lightYellow) }]}
      onPress={() => navigation.navigate(SCREEN_KEYS.DECK_DETAILS, { deckId: deck.title })}>
      <View style={{ flexGrow: 1, marginRight: 10 }}>
        <Text style={styles.title}>{deck.title}</Text>
        <Text style={{ color: lightGray }}>{deck.questions.length} cards</Text>
      </View>
      <MaterialCommunityIcons name="cards-playing-outline" size={60}
        style={{ color: (hasEvenIndex ? green : orange) + '50', transform: [{ rotateY: '180deg'}] }} />
    </TouchableOpacity>
  );
}

/* --- Property validation ------------------------------------------------- */

DeckListItem.propTypes = {
  deck: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired
};

/* --- Component styles ---------------------------------------------------- */

const styles = StyleSheet.create({
  deckCard: {
    padding: 20,
    borderRadius: 5,
    marginBottom: 20
  },
  title: {
    color: gray,
    fontSize: 22,
    marginBottom: 10
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  }
});
