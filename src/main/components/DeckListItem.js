import React from 'react';
import { Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { green, white, lightGreen, orange, red, gray } from '../utils/Colors';
import { countDaysSinceDate } from '../utils/Utils';

export default function DeckListItem({ deck, navigation }) {
  const dayCount = deck.lastQuizDate && countDaysSinceDate(new Date(deck.lastQuizDate));

  return (
    <TouchableOpacity style={styles.deckCard}
      onPress={() => navigation.navigate('DeckDetails', { deckId: deck.title })}>
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
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  deckCard: {
    padding: 20,
    borderRadius: 5,
    marginBottom: 15,
    borderColor: green,
    borderWidth: 3,
    backgroundColor: lightGreen
  },
  title: {
    color: gray,
    fontSize: 25,
    marginBottom: 10
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5
  }
});
