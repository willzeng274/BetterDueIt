import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export function NameDisplay() {
    return (
        <View style={styles.container}>
          <Text style={styles.text}>BetterDueIt</Text>
        </View>
      );
}
const styles = StyleSheet.create({
    container: {
      marginLeft: 10,
    },
    text: {
      fontSize: 18,
      fontWeight: 'bold',
      color: 'black',
      fontFamily: 'Bradley Hand, cursive',
    },
  });
  