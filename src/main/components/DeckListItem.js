import React from 'react';
import { Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { green, white, lightGreen, orange, red, gray, lightYellow, lightGray } from '../constants/Colors';

export default function DeckListItem({ deck, index, navigation }) {
  const hasEvenIndex = index % 2 === 0;
  return (
    <TouchableOpacity style={[styles.deckCard, styles.row, !hasEvenIndex ? { backgroundColor: lightYellow } : {}]}
      onPress={() => navigation.navigate('DeckDetails', { deckId: deck.title })}>
      <View style={{ flexGrow: 1, marginRight: 10 }}>
        <Text style={styles.title}>{deck.title}</Text>
        <Text style={{ color: lightGray }}>{deck.questions.length} cards</Text>
      </View>
      <MaterialCommunityIcons name="cards-playing-outline" size={60}
        style={{ color: (hasEvenIndex ? green : orange) + '50', transform: [{ rotateY: '180deg'}] }} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  deckCard: {
    padding: 20,
    borderRadius: 5,
    marginBottom: 20,
    backgroundColor: lightGreen
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
