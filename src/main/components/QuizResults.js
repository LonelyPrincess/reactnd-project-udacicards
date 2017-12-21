import React from 'react';
import { NavigationActions } from 'react-navigation';
import { View, Text, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function QuizResults ({ successRatio, onReplayClick, onBackClick }) {
  return (
    <View>
      <Text>Obtained score</Text>
      <Text>{successRatio}%</Text>
      <TouchableOpacity onPress={onReplayClick}>
        <MaterialCommunityIcons name="replay" size={50} />
      </TouchableOpacity>
      <TouchableOpacity onPress={onBackClick}>
        <MaterialCommunityIcons name="cards" size={50} />
      </TouchableOpacity>
    </View>
  );
}
