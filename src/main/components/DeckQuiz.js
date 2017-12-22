import React from 'react';
import { connect } from 'react-redux';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import Button from './Button';
import QuizResults from './QuizResults';
import { getRandomInt } from '../utils/Utils';

import { red } from '../utils/Colors';

const NUM_QUESTIONS = 10;

class DeckQuiz extends React.Component {

  state = {
    score: 0,
    cardCounter: 0,
    currentCard: null,
    revealAnswer: false
  };

  // Override title in page header
  static navigationOptions = ({ navigation }) => {
    return {
      title: (navigation.state.params.showingResults ? 'Quiz results' : 'Quiz')
    };
  };

  // Reveal answer
  revealAnswer = () => {
    this.setState({
      revealAnswer: true
    });

    // TODO: animate card flip
  };

  // Get a random card and increment counter
  getRandomCard = () => {
    const cards = this.props.deck.questions;
    const randomIndex = getRandomInt(0, cards.length);
    this.setState({
      revealAnswer: false,
      currentCard: cards[randomIndex],
      cardCounter: this.state.cardCounter + 1
    });
  };

  // Get a random card
  submitCardAnswer = (isTrue) => {
    const cards = this.props.deck.questions;

    // Update score if selected solution is true
    if (isTrue && !this.state.revealAnswer) {
      this.setState({ score: this.state.score + 1 });
    }

    // Increment card counter and display next card
    if (this.state.cardCounter <= NUM_QUESTIONS) {
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

    this.props.navigation.setParams({ showingResults: false });
  };

  componentWillMount () {
    this.getRandomCard();
  }

  // Change header when we need to show stats
  componentWillUpdate () {
    if (this.state.cardCounter === NUM_QUESTIONS) {
      this.props.navigation.setParams({ showingResults: true });
    }
  };

  render() {
    const { currentCard, cardCounter, score, revealAnswer } = this.state;

    if (!currentCard) {
      return null;
    }

    if (cardCounter > NUM_QUESTIONS) {
      return (
        <QuizResults
          successRatio={(score / NUM_QUESTIONS) * 100}
          onBackClick={() => this.props.navigation.goBack()}
          onReplayClick={this.restartQuiz} />
      );
    }

    return (
      <View>
        <Text>Progress: {cardCounter} / {NUM_QUESTIONS}</Text>
        <Text>Current score: {score}</Text>

        <TouchableOpacity onPress={this.revealAnswer}>
          <Text>{currentCard.text}</Text>
        </TouchableOpacity>

        {currentCard.answers.map((answer, index) => (
          <Button key={index} onPress={() => this.submitCardAnswer(answer.isTrue)}
            style={revealAnswer && answer.isTrue ? { backgroundColor: red } : {}}>
            {answer.text}
          </Button>
        ))}
      </View>
    );
  }
}

function mapStateToProps (state, { navigation }) {
  const { deckId } = navigation.state.params;

  return {
    deck: state[deckId]
  };
}

export default connect(mapStateToProps, null)(DeckQuiz);