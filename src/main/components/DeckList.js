import React from 'react';
import { connect } from 'react-redux';
import { View, FlatList, StyleSheet } from 'react-native';

import DeckListItem from './DeckListItem';
import { fetchDeckList } from '../actions';
import { white } from '../constants/Colors';

/**
 * Component that renders a list of the available decks.
 *
 * @module components/DeckList
 */
class DeckList extends React.Component {

  /**
   * Handler for 'component will mount' lifecycle event. Before mounting the
   * component, an action will be dispatched to obtain the list of decks.
   */
  componentWillMount() {
    console.log(`Fetching deck data...`);
    this.props.actions.fetchDeckList();
  }

  /**
   * Returns the view of the component.
   * @returns JSX template for the component.
   */
  render() {
    const deckList = this.props.decks;

    return (
      <View style={styles.container}>
        <FlatList
          data={Object.keys(deckList)}
          renderItem={({ item, index }) => (
            <DeckListItem deck={deckList[item]} index={index}
              navigation={this.props.navigation} />
          )}
          keyExtractor={(item) => item}
          contentContainerStyle={{ padding: 30 }}
        />
      </View>
    );
  }
}

/* --- Component styles ---------------------------------------------------- */

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
    justifyContent: 'center',
  },
});

/* --- Redux mapping methods ----------------------------------------------- */

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