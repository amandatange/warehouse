import { View, Text, TouchableOpacity } from "react-native";

import { Base, Typography } from "../../styles";

const ShipList = ({ navigation }) => {
    return (
        <View style={Base.base}>
            <Text style={Typography.header2}>
                Orders ready to be shipped
            </Text>
            {/* Mappa alla ordrar med status > 100 */}
            <TouchableOpacity 
                    style={Base.button}
                    onPress={() => {
                        navigation.navigate('Order', {
                            order: {
                                "id": 6186,
                                "name": "Ulla Ullman",
                                "address": "Iglatjärnsvägen 1",
                                "zip": "45678",
                                "city": "Olofstorp",
                                "country": "Sweden",
                                "status": "Packad",
                                "status_id": 200,
                            }
                        })
                    }}    
                >
                
                
                
                <Text style={Typography.button}>
                    Fake order
                </Text>
            </TouchableOpacity>
        </View>
    )

};

export default ShipList;