import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { useState, useEffect } from "react";
import uuid from 'react-native-uuid';

import { Base, Typography } from '../styles';

import deliveriesModel from '../models/deliveries';

const DeliveriesList = ({ route, navigation }) => {
    const { reload } = route.params || false;
    const [deliveriesList, setDeliveriesList] = useState([]);
    
    if (reload) {
        reloadDeliveries();
    }

    const listOfDeliveries = () => {
        return (
            <View style={Base.container}>
                {deliveriesList.map((item) => {
                    return (
                        <View key={uuid.v4()} style={Base.deliveryItem}>
                            <Text style={Typography.deliveryListItem}>
                                {item.amount}: {item.product_name} {'\n'}
                                <Text style={Typography.normal}>Delivery date: {item.delivery_date}{'\n'}
                                Comment: {item.comment ? item.comment : "No comment"}</Text>
                            </Text>
                        </View>
                    )
                })}
            </View>
        )
    }

    async function reloadDeliveries() {
        setDeliveriesList(await deliveriesModel.getDeliveries());
    }

    useEffect(() => {
        reloadDeliveries();
    }, []);

    return (
        <ScrollView style={Base.base}>
            <Text style={Typography.header2}>Deliveries</Text>
            {deliveriesList.length > 0
                ? <Text>{listOfDeliveries()}</Text>
                : <Text style={Typography.normal}>No previous deliveries!</Text>}
            <TouchableOpacity style={Base.button}
                onPress={() => {
                    navigation.navigate('Form');
                }}
            >
                <Text style={Typography.button}>
                    Create new delivery
                </Text>
            </TouchableOpacity>
        </ScrollView>
    );
}

export default DeliveriesList 