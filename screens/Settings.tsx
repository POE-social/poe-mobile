import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import DisconnectButton from '../components/buttons/DisconnectButton';

export default function Settings() {
  return (
    <View style={styles.container}>
      <DisconnectButton />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
});
