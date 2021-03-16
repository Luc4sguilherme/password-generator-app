import { FontAwesome5 } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';
import clipboard from 'expo-clipboard';
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert, TouchableOpacity } from 'react-native';

import charSet from '../../constants/charSet';
import colors from '../../constants/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
  },
  logo: {
    marginBottom: 60,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: colors.text,
  },
  area: {
    marginTop: 15,
    marginBottom: 15,
    backgroundColor: colors.light,
    width: '80%',
    borderRadius: 7,
  },
  button: {
    backgroundColor: colors.accent,
    width: '80%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 7,
    marginBottom: 10,
  },
  buttonText: {
    fontSize: 25,
    color: colors.primary,
    fontWeight: 'bold',
  },
  password: {
    padding: 10,
    textAlign: 'center',
    fontSize: 20,
    color: colors.text,
  },
});

export default function App() {
  const [password, setPassword] = useState('');
  const [size, setSize] = useState(15);
  const [qualitity, setQualitity] = useState('');
  const [color, setColor] = useState('');

  const handleColor = () => {
    if (password.length <= 5) {
      setQualitity('Bad password');
      setColor('#cb473e');
    } else if (password.length >= 6 && password.length <= 10) {
      setQualitity('Weak password');
      setColor('#f07d58');
    } else if (password.length > 10) {
      setQualitity('Strong password');
      setColor('#55a95d');
    }
  };

  function generatePassword() {
    let pass = '';

    for (let i = 0, n = charSet.length; i < size; i += 1) {
      pass += charSet.charAt(Math.floor(Math.random() * n));
    }

    setPassword(pass);
  }

  function copyPassword() {
    clipboard.setString(password);
    Alert.alert('', 'Password successfully copied!', [{ text: 'OK' }]);
  }

  useEffect(() => {
    handleColor(password);
  }, [password]);

  return (
    <View style={styles.container}>
      <FontAwesome5
        name="lock"
        style={styles.logo}
        size={140}
        color={colors.icons}
      />
      <Text style={styles.title}>{size} Caracters</Text>
      <View style={styles.area}>
        <Slider
          style={{ height: 50 }}
          minimumValue={5}
          maximumValue={20}
          minimumTrackTintColor={colors.accent}
          maximumTrackTintColor={colors.dark}
          value={size}
          onValueChange={(value) => setSize(value.toFixed(0))}
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={generatePassword}>
        <Text style={styles.buttonText}>Generate Password</Text>
      </TouchableOpacity>
      {password !== '' && (
        <>
          <View style={[styles.area, { marginTop: '20%' }]}>
            <Text style={styles.password} onLongPress={copyPassword}>
              {password}
            </Text>
          </View>
          <Text style={{ color, fontSize: 20 }}>{qualitity}</Text>
        </>
      )}
    </View>
  );
}
