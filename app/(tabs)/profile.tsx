import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import LoginBtn from '@/components/Login';

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <Image source={require('@/assets/images/bg2.png')}  style={styles.backgroundImage}/>
        <View style={styles.banner}>
          <View style={styles.circle}>
            <Text style={styles.text}>BetterDueIt</Text>
          </View>
          <View style={styles.wings}>
            <View style={[styles.wing, styles.leftWing]} />
            <View style={[styles.wing, styles.rightWing]} />
          </View>
        </View>
      <LoginBtn />
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent', // Transparent background
    padding: 20,
  },
  backgroundImage:{
    width:320,
    height:480,
    position: 'absolute'
  },
  banner: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  circle: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: '#9370db', // Medium Purple
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  wings: {
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    top: 60,
  },
  wing: {
    width: 60,
    height: 150,
    backgroundColor: '#9370db', // Medium Purple
    borderRadius: 30,
    transform: [{ rotate: '45deg' }],
  },
  leftWing: {
    transform: [{ rotate: '-45deg' }],
  },
  rightWing: {
    transform: [{ rotate: '225deg' }],
  },
});
