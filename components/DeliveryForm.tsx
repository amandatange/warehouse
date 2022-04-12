import { useState } from "react";
import { ScrollView, Text, TextInput } from "react-native";

import { Base, Typography, Forms } from "../styles";

import Delivery from "../interfaces/delivery";

const DeliveryForm = ({ navigation }) => {
    return (
        <ScrollView style={{ ...Base.base }}>
            <Text style={{ ...Typography.header3}}>
                New delivery
            </Text>
            <Text style={Typography.label}>Comment</Text>
            <TextInput
                style={Forms.input}
                onChangeText={(content: string) => {
                    console.log("i onchangeText")
                    console.log(content)
                }}
            />
        </ScrollView>
    )
}

export default DeliveryForm