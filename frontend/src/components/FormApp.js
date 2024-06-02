import { useContext, useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { LinearGradient } from "expo-linear-gradient";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";

const FormApp = () => {
    
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigation = useNavigation()
    const { userToken } = useContext(AuthContext);

    const fetchNewApp = async () => {
        try {    
            

            const  token  = userToken;

            const response = await axios.post('https://passwordgenerate.pythonanywhere.com/apps/', {
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
            
            console.log(response.data);
    
            navigation.navigate('Home');
        } catch (error) {
            console.error('Error:', error);
            setError('Registration failed. Please try again.');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>New App</Text>
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
                secureTextEntry={true}
                value={password}
                onChangeText={setPassword}
            />
            <TouchableOpacity onPress={fetchNewApp} style={styles.containerButton}>
                <LinearGradient
                    style={styles.button}
                    colors={['#4c669f', '#3b5998', '#192f6a']}
                    start={{x: 1, y:0}}
                    end={{x : 0, y : 1}}
                >
                    <Text style={styles.textButton}>Create New App</Text>
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
        top : 120,
    },

    title : {
        fontSize : 40,
        fontWeight : 'bold',
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

    containerButton : {
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

export default FormApp;