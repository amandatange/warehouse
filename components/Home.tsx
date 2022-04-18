import { Text, ImageBackground, ScrollView } from 'react-native';
import { Base, Typography } from '../styles';
import Stock from './Stock';

import plant from '../assets/plant.jpg';

const Home = ({products, setProducts}) => {
	
    return (
        <ImageBackground source={plant} resizeMode="cover" style={Base.image}>
            <ScrollView style={Base.base}>
                <Text style={Typography.header1}>PlantHome</Text>
                <Stock products={products} setProducts={setProducts}/>
            </ScrollView>
		</ImageBackground>
    );
};

export default Home;