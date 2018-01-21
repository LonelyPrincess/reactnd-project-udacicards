import React from 'react';
import { connect } from 'react-redux';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Animated, TouchableWithoutFeedback } from 'react-native';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';

import Button from './Button';
import { displayToast } from '../utils/Utils';
import { addCardToDeck } from '../actions/index';
import { white, gray, lightGray, green, red, orange } from '../utils/Colors';

class CardForm extends React.Component {
  state = {
    question: '',
    answers: [
      '',
      '',
      ''
    ],
    validAnswer: 0,
    activeForm: 'question',
    inputToFocus: null,
    animOpacity: new Animated.Value(1)
  };

  // Override title in page header
  static navigationOptions = () => {
    return {
      title: `Create new card`
    };
  };

  componentDidUpdate () {
    const { inputToFocus } = this.state;
    if (inputToFocus && this.refs[inputToFocus]) {
      console.log(`Focus on input ${inputToFocus}`);
      this.refs[inputToFocus].focus();
      this.setState({ inputToFocus: null });
    }
  }

  switchActiveForm = (newActiveForm) => {
    if (!newActiveForm || newActiveForm === this.state.activeForm) {
      return;
    }

    Animated.timing(this.state.animOpacity, { duration: 250, toValue: 0 })
      .start(() => {
        this.setState(
          { activeForm: newActiveForm },
          () => {
            Animated.timing(this.state.animOpacity, { duration: 250, toValue: 1 }).start();
          }
        );
      });
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
      this.setState(
        { inputToFocus: 'inputQuestion' },
        () => this.switchActiveForm('question'));
      return false;
    }

    if (answers.filter(answer => answer).length < 2) {
      displayToast('You need to fill, at least, two answers for your question.');
      for (let i = 0; i < answers.length; i++) {
        if (!answers[i]) {
          this.setState(
            { inputToFocus: `inputAnswer${i + 1}` },
            () => this.switchActiveForm('answers'));
          break;
        }
      }
      return false;
    }

    if (!answers[validAnswer]) {
      displayToast('The right answer cannot be empty.');
      this.setState(
        { inputToFocus: `inputAnswer${validAnswer + 1}` },
        () => this.switchActiveForm('answers'));
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
    const isQuestionFormActive = this.state.activeForm === 'question';

    return (
      <View style={styles.container}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginBottom: 10 }}>
          <TouchableWithoutFeedback onPress={() => this.switchActiveForm('question')}>
            <View>
              <Text style={{ color: isQuestionFormActive ? green : lightGray }}>
                {'question'.toUpperCase()}
              </Text>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => this.switchActiveForm('answers')}>
            <View>
              <Text style={{ color: !isQuestionFormActive ? green : lightGray }}>
                {'answers'.toUpperCase()}
              </Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
        <Animated.View style={{ flexGrow: 1, opacity: this.state.animOpacity }}>
          {isQuestionFormActive ? (
            <View>
              <View style={[styles.row, styles.infoContainer]}>
                <MaterialCommunityIcons size={40} name="human-handsup"
                  style={[styles.infoIcon, { marginLeft: 0, marginRight: 10 }]} />
                <Text style={styles.infoText}>Introduce a question for your new card.</Text>
              </View>
              <TextInput
                underlineColorAndroid="transparent"
                ref="inputQuestion" style={styles.input}
                value={this.state.question} placeholder="Question"
                onChangeText={(question) => this.setState({ question })} />
            </View>
          ) : (
            <View>
              <View style={[styles.row, styles.infoContainer]}>
                <Text style={styles.infoText}>Introduce at least 2 possible answers to your question.</Text>
                <MaterialCommunityIcons size={40} name="human-handsup" style={styles.infoIcon} />
              </View>
              {this.state.answers.map((item, index) => {
                const isValidAnswer = this.state.validAnswer === index;
                return (
                  <View key={index} style={[styles.row, { marginBottom: 10 }]}>
                    <TouchableOpacity onPress={() => this.setValidAnswer(index) }>
                      <MaterialIcons size={30} style={{ marginRight: 20, color: (isValidAnswer ? green : red) }}
                        name={isValidAnswer ? 'check' : 'close'} />
                    </TouchableOpacity>
                    <TextInput
                      underlineColorAndroid="transparent"
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
            </View>
          )}
        </Animated.View>
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
    fontSize: 16,
    padding: 20,
    paddingTop: 10,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderColor: lightGray + '50'
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  infoText: {
    fontSize: 18,
    flexShrink: 1,
    color: gray,
    marginTop: 20,
    marginBottom: 20,
    flexWrap: 'wrap'
  },
  infoIcon: {
    marginLeft: 20,
    color: lightGray
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  infoContainer: {
    marginBottom: 10
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