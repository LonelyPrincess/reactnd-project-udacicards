import React from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import Button from './Button';
import ScoreDisplay from './ScoreDisplay';
import { white, red } from '../constants/Colors';

/**
 * Component that renders user results for a quiz.
 *
 * @module components/QuizResults
 */
class QuizResults extends React.Component {

  /**
   * Redirect back to the quiz screen to replay.
   */
  onReplayClick = () => {
    this.props.navigation.goBack();
  };

  /**
   * Exit quiz and take the user back to deck details.
   */
  onBackClick = () => {
    const { quizScreenKey } = this.props.navigation.state.params;
    this.props.navigation.goBack(quizScreenKey);
  };

  /**
   * Returns the view of the component.
   * @returns JSX template for the component.
   */
  render () {
    return (
      <View style={styles.container}>
        <ScoreDisplay successRatio={this.props.navigation.state.params.successRatio} />
        <View style={styles.buttonContainer}>
          <Button onPress={this.onReplayClick}>
            <MaterialCommunityIcons name="replay" size={50} />
          </Button>
          <Button onPress={this.onBackClick} style={{ backgroundColor: red }}>
            <MaterialCommunityIcons name="exit-to-app" size={50} />
          </Button>
        </View>
      </View>
    );
  }
}

/* --- Component styles ---------------------------------------------------- */

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
  }
});

export default QuizResults;