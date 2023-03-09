import React from 'react';
import {View, StyleSheet, Text} from 'react-native';

const SkillPathStats = ({
  skill,
  level,
  points,
  maxPoints,
}: {
  skill: string;
  level: number;
  points: number;
  maxPoints: number;
}) => {
  const width = ((points / maxPoints) * 100).toFixed(0) + '%';
  console.log('Width', width);
  return (
    <View style={styles.container}>
      <Text style={styles.level}>
        Level {level} {skill}
      </Text>
      <View style={styles.progressBar}>
        <View style={(StyleSheet.absoluteFill, {...styles.progress, width})} />
      </View>
      <View style={styles.pointsPanel}>
        <Text style={styles.points}>{points}</Text>
        <Text style={styles.maxPoints}>{maxPoints}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
    paddingVertical: 8,
    borderRadius: 4,
    shadowRadius: 16,
    shadowOffset: {width: 16, height: 16},
    shadowColor: 'black',
    width: '100%',
    backgroundColor: '#fdfdfd',
    alignItems: 'center',
    elevation: 8,
  },
  level: {fontWeight: '500', fontSize: 18},
  progressBar: {
    margin: 8,
    height: 20,
    flexDirection: 'row',
    width: '80%',
    backgroundColor: '#dddddd',
    borderRadius: 8,
  },
  progress: {
    backgroundColor: '#22AD74',
    borderRadius: 8,
  },
  pointsPanel: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
  },
  points: {color: '#22AD74', fontSize: 16, fontWeight: '700'},
  maxPoints: {color: 'gray', fontSize: 16, fontWeight: '500'},
});

export default SkillPathStats;
