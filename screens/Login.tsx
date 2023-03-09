import React from 'react';
import {StyleSheet, View, Image} from 'react-native';
import ConnectButton from '../components/buttons/ConnectButton';

export default function Login() {
  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require('../assets/logo.jpeg')} />
      <ConnectButton />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {},
});
