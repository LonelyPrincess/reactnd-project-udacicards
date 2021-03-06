import React from 'react';
import { connect } from 'react-redux';
import { View, Text, TouchableOpacity, StyleSheet, Animated, TouchableWithoutFeedback } from 'react-native';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';

import Button from './Button';
import InfoMessage from './InfoMessage';
import CustomTextInput from './CustomTextInput';

import { displayToast } from '../utils/Utils';
import { addCardToDeck } from '../actions/index';
import { white, lightGray, green, red } from '../constants/Colors';

/**
 * Component that manages a form to create a new card and include it into a deck.
 *
 * @module components/CardForm
 */
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

  // Object to store refs to directly access form inputs
  inputRef = {};

  /**
   * Handler for 'component did update' lifecycle event. If the state contains
   * the name of an input to focus, we use its reference to place the user on
   * that field.
   */
  componentDidUpdate () {
    const { inputToFocus } = this.state;
    if (inputToFocus && this.inputRef[inputToFocus]) {
      console.log(`Focus on input ${inputToFocus}`);
      this.inputRef[inputToFocus].focus();
      this.setState({ inputToFocus: null });
    }
  }

  /**
   * Performs an animation to switch between the two sections of the form: the
   * question section and the answers section.
   *
   * @param {string} newActiveForm - String that identifies the section we want
   *  to show on screen.
   */
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

  /**
   * Check if the user has introduced the required data to create a card.
   * @return {boolean} - Returns 'false' if an error ocurred during validation.
   */
  validateCard = () => {
    const { question, answers, validAnswer } = this.state;

    if (!question) {
      displayToast('You need to write a question.');
      this.setState(
        { inputToFocus: 'question' },
        () => this.switchActiveForm('question'));
      return false;
    }

    if (answers.filter(answer => answer).length < 2) {
      displayToast('You need to fill, at least, two answers for your question.');
      for (let i = 0; i < answers.length; i++) {
        if (!answers[i]) {
          this.setState(
            { inputToFocus: `answer${i + 1}` },
            () => this.switchActiveForm('answers'));
          break;
        }
      }
      return false;
    }

    if (!answers[validAnswer]) {
      displayToast('The right answer cannot be empty.');
      this.setState(
        { inputToFocus: `answer${validAnswer + 1}` },
        () => this.switchActiveForm('answers'));
      return false;
    }

    return true;
  };

  /**
   * If form validation succeeds, add new card to the deck and go back to deck
   * details screen.
   */
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

  /**
   * Returns the view of the component.
   * @return JSX template for the component.
   */
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
              <InfoMessage>
                Introduce a question for your new card.
              </InfoMessage>
              <CustomTextInput
                inputRef={(ref) => this.inputRef['question'] = ref}
                value={this.state.question} placeholder="Question"
                onChangeText={(question) => this.setState({ question })} />
            </View>
          ) : (
            <View>
              <InfoMessage iconPos="left">
                Introduce at least 2 possible answers to your question.
              </InfoMessage>
              {this.state.answers.map((item, index) => {
                const isValidAnswer = this.state.validAnswer === index;
                return (
                  <View key={index} style={[styles.row, { marginBottom: 10 }]}>
                    <TouchableOpacity onPress={() => this.setState({ validAnswer: index }) }>
                      <MaterialIcons size={30} style={{ marginRight: 20, color: (isValidAnswer ? green : red) }}
                        name={isValidAnswer ? 'check' : 'close'} />
                    </TouchableOpacity>
                    <CustomTextInput style={{ flexGrow: 1 }}
                      inputRef={(ref) => this.inputRef[`answer${index + 1}`] = ref}
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

/* --- Component styles ---------------------------------------------------- */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    backgroundColor: white
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  }
});

/* --- Redux mapping methods ----------------------------------------------- */

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