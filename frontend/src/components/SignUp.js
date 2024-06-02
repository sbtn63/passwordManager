import React, { useState,  useContext } from 'react';
import { StyleSheet, TouchableOpacity, View, Text, TextInput } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from '../../context/AuthContext';

const SignUp = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const navigation = useNavigation()
    const { register, isLoading } = useContext(AuthContext);

    const handleRegister = () => {
        register(email, password, confirmPassword)
          .catch((e) => setError('Register failed. Please check your credentials and try again.'));
    };


    return (
        <View style={styles.container}>
            <Text style={styles.title}>Welcome</Text>
            <Text style={styles.subTitle}>Create new account</Text>
            <TextInput
                style={styles.textInput}
                placeholder="example@gmail.com"
                value={email}
                onChangeText={text => setEmail(text)}
            />
            <TextInput
                secureTextEntry={true}
                style={styles.textInput}
                placeholder="password"
                value={password}
                onChangeText={text => setPassword(text)}
            />
            <TextInput
                secureTextEntry={true}
                style={styles.textInput}
                placeholder="confirm password"
                value={confirmPassword}
                onChangeText={text => setConfirmPassword(text)}
            />
            {error ? <Text style={styles.error}>{error}</Text> : null}
            <TouchableOpacity onPress={handleRegister} style={styles.containerButton}>
            <LinearGradient
                style={styles.button}
                colors={['#4c669f', '#3b5998', '#192f6a']}
                start={{x: 1, y:0}}
                end={{x : 0, y : 1}}
            >
                    {isLoading ? (
                        <ActivityIndicator color="#fff" />
                    ) : (
                        <Text style={styles.textButton}>Register</Text>
                    )}
            </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("SignIn")}>
                <Text style={styles.textLink}>You already have an account?</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container : {
        flex : 1,
        backgroundColor : '#f1f1f1',
        alignItems : 'center',
        justifyContent : 'center',
    },

    title : {
        fontSize : 70,
        color : "#344340",
        fontWeight : 'bold',
    },

    subTitle : {
        fontSize : 20,
        color : 'gray',
    },

    textLink : {
        color : 'gray',
        marginTop: 10,
    },

    textInput : {
        borderRadius : 10,
        paddingStart : 30,
        borderColor : '#eee',
        padding : 10,
        width : '80%',
        height :  50,
        marginTop : 20,
        backgroundColor : '#fff',
    },

    containerButton: {
        width: '80%',
    },

   textButton: {
    fontSize : 20,
    color: '#eee',
    fontWeight : 'bold',
   },

   button : {
    marginTop: 20,
    height: 50,
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    justifyContent : 'center',
   },
});

export default SignUp;