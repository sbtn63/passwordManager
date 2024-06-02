import React, { useState, useContext } from 'react';
import { ActivityIndicator, StyleSheet, TouchableOpacity, View, Text, TextInput } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from '../../context/AuthContext';

const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigation = useNavigation();
    const { login, isLoading } = useContext(AuthContext);

    const handleLogin = () => {
        login(email, password)
          .catch((e) => setError('Login failed. Please check your credentials and try again.'));
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Welcome</Text>
            <Text style={styles.subTitle}>Login into your account</Text>
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
            {error ? <Text style={styles.error}>{error}</Text> : null}
            <TouchableOpacity onPress={handleLogin} style={styles.containerButton}>
                <LinearGradient
                    style={styles.button}
                    colors={['#4c669f', '#3b5998', '#192f6a']}
                    start={{ x: 1, y: 0 }}
                    end={{ x: 0, y: 1 }}
                >
                    {isLoading ? (
                        <ActivityIndicator color="#fff" />
                    ) : (
                        <Text style={styles.textButton}>Login</Text>
                    )}
                </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                <Text style={styles.textLink}>You do not have an account?</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f1f1f1',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 70,
        color: "#344340",
        fontWeight: 'bold',
    },
    subTitle: {
        fontSize: 20,
        color: 'gray',
    },
    textLink: {
        color: 'gray',
        marginTop: 10,
    },
    textInput: {
        borderRadius: 10,
        paddingStart: 30,
        borderColor: '#eee',
        padding: 10,
        width: '80%',
        height: 50,
        marginTop: 20,
        backgroundColor: '#fff',
    },
    containerButton: {
        width: '80%',
    },
    textButton: {
        fontSize: 20,
        color: '#eee',
        fontWeight: 'bold',
    },
    button: {
        marginTop: 20,
        height: 50,
        borderRadius: 10,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    error: {
        color: 'red',
        marginTop: 10,
    },
});

export default SignIn;