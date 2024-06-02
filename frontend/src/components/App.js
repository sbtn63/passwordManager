import { useContext, useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/FontAwesome";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../../context/AuthContext";

const App = ({id, name}) => {

    const { userToken } = useContext(AuthContext);
    const [error, setError] = useState(null);
    const navigation = useNavigation();

    const fetchDelete = async () => {
        try {    

            const token = userToken; 
                
            const config = {
                headers: {
                    Authorization: `Token ${token}`
                }
            };

            const response = await axios.delete(`https://passwordgenerate.pythonanywhere.com/apps/${id}/delete/`, config);
    
    
            console.log(response.data);
            navigation.navigate('Home');
        } catch (error) {
            console.log(error);
            setError('Registration failed. Please try again.');
        }
    };

    return (
        <View style={styles.container} >
            <View style={styles.containerApp}>
                <TouchableOpacity onPress={() => navigation.navigate('Detail', { itemId: id})} >
                    <Text style={styles.text}>{ name }</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={fetchDelete}>
                <Icon name="times-circle" size={30} color="#900" />
                </TouchableOpacity>
            </View>
        </View>
    );
};


const styles = StyleSheet.create({
    container : {
        marginTop : 30,
        backgroundColor : '#f1f1f1',
        alignItems : 'center',
        justifyContent : 'center',
    },

    containerApp : {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 8,
        gap: 10,
        width : '80%',
        backgroundColor : '#181818',
        borderRadius : 10,
    },

    text : {
        color : '#eee',
        fontSize : 30,
        fontWeight : 'bold',
    },

    textButton : {
        color : '#eee',
    },
});

export default App;