import React from 'react';
import { connect } from 'react-redux';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

import Button from './Button';
import { displayToast } from '../utils/Utils';
import { addCardToDeck } from '../actions/index';
import { white, gray, lightGray, green, red } from '../utils/Colors';

class CardForm extends React.Component {
  state = {
    question: '',
    answers: [
      '',
      '',
      ''
    ],
    validAnswer: 0
  };

  // Override title in page header
  static navigationOptions = () => {
    return {
      title: `Create new card`
    };
  };

  // Set an answer as the valid one
  setValidAnswer = (answerIndex) => {
    this.setState({ validAnswer: answerIndex });
  };

  // Validate that we have the minimal required data before adding card to the deck
  validateCard = () => {
    const { question, answers, validAnswer } = this.state;

    if (!question) {
      displayToast('You need to write a question.');
      this.refs.inputQuestion.focus();
      return false;
    }

    if (answers.filter(answer => answer).length < 2) {
      displayToast('You need to fill, at least, two answers for your question.');
      for (let i = 0; i < answers.length; i++) {
        if (!answers[i]) {
          this.refs[`inputAnswer${i + 1}`].focus();
          break;
        }
      }
      return false;
    }

    if (!answers[validAnswer]) {
      displayToast('The right answer cannot be empty.');
      this.refs[`inputAnswer${validAnswer + 1}`].focus();
      return false;
    }

    return true;
  };

  // If form passes validation, add card to deck
  submitCard = () => {

    if (!this.validateCard()) {
      console.log('Card form validation failed!' );
      return;
    }

    const { question, answers, validAnswer } = this.state;

    // Add card to the deck
    const card = {
      text: question,
      answers: answers
        .map((answer, index) => ({
          text: answer,
          isTrue: validAnswer === index
        }))
        .filter(answer => answer.text)     // Filter empty answers
    };

    this.props.actions.addCardToDeck(this.props.deck, card);

    // Go back
    this.props.navigation.goBack();
    displayToast('New card added to deck!');
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Create a new card for current deck:</Text>
        <TextInput
          ref="inputQuestion" style={styles.input}
          value={this.state.question} placeholder="Question"
          onChangeText={(question) => this.setState({ question })} />

        <Text style={styles.subtitle}>Write possible answers for your question (at least 2):</Text>
        {this.state.answers.map((item, index) => {
          const isValidAnswer = this.state.validAnswer === index;
          return (
            <View key={index} style={styles.row}>
              <TouchableOpacity onPress={() => this.setValidAnswer(index) }>
                <MaterialIcons size={30} style={{ marginRight: 20, color: (isValidAnswer ? green : red) }}
                  name={isValidAnswer ? 'check' : 'close'} />
              </TouchableOpacity>
              <TextInput
                ref={`inputAnswer${index + 1}`} style={[ styles.input, { flexGrow: 1 } ]}
                value={this.state.answers[index]} placeholder={`Answer ${index + 1}`}
                onChangeText={(answer) => {
                  const updatedAnswers = this.state.answers;
                  updatedAnswers[index] = answer;
                  this.setState({ answers: updatedAnswers })}
                } />
            </View>
          );
        })}

        <Button onPress={this.submitCard}>Add card</Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    backgroundColor: white
  },
  title: {
    fontSize: 25,
    color: gray,
    textAlign: 'center',
    marginBottom: 20
  },
  subtitle: {
    fontSize: 18,
    color: lightGray,
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 20
  },
  input: {
    padding: 20
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center'
  }
});

function mapStateToProps (state, { navigation }) {
  const { deckId } = navigation.state.params;

  return {
    deck: state[deckId]
  };
}

function mapDispatchToProps (dispatch) {
  return {
    actions: {
      addCardToDeck: (deck, card) => dispatch(addCardToDeck(deck, card))
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CardForm);