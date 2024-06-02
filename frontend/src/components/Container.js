import { View, StyleSheet } from "react-native";
import Navbar from "./Navbar";

const Container = ({ Component, ...props }) => {

    return (
        <View>
            <Navbar />
            <Component {...props} />
        </View>
    );

};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
      },
});

export default Container;