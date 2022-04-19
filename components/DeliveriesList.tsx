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
            <View>
                {deliveriesList.map((item) => {
                    return <Text key={uuid.v4()} style={Base.deliveryItem}>{item.amount} {item.product_name} {item.delivery_date} {item.comment}</Text>
                })}
            </View>
        )
    }

    async function reloadDeliveries() {
        setDeliveriesList(await deliveriesModel.getDeliveries());
        // await console.log(deliveriesList, "från deliveriesList");
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
                // title="Skapa ny inleverans"
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