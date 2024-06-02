import Container from "../src/components/Container";
import DetailApp from "../src/components/DetailApp";
import { useRoute } from '@react-navigation/native';


const Detail = () => {
    const route = useRoute();
    const {itemId} = route.params;
    return (
        <Container  Component={DetailApp} itemId={itemId} />
    );
};

export default Detail;