import React from 'react';
import { NavigationActions } from 'react-navigation';
import { View, Text, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function QuizResults ({ successRatio, onReplayClick, onBackClick }) {
  let icon, message;

  if (successRatio < 40) {
    icon = 'emoticon-dead';
    message = `Oops! It seems as if you need to review more...`;
  } else if (successRatio < 50) {
    icon = 'emoticon-sad';
    message = `Almost there! You may make it next time!`;
  } else if (successRatio < 70) {
    icon = 'emoticon-happy';
    message = `Hey, you made it! Good job!`;
  } else if (successRatio < 90) {
    icon = 'emoticon-excited';
    message = `Congratulations! You're on the way to become a master on this!`;
  } else {
    icon = 'emoticon-cool';
    message = `Wow! You sure are a master on this topic!`;
  }

  return (
    <View>
      <Text>Obtained score</Text>
      <Text>{successRatio}%</Text>
      <MaterialCommunityIcons name={icon} size={200} />
      <Text>{message}</Text>
      <TouchableOpacity onPress={onReplayClick}>
        <MaterialCommunityIcons name="replay" size={50} />
      </TouchableOpacity>
      <TouchableOpacity onPress={onBackClick}>
        <MaterialCommunityIcons name="exit-to-app" size={50} />
      </TouchableOpacity>
    </View>
  );
}
