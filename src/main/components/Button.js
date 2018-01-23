import React from 'react';
import PropTypes from 'prop-types';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';

import { green, white } from '../constants/Colors';

/**
 * Stateless component that renders a button with customized styles.
 *
 * @module components/Button
 * @param children - Content to display inside of the button.
 * @param {function} onPress - Function to trigger when the button is pressed.
 * @param {object} [style] - Optional styles object to override defaults.
 * @param {object} [props] - Remaining props passed on to the component.
 */
export default function Button ({ children, onPress, style = {}, ...props }) {
  return (
    <TouchableOpacity onPress={onPress} {...props}>
      <Text style={[styles.button, style]}>{children}</Text>
    </TouchableOpacity>
  );
}

/* --- Property validation ------------------------------------------------- */

Button.propTypes = {
  style: PropTypes.object,
  onPress: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element
  ]).isRequired
};

/* --- Component styles ---------------------------------------------------- */

const styles = StyleSheet.create({
  button: {
    padding: 10,
    borderRadius: 5,
    marginTop: 15,
    textAlign: 'center',
    color: white,
    fontSize: 16,
    backgroundColor: green
  }
});
