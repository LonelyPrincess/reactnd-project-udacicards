import React from 'react';
import { connect } from 'react-redux';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

import Button from './Button';
import { displayToast } from '../utils/Utils';
import { addCardToDeck } from '../actions/index';

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

  //
  submitCard = () => {
    // TODO: validation

    const card = {
      text: this.state.question,
      answers: this.state.answers
        .map((answer, index) => ({
          text: answer,
          isTrue: this.state.validAnswer === index
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
      <View>
        <Text>Create a new card for current deck:</Text>
        <TextInput value={this.state.question} placeholder="Question"
          onChangeText={(question) => this.setState({ question })} />

        <Text>Write possible answers for your question (at least 2):</Text>

        {this.state.answers.map((item, index) => (
          <View key={index}>
            <TextInput value={this.state.answers[index]} placeholder={`Answer ${index + 1}`}
              onChangeText={(answer) => {
                const updatedAnswers = this.state.answers;
                updatedAnswers[index] = answer;
                this.setState({ answers: updatedAnswers })}
              } />
            <TouchableOpacity onPress={() => this.setValidAnswer(index) }>
              <MaterialIcons name={this.state.validAnswer === index? 'radio-button-checked' : 'radio-button-unchecked'} />
            </TouchableOpacity>
          </View>
        ))}

        <Button onPress={this.submitCard}>Add card</Button>
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

function mapDispatchToProps (dispatch) {
  return {
    actions: {
      addCardToDeck: (deck, card) => dispatch(addCardToDeck(deck, card))
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CardForm);