import React from 'react';
import { connect } from 'react-redux';
import { View, FlatList, StyleSheet } from 'react-native';

import { fetchDeckList } from '../actions';

import DeckListItem from './DeckListItem';

class DeckList extends React.Component {
  componentWillMount() {
    console.log("Fetching deck data...");
    this.props.actions.fetchDeckList();
  }

  render() {
    const deckList = this.props.decks;

    return (
      <View style={styles.container}>
        <FlatList
          data={Object.keys(deckList)}
          renderItem={({ item }) => (
            <DeckListItem deck={deckList[item]} />
          )}
          keyExtractor={(item) => item}
          contentContainerStyle={{ padding: 30 }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
});

function mapStateToProps(state) {
  return {
    decks: state
  };
}

function mapDispatchToProps (dispatch) {
  return {
    actions: {
      fetchDeckList: () => dispatch(fetchDeckList())
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DeckList);