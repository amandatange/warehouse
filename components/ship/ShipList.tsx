import { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from "react-native";

import orderModel from '../../models/orders';

import { Base, Typography } from "../../styles";

const ShipList = ({ route, navigation }) => {
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
        .filter(order => order.status_id > 100)
        .map((order, index) => {
            return (
                <TouchableOpacity
                    key={index}
                    onPress={() => {
                        navigation.navigate('Order', {
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
        <View style={Base.base}>
            <Text style={Typography.header2}>
                Orders ready to be shipped
            </Text>
            {listOfOrders}
        </View>
    )

};

export default ShipList;