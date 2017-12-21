import React from 'react';
import { connect } from 'react-redux';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

import Button from './Button';

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

  setValidAnswer = (answerIndex) => {
    this.setState({ validAnswer: answerIndex });
  };

  render() {
    return (
      <View>
        <Text>Create a new card for current deck:</Text>
        <TextInput value={this.state.question} placeholder="Question"
          onChangeText={(question) => this.setState({ question })} />

        <Text>Write possible answers for your question (at least 2):</Text>

        {this.state.answers.map((item, index) => (
          <View>
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

        <Button onPress={() => console.log(`Submit card form`)}>Add card</Button>
      </View>
    );
  }
}

export default connect(null, null)(CardForm);