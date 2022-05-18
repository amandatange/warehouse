import { View, Text, Button, TouchableOpacity } from "react-native";
import { useState, useEffect } from "react";
import { Base, Typography } from '../styles';
import orderModel from "../models/orders";
import productModel from "../models/products";

const PickList = ({ route, navigation, setProducts }) => {
    const { order } = route.params;
    const [productsList, setProductsList] = useState([])
    console.log(order);

    useEffect(async () => {
        setProductsList(await productModel.getProducts());
    }, []);

    async function pick() {
        await orderModel.pickOrder(order);
        setProducts(await productModel.getProducts());
        navigation.navigate("List", { reload: true });
    }

    const productsHash = productsList.reduce((hash, current) => ({ ...hash, [current.id]: current.stock }), {});

    let allInStock = true;

    const orderItemsList = order.order_items.map((item, index) => {
        if (productsHash[item.product_id] < item.amount) {
            allInStock = false;
        }

        return <Text style={Typography.normal}
                key={index}
                >
                    {item.name} - {item.amount} - {item.location}
            </Text>;
    });

    return (
        <View style={Base.base}>
            <Text style={Typography.header4}>{order.name}</Text>
            <Text style={Typography.normal}>{order.address}</Text>
            <Text style={Typography.normal}>{order.zip} {order.city}</Text>

            <Text style={Typography.header3}>Products:</Text>

            {orderItemsList}

            {allInStock
                ?   <TouchableOpacity accessibilityLabel='Pack order' style={Base.button} onPress={pick}>
                        <Text style={Typography.button}>Pack order</Text>
                    </TouchableOpacity>
                : <Text style={Typography.header2}>Out of stock!</Text>
            }
            
        </View>
    )
};
export default PickList;
