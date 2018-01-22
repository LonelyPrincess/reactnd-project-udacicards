import React from 'react';
import { NavigationActions } from 'react-navigation';
import { View, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { white, red } from '../constants/Colors';
import Button from './Button';
import ScoreDisplay from './ScoreDisplay';

class QuizResults extends React.Component {

  onReplayClick = () => {
    this.props.navigation.goBack();
  };

  onBackClick = () => {
    const { quizScreenKey } = this.props.navigation.state.params;
    this.props.navigation.goBack(quizScreenKey);
  };

  render () {
    return (
      <View style={styles.container}>
        <ScoreDisplay successRatio={this.props.navigation.state.params.successRatio} />
        <View style={styles.buttonContainer}>
          <Button onPress={this.onReplayClick} style={styles.withShadow}>
            <MaterialCommunityIcons name="replay" size={50} />
          </Button>
          <Button onPress={this.onBackClick} style={[ styles.withShadow, { backgroundColor: red } ]}>
            <MaterialCommunityIcons name="exit-to-app" size={50} />
          </Button>
        </View>
      </View>
    );
  }
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

export default QuizResults;