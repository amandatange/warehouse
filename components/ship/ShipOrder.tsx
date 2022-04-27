import { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

import getCoordinates from '../../models/nominatim';

import { Base, Typography } from "../../styles";

const ShipOrder = ({ route }) => {
    const { order } = route.params;
    const [marker, setMarker] = useState(null);
    const [locationMarker, setLocationMarker] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);

    useEffect(() => {
        (async () => {
            const result = await getCoordinates(`${order.address}, ${order.city}`);
            // console.log(result);
            setMarker(
                <Marker 
                    coordinate={{latitude: parseFloat(result[0].lat), longitude: parseFloat(result[0].lon)}}
                    title={result[0].display_name}
                    pinColor='green'
                />
            )
        })();
    }, []);

    useEffect(() => {
        (async () => {
            const {status} = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMessage("Permission to access location was denied");
                return;
            }

            const currentLocation = await Location.getCurrentPositionAsync({});
            setLocationMarker(<Marker 
                coordinate={{
                    latitude: currentLocation.coords.latitude, longitude: currentLocation.coords.longitude
                }}
                title="Current location"
                pinColor='purple'
            />)
        })();
    }, [])
    
    return (
        <View style={styles.container}>
            <Text style={Typography.header2}>
                Ship order
            </Text>
            <MapView
                style={styles.map}
                initialRegion={{
                    latitude: 56.1612,
                    longitude: 15.5869,
                    latitudeDelta: 0.1,
                    longitudeDelta: 0.1
            }}>
                {marker}
                {locationMarker}
                {/* <Marker
                    coordinate={{
                        latitude: 56.17,
                        longitude: 15.59
                    }}
                    title={"Shipping address"}
                /> */}
            </MapView>
            
        </View>
    )

};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    }
});

export default ShipOrder;