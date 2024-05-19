import React, { useState } from 'react';
import { Button, Text, TextInput, View } from 'react-native';

const LoginBtn = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [name, setName] = useState('');

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setIsConnected(true);

        console.log('Connected wallet:', accounts[0]);
    
      } catch (err) {
        console.error('Error connecting wallet:', err);
      }
    } else {
      console.error('MetaMask not detected');
    }
  };

  return (
    <View>
      {!isConnected && <Button title="Connect Wallet" onPress={connectWallet} />}
      {isConnected && !name && (
        <>
          <Text>Please enter your name:</Text>
          <TextInput
            onChangeText={(text) => {
              console.log(name)
              setName(text);
            }}
          />
          <Button title="Submit" onPress={() => setName(name)} />
        </>
      )}
    </View>
  );
};

export default LoginBtn;
