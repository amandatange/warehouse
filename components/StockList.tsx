import { useEffect } from 'react';
import { Text, View } from 'react-native';
import { Base, Typography } from '../styles';
import productModel from '../models/products';


const StockList = ({products, setProducts }) => {

    useEffect(async () => {
        setProducts(await productModel.getProducts());
    }, [products])

    const list = products.map((product, index) => {
        return (
            <Text style={Typography.header3} key={index}>
                { product.name } - { product.stock }
            </Text>
        )
    })

    return (
        <View>
            {list}
        </View>
    );
}

export default StockList;
