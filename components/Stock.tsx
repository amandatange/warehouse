import { useState, useEffect } from 'react';
import { Text, View } from 'react-native';
import config from "../config/config.json";

const fetchAPI = `${config.base_url}/products?api_key=${config.api_key}`

function StockList() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch(fetchAPI)
            .then(response => response.json())
            .then(result => setProducts(result.data));
    }, []);

    // console.log(products)
    const list = products.map((product, index) => <Text key={index}>{ product.name } - { product.stock }</Text>);

    return (
        <View>
            {list}
        </View>
    );
}

export default function Stock() {
    return (
        <View>
        <Text style={{color: '#333', fontSize: 24}}>Lagerförteckning</Text>
        <StockList/>
        </View>
    );
}