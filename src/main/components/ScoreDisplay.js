import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { white, green, red, gray, lightGray } from '../utils/Colors';

export default function ScoreDisplay ({ successRatio }) {
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
    <View style={styles.container}>
      <Text style={styles.scoreTitle}>Your score is...</Text>
      <Text style={[ styles.score, { color: (successRatio < 50 ? red : green )}]}>{successRatio}%</Text>
      <Text style={styles.feedbackMessage}>{message}</Text>
      <MaterialCommunityIcons name={icon} size={200} style={[ styles.icon, styles.withShadow ]}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center'
  },
  icon: {
    color: lightGray,
    marginTop: 10,
    marginBottom: 25
  },
  score: {
    fontSize: 36,
    color: green,
    marginBottom: 10,
    fontWeight: 'bold'
  },
  scoreTitle: {
    fontSize: 16,
    color: gray
  },
  feedbackMessage: {
    textAlign: 'center'
  },
  withShadow: {
    shadowRadius: 3,
    shadowOpacity: 0.8,
    shadowColor: 'rgba(0,0,0,0.25)',
    shadowOffset: {
      width: 0,
      height: 3
    }
  }
});
