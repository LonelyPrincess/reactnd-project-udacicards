import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';

import { green, white } from '../utils/Colors';

export default function Button ({ children, onPress, style = {}, ...props }) {
  return (
    <TouchableOpacity onPress={onPress} {...props}>
      <Text style={[ styles.button, style ]}>{children}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 10,
    borderRadius: 5,
    marginTop: 15,
    textAlign: 'center',
    color: white,
    backgroundColor: green
  }
});
