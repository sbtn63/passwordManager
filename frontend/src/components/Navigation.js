import React, { useContext, useEffect, useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, ActivityIndicator } from "react-native";

import Home from '../../screens/Home';
import Register from '../../screens/Register';
import Login from '../../screens/Login';
import CreateApp from '../../screens/CreateApp';
import GeneratePassword from "../../screens/GeneratePassword";
import Detail from "../../screens/Detail";
import { AuthContext } from "../../context/AuthContext";

const Stack = createStackNavigator();

const AuthStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="SignUp" component={Register} options={{headerShown: false}} />
            <Stack.Screen name="SignIn" component={Login} options={{headerShown: false}} />
        </Stack.Navigator>
    );
}

const AppStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Home" component={Home} options={{headerShown: false}} />
            <Stack.Screen name="GeneratePassword" component={GeneratePassword} options={{headerShown: false}} />
            <Stack.Screen name="CreateApp" component={CreateApp} options={{headerShown: false}} />
            <Stack.Screen name="Detail" component={Detail} options={{headerShown: false}} />
        </Stack.Navigator>
    );
}

const Navigation = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const {isLoading, userToken} = useContext(AuthContext);


    if(isLoading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    return (
        <NavigationContainer>
            { userToken !== null ? <AppStack /> : <AuthStack />}
        </NavigationContainer>
    );
};


export default Navigation;