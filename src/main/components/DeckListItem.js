import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { green, white, lightGreen, orange, red } from '../utils/Colors';
import { countDaysSinceDate } from '../utils/Utils';

export default function DeckListItem({ deck }) {
  const dayCount = deck.lastQuizDate && countDaysSinceDate(new Date(deck.lastQuizDate));

  // TODO: redirect to deck details on press

  return (
    <TouchableOpacity style={[ styles.deckCard, dayCount ? styles.warningCard : {} ]}
      onPress={() => { console.log(`Selected deck: ${deck.title}`); }}>
      <Text>{deck.title} has {deck.questions.length} questions</Text>
      {dayCount && (
        <Text>
          <MaterialCommunityIcons name="alert-outline" /> {dayCount} days since your last quiz!
        </Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  deckCard: {
    padding: 10,
    borderRadius: 5,
    marginBottom: 15,
    borderColor: green,
    borderWidth: 3,
    backgroundColor: lightGreen
  },
  warningCard: {
    borderColor: red,
    backgroundColor: orange
  }
});
