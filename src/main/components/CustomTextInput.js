import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

import { lightGray } from '../constants/Colors';

export default function CustomTextInput ({ inputRef, value, placeholder, onChangeText, style = {}, ...props }) {
  return (
    <TextInput
      {...props}
      underlineColorAndroid="transparent"
      ref={inputRef} 
      value={value} 
      placeholder={placeholder}
      onChangeText={onChangeText}
      style={[ styles.input, style ]} />
  );
}

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