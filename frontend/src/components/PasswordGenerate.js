import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableNativeFeedback, TouchableOpacity, Alert, TextInput } from 'react-native';
import generatePassword from '../js/generator_password';
import CheckBox from 'expo-checkbox';
import Icon from "react-native-vector-icons/FontAwesome";
import * as Clipboard from 'expo-clipboard';


const PasswordGenerate = () => {
    const [myPassword, setMyPassword] = useState('My password');
    const [includeUpperCase, setIncludeUpperCase] = useState(false);
    const [includeNumbers, setIncludeNumbers] = useState(false);
    const [includeSymbols, setIncludeSysmbols] = useState(false);
    const [length, setLength] = useState('12');

    function handleGeneratePassword() {
      const newPassword = generatePassword(length, includeUpperCase, includeNumbers, includeSymbols);
      setMyPassword(newPassword);
    }

    const copyToClipboard = () => {
      Clipboard.setStringAsync(myPassword)
      Alert.alert('Copy!!');
    };

  return (
        <View style={styles.container}>
            <View style={styles.containerPassword}>
              <Text style={[styles.text, styles.password]}>{myPassword}</Text>
              <TouchableOpacity onPress={copyToClipboard}>
                <Icon name="copy" style={{marginTop : 10, marginHorizontal: 2}} size={30} color="#900" />
              </TouchableOpacity>
            </View>
            <View style={styles.checkboxContainer}>
              <CheckBox
                style={styles.checkbox}
                disabled={false}
                value={includeUpperCase}
                onValueChange={(newValue) => setIncludeUpperCase(newValue)}
              />
              <Text style={styles.label}>Include Uppercase</Text>
            </View>

            <View style={styles.checkboxContainer}>
              <CheckBox
                style={styles.checkbox}
                disabled={false}
                value={includeSymbols}
                onValueChange={(newValue) => setIncludeSysmbols(newValue)}
              />
              <Text style={styles.label}>Include Symbols</Text>
            </View>

            <View style={styles.checkboxContainer}>
              <CheckBox
                style={styles.checkbox}
                disabled={false}
                value={includeNumbers}
                onValueChange={(newValue) => setIncludeNumbers(newValue)}
              />
              <Text style={styles.label}>Include Numbers</Text>
            </View>

            <View style={styles.numberContainer} >
                <Text style={styles.label}>length</Text>
                <TextInput 
                  style={styles.numericInput} 
                  keyboardType='numeric' 
                  value={length} 
                  onChangeText={setLength}
                />
            </View>

            <TouchableNativeFeedback onPress={handleGeneratePassword}>
                <Text style={styles.button}>Generar Password</Text>
            </TouchableNativeFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    top : 170,
    padding : 20,
    width : '90%',
    marginHorizontal : 'auto',
    borderRadius : 5,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  containerPassword : {
    flexDirection : 'row',
    backgroundColor : '#F6EEC9',
    paddingHorizontal : 15,
    paddingVertical : 10,
    borderRadius : 5,
    marginBottom : 15,
  },

  text :{
    fontSize: 35,
    color: '#240750'
  },

  password : {
  },  

  button: {
    marginTop: 10,
    backgroundColor: '#240750',
    paddingHorizontal: 14,
    paddingVertical: 8,
    color: '#fff',
    borderRadius: 10,
    fontSize: 20,
    fontWeight : 'bold',
  },

  navbarContainer: {
    marginTop: 10
  },

  checkboxContainer: {
    flexDirection: 'row',
    marginBottom: 10,

  },

  numberContainer : {
    flexDirection : 'row',
    marginBottom : 10,
  },

  checkbox: {
    alignSelf: 'center',
  },

  label: {
    margin: 8,
    fontWeight : 'bold',
  },

  numericInput : {
    borderRadius : 10,
    textAlign : 'center',
    borderColor : '#eee',
    padding : 8,
    width : '20%',
    height :  40,
    marginTop : 0,
    backgroundColor : '#FFFAE6',
  },

});

export default PasswordGenerate;
