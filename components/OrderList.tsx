import { useState, useEffect } from 'react';
import { View, Text, Button, TouchableOpacity } from "react-native";
import { Base, Typography } from '../styles';
import config from "./../config/config.json";
import orderModel from '../models/orders'

export default function OrderList({ route, navigation }) {
    const { reload } = route.params || false;
    const [allOrders, setAllOrders] = useState([]);
    
    if (reload) {
        reloadOrders();
    }

    async function reloadOrders() {
        setAllOrders(await orderModel.getOrders())
    }

    useEffect(() => {
        reloadOrders()
    }, [])

    const listOfOrders = allOrders
        .filter(order => order.status === "Ny")
        .map((order, index) => {
            return (
                <TouchableOpacity
                    key={index}
                    onPress={() => {
                        navigation.navigate('Details', {
                            order: order
                        });
                    }}
                    style={Base.button}
                >
                    <Text style={Typography.button}>
                        {order.name}
                    </Text>
                </TouchableOpacity>
            )
        });

    return (
        <View>
            <Text style={Typography.header1}>Orders ready to be packed</Text>
            {listOfOrders}
        </View>
    );
}