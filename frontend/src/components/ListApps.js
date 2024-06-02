import { View, ActivityIndicator } from "react-native";
import App from "./App";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";

const ListApps = () => {

    const [apps, setApps] = useState([]);
    const { userToken} = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchApps = async () => {
        try {
            const token = userToken;

            const config = {
                headers: {
                    Authorization: `Token ${token}`
                }
            };

            const response = await axios.get('https://passwordgenerate.pythonanywhere.com/apps/list/', config);
            setApps(response.data);
            setIsLoading(false);
        } catch (error) {
            setError('Error fetching apps. Please try again later.');
            setIsLoading(false);
        }
    };

     useEffect(() => {
        const refreshAppList = async () => {
            setIsLoading(true);
            await fetchApps();
            setIsLoading(false);
        };
        
        refreshAppList();
    }, [apps]);

    if (isLoading) {
        return (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size="large" />
          </View>
        );
    }

    return (
        <View>
        {
            apps.map(app => (
                <App key={app.id} id={app.id} name={app.name} />
            ))
        }
        </View>
    );
};

export default ListApps;