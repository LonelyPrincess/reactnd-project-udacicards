import React from 'react';
import { connect } from 'react-redux';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import Button from './Button';
import QuizResults from './QuizResults';
import { getRandomInt, shuffleArray } from '../utils/Utils';
import { clearLocalNotification, setLocalNotification } from '../utils/LocalNotifications';

import * as SCREEN_KEYS from '../constants/Screens';
import { red, white, lightGray, gray, green, lightGreen } from '../constants/Colors';

const NUM_QUESTIONS = 10;

class DeckQuiz extends React.Component {

  state = {
    score: 0,
    cardCounter: 0,
    currentCard: null,
    revealAnswer: false,
    animRotationDeg: new Animated.Value(0)
  };

  // Override title in page header
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: `${navigation.state.params.deckId} Quiz`
    };
  };

  // Flip card and reveal answers
  revealAnswer = () => {
    const flipAnimation = Animated.timing(this.state.animRotationDeg, { duration: 1000, toValue: 1 });

    flipAnimation.start(() => {
      this.setState({
        revealAnswer: true,
        animRotationDeg: new Animated.Value(0)
      });
    });
  };

  // Get a random card and increment counter
  getRandomCard = () => {
    const cards = this.props.deck.questions;
    const randomIndex = getRandomInt(0, cards.length);

    const selectedCard = cards[randomIndex];
    shuffleArray(selectedCard.answers);

    this.setState({
      revealAnswer: false,
      currentCard: selectedCard,
      cardCounter: this.state.cardCounter + 1
    });
  };

  // Check if answer is correct and increment score if needed
  submitCardAnswer = (isTrue) => {
    const cards = this.props.deck.questions;

    // Update score if selected solution is true
    if (isTrue && !this.state.revealAnswer) {
      this.setState(
        { score: this.state.score + 1 },
        this.goToNextQuestion);
    } else {
      this.goToNextQuestion();
    }
  };

  // Move forward to the next question
  // If all questions have been answered, show results instead
  goToNextQuestion = () => {
    if (this.state.cardCounter === NUM_QUESTIONS) {
      this.props.navigation.navigate(SCREEN_KEYS.QUIZ_RESULTS, {
        successRatio: (this.state.score / NUM_QUESTIONS) * 100,
        quizScreenKey: this.props.navigation.state.key
      });

      this.restartQuiz();

      // Clear local notification
      clearLocalNotification()
        .then(setLocalNotification);
    } else {
      this.getRandomCard();
    }
  };

  // Reset state and start over
  restartQuiz = () => {
    this.setState({
      score: 0,
      cardCounter: 0,
      currentCard: null
    }, this.getRandomCard);
  };

  componentWillMount () {
    this.props.navigation.setParams({ deckId: this.props.deck.title });
    this.getRandomCard();
  }

  render() {
    const { currentCard, cardCounter, score, revealAnswer } = this.state;

    if (!currentCard) {
      return null;
    }

    const spin = this.state.animRotationDeg.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg']
    });

    return (
      <View style={styles.container}>
        <View style={[ styles.row, { marginBottom: 25 } ]}>
          <MaterialCommunityIcons name="timer" size={20} style={styles.timerIcon} />
          <Text style={{ color: gray }}>{NUM_QUESTIONS - cardCounter + 1} cards left</Text>
        </View>

        <Animated.View style={[ styles.card, { transform: [ { rotateY: spin } ] }]}>
          <TouchableOpacity onPress={!revealAnswer ? this.revealAnswer : null}
            style={{ alignItems: 'center', justifyContent: 'center' }}>
            <View style={{ flexGrow: 1, justifyContent: 'center' }}>
              <Text style={styles.question}>{currentCard.text}</Text>
            </View>
            <MaterialCommunityIcons name={!revealAnswer ? 'eye' : 'eye-outline'} size={30} style={styles.timerIcon} />
            <Text style={{ color: lightGray, fontSize: 12, flexWrap: 'wrap' }}>
              {!revealAnswer
                ? 'Click card to reveal the answer'
                : 'The truth has been revealed'}
            </Text>
          </TouchableOpacity>
        </Animated.View>

        {currentCard.answers.map((answer, index) => (
          <Button key={index} onPress={() => this.submitCardAnswer(answer.isTrue)}
            style={revealAnswer && !answer.isTrue ? { backgroundColor: red } : {}}>
            {answer.text}
          </Button>
        ))}
      </View>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    backgroundColor: white
  },
  card: {
    padding: 20,
    borderRadius: 5,
    flexGrow: 1,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: lightGreen
  },
  question: {
    color: gray,
    fontSize: 20,
    flexWrap: 'wrap',
    textAlign: 'center'
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  timerIcon: {
    marginRight: 5,
    color: lightGray
  }
});

function mapStateToProps (state, { navigation }) {
  const { deckId } = navigation.state.params;

  return {
    deck: state[deckId]
  };
}

export default connect(mapStateToProps, null)(DeckQuiz);