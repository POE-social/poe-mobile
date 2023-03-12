import React, {useState} from 'react';
import {Image, View, StyleSheet} from 'react-native';

export default function Pet() {
  const petStates = [
    '../assets/shiba-idle.gif',
    '../assets/shiba-walk.gif',
    '../assets/shiba-jump.gif',
  ];

  const [activePet, setActivePet] = useState(petStates[0]);

  const toggleWalk = () => {
    if (activePet === petStates[0]) {
      setActivePet(petStates[2]);
      setTimeout(() => {
        setActivePet(petStates[0]);
      }, 1000);
    } else {
      setActivePet(petStates[0]);
    }
  };

  return (
    <View onTouchEnd={() => toggleWalk()} style={styles.container}>
      {activePet === petStates[1] ? (
        <Image
          source={require('../assets/shiba-walk.gif')}
          style={styles.image}
        />
      ) : activePet === petStates[2] ? (
        <Image
          source={require('../assets/shiba-jump.gif')}
          style={styles.image}
        />
      ) : (
        <Image
          source={require('../assets/shiba-idle.gif')}
          style={styles.image}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    height: 180,
    width: 180,
  },
});
