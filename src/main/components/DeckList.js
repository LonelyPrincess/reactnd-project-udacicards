import React from 'react';
import { connect } from 'react-redux';
import { Text, View } from 'react-native';

class DeckList extends React.Component {
  render() {
    const deckList = this.props.decks;

    return (
      <View>
        {Object.keys(deckList).map((key, index) => {
          const deck = deckList[key];
          return (
            <Text key={key}>{deck.title} has {deck.questions.length} questions</Text>
          );
        })}
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    decks: state
  };
}

export default connect(mapStateToProps, null)(DeckList);