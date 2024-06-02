import { useContext, useEffect, useState } from "react";
import { StyleSheet, TextInput, TouchableOpacity, Text, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";
import axios from "../../axios/axios";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../../context/AuthContext";

const DetailApp = ({ itemId}) => {
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigation = useNavigation();
    const { userToken } = useContext(AuthContext);

    useEffect(() => {
        const fetchDescrypt = async() => {
            try {

                const token = userToken;
                const config = {
                    headers: {
                        Authorization: `Token ${token}`
                    }
                };
    
                const response = await axios.get(`https://passwordgenerate.pythonanywhere.com/apps/${itemId}/descrypt/`, config);
                
                const {name, username, email, password } = response.data.app;
                setName(name),
                setUsername(username),
                setPassword(password),
                setEmail(email)

            } catch (error) {
                console.log(error);
                setError('Error');
            }
        }

        fetchDescrypt();
    }, []);

    const fecthUpdate = async() => {
        try{
            const token = userToken;
    
            const response = await axios.put(`https://passwordgenerate.pythonanywhere.com/apps/${itemId}/update/`, {
                name : name,
                email: email,
                username : username,
                password: password,
            },
            {
                headers : {
                    Authorization: `Token ${token}`,
                }
            });

            navigation.navigate('Home');

        }catch(error){
            console.log(error);
            setError('Failed');
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>My App</Text>
            <TextInput 
                style={styles.textInput}
                placeholder="mi app" 
                value={name}
                onChangeText={setName}
            />
            <TextInput 
                style={styles.textInput} 
                placeholder="example@gmai.com"
                value={email}
                onChangeText={setEmail} 
            />
            <TextInput 
                style={styles.textInput}
                placeholder="example"
                value={username}
                onChangeText={setUsername}
            />
            <TextInput
                style={styles.textInput}
                placeholder="password"
                secureTextEntry={false}
                value={password}
                onChangeText={setPassword}
            />
            <TouchableOpacity  onPress={fecthUpdate} style={styles.containerButton}>
                <LinearGradient
                    style={styles.button}
                    colors={['#4c669f', '#3b5998', '#192f6a']}
                    start={{x: 1, y:0}}
                    end={{x : 0, y : 1}}
                >
                    <Text style={styles.textButton}>Update App</Text>
                </LinearGradient>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container : {
        backgroundColor : '#f1f1f1',
        alignItems : 'center',
        justifyContent : 'center',
        marginTop: 130,
    },

    title : {
        fontSize : 50,
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
        borderColor : '#181818',
        padding : 10,
        width : '80%',
        height :  50,
        marginTop : 20,
        borderBottomWidth : 1,
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

export default DetailApp;