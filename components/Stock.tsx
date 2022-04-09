import { useEffect } from 'react';
import { Text, View } from 'react-native';
import { Base, Typography } from '../styles';
import productModel from '../models/products'


function StockList({products, setProducts}) {

    useEffect(async () => {
        setProducts(await productModel.getProducts());
    }, [])

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

export default function Stock({products, setProducts}) {
    return (
        <View style={Base.whiteBackground}>
            <Text style={Typography.header2}>In stock</Text>
            <StockList products={products} setProducts={setProducts}/>
        </View>
    );
}
