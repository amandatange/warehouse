import { useState, useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';
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
    const list = products.map((product, index) => <Text style={styles.list} key={index}>{ product.name } - { product.stock }</Text>);

    return (
        <View>
            {list}
        </View>
    );
}

export default function Stock() {
    return (
        <View style={styles.background}>
            <Text style={styles.text}>In stock</Text>
            <StockList/>
        </View>
    );
}

const styles = StyleSheet.create({
    text: {
        color: 'hsl(115, 44%, 30%)',
        fontSize: 30,
        marginBottom: 15
    },
    list: {
        color: "hsl(285, 25%, 40%)",
        fontSize: 22,
        lineHeight: 30,
        marginBottom: 10
    },
    background: {
        backgroundColor: 'hsla(0, 0%, 100%, .6)',
    }
});