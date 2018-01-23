import React from 'react';
import PropTypes from 'prop-types';
import { TextInput, StyleSheet } from 'react-native';

import { lightGray } from '../constants/Colors';

/**
 * Stateless component that renders an input with customized styles.
 *
 * @module components/CustomTextInput
 * @param {function} [inputRef] - Ref callback to interact directly with the input
 *  from a parent element.
 * @param {string} value - Current input value.
 * @param {string} placeholder - Message to display in the input when it's empty.
 * @param {function} onChangeText - Function to trigger when the input value changes.
 * @param {object} [style] - Optional styles object to override defaults.
 * @param {object} [props] - Remaining props passed on to the component.
 */
export default function CustomTextInput ({ inputRef, value, placeholder, onChangeText, style = {}, ...props }) {
  return (
    <TextInput
      {...props}
      underlineColorAndroid="transparent"
      ref={inputRef}
      value={value}
      placeholder={placeholder}
      onChangeText={onChangeText}
      style={[styles.input, style]} />
  );
}

/* --- Property validation ------------------------------------------------- */

CustomTextInput.propTypes = {
  style: PropTypes.object,
  inputRef: PropTypes.func,
  value: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  onChangeText: PropTypes.func.isRequired
};

/* --- Component styles ---------------------------------------------------- */

const styles = StyleSheet.create({
  input: {
    fontSize: 16,
    padding: 20,
    paddingTop: 10,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderColor: lightGray + '50'
  }
});