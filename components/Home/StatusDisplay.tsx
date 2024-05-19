import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';

interface StatusPageProps {
  streak: number;
  progress: number; // Progress should be a value between 0 and 1
}

const StatusDisplay: React.FC<StatusPageProps> = ({ streak, progress }) => {
  let { width } = Dimensions.get('window');
  
  return (
    <View style={styles.container}>
      <View style={styles.statusContainer}>
        <Text style={styles.icon}>🔥</Text>
        <Text style={styles.countText}>{streak}</Text>
      </View>
       <View style={[styles.progressBarContainer, { width: width*0.9 }]}>
        <View style={[styles.progressBar, { width: `${progress * 100}%` }]} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '10%',
    // marginBottom: '-10%',
    zIndex: 1,
  },
  statusContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
  },
  icon: {
    fontSize: 100,
    marginTop: "-30%"
  },
  countText: {
    position: 'absolute',
    color: 'black',
    fontSize: 30,
    fontWeight: 'bold',
    bottom: 20,
  },
  progressBarContainer: {
    width: '80%',
    height: 20,
    backgroundColor: '#e0e0e0',
    borderRadius: 10,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: 'green',
  },
});

export default StatusDisplay;
