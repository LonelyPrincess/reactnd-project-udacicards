import React from 'react';
import { Constants } from 'expo';
import { View, StatusBar, StyleSheet } from 'react-native';

import { green } from '../constants/Colors';

/**
 * Stateless component that wraps the status bar to customize its styles.
 *
 * @module components/CustomStatusBar
 */
export default function CustomStatusBar () {
  return (
    <View style={styles.statusBarContainer}>
      <StatusBar translucent barStyle='light-content' />
    </View>
  );
}

/* --- Component styles ---------------------------------------------------- */

const styles = StyleSheet.create({
  statusBarContainer: {
    backgroundColor: green,
    height: Constants.statusBarHeight
  }
});
