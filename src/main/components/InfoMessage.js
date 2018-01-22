import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { gray, lightGray } from '../constants/Colors';

export default function InfoMessage ({ children, iconPos = 'right' }) {
  const leftIcon = iconPos === 'left';

  return (
    <View style={[styles.infoContainer, leftIcon && { flexDirection: 'row-reverse' }]}>
      <MaterialCommunityIcons size={40} name="human-handsup"
        style={[styles.infoIcon, leftIcon ? { marginLeft: 20 } : { marginRight: 20 }]} />
      <Text style={styles.infoText}>{children}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  infoContainer: {
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  infoText: {
    color: gray,
    fontSize: 18,
    flexShrink: 1,
    marginVertical: 20
  },
  infoIcon: {
    color: lightGray
  }  
});
