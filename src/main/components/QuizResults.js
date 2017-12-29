import React from 'react';
import { NavigationActions } from 'react-navigation';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { white, green, orange, red, gray, lightGray } from '../utils/Colors';
import Button from './Button';

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
    <View style={styles.container}>
      <Text style={styles.scoreTitle}>Your score is...</Text>
      <Text style={[ styles.score, { color: (successRatio < 50 ? red : green )}]}>{successRatio}%</Text>
      <Text style={styles.feedbackMessage}>{message}</Text>
      <MaterialCommunityIcons name={icon} size={200} style={[ styles.icon, styles.withShadow ]}/>
      <View style={styles.buttonContainer}>
        <Button onPress={onReplayClick} style={styles.withShadow}>
          <MaterialCommunityIcons name="replay" size={50} />
        </Button>
        <Button onPress={onBackClick} style={[ styles.withShadow, { backgroundColor: red } ]}>
          <MaterialCommunityIcons name="exit-to-app" size={50} />
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: white
  },
  buttonContainer: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    justifyContent: 'space-around'
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
