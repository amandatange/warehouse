import { View, Text, TouchableOpacity } from "react-native";
import { useState, useEffect } from "react";

import { Base, Typography } from '../styles';

import deliveriesModel from '../models/deliveries'

export default function DeliveriesList({ route, navigation }) {
    const { reload } = route.params || false;
    const [deliveriesList, setDeliveriesList] = useState([])
    
    if (reload) {
        reloadDeliveries();
    }

    async function reloadDeliveries() {
        setDeliveriesList(await deliveriesModel.getDeliveries());
    }

    useEffect(() => {
        reloadDeliveries()
        // console.log(deliveriesList)
    }, []);

    // const listOfDeliveries = deliveriesList.map(delivery => {

    //     return <Text style={Typography.normal}
    //             key={delivery}
    //             >
    //                 {delivery}
    //         </Text>;
    // });

    return (
        <View style={Base.base}>
            <Text style={Typography.header2}>Inleveranser</Text>
            {deliveriesList}
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
        </View>
    );
}

    