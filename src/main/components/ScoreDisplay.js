import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { white, green, red, gray, lightGray } from '../constants/Colors';

/**
 * Stateless component that renders user score, as well as a feedback message
 * based on their results.
 *
 * @module components/ScoreDisplay
 * @param {number} successRatio - Percentage of success obtained by the user.
 */
export default function ScoreDisplay ({ successRatio }) {
  let icon, message;

  // Set icon and feedback message based on the obtained score
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
      <Text style={[styles.score, { color: (successRatio < 50 ? red : green )}]}>{successRatio}%</Text>
      <Text style={styles.feedbackMessage}>{message}</Text>
      <MaterialCommunityIcons name={icon} size={200} style={styles.icon}/>
    </View>
  );
}

/* --- Property validation ------------------------------------------------- */

ScoreDisplay.propTypes = {
  successRatio: PropTypes.number.isRequired
};

/* --- Component styles ---------------------------------------------------- */

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingHorizontal: 30
  },
  icon: {
    color: lightGray,
    marginTop: 10,
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
    textAlign: 'center',
    flexShrink: 1
  }
});
