import { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from "react-native";
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

import getCoordinates from '../../models/nominatim';

import { Base, Typography } from "../../styles";

const ShipOrder = ({ route }) => {
    const { order } = route.params;
    const [marker, setMarker] = useState(null);
    const [locationMarker, setLocationMarker] = useState(null);
    const [initLat, setInitLat] = useState(null);
    const [initLon, setInitLon] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    
    useEffect(() => {
        
        (async () => {
            const result = await getCoordinates(`${order.address}, ${order.city}`);
            setMarker(
                <Marker 
                    coordinate={{latitude: parseFloat(result[0].lat), longitude: parseFloat(result[0].lon)}}
                    title={result[0].display_name}
                    pinColor='green'
                />
            )
            setInitLat(parseFloat(result[0].lat));
            setInitLon(parseFloat(result[0].lon));
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
                pinColor='blue'
            />)
            
        })();
    }, [])
    
    return (
        <View style={Base.container}>
            <View>
                <Text style={Typography.header2}>Ship order</Text>
                <Text style={Typography.header4}>Name: {order.name}</Text>
                <Text style={Typography.normal}>Address: {order.address}</Text>
                <Text style={Typography.normal}>City and zip code: {order.city} {order.zip}</Text>            
                <Text style={Typography.normal}>Order id: {order.id}</Text>            
            </View>
            <View style={styles.container}>
                <MapView
                    style={styles.map}
                    initialRegion={{
                        // latitude: 56.1612,
                        // longitude: 15.5869,
                        // latitudeDelta: 0.1,
                        // longitudeDelta: 0.1
                        latitude: initLat,
                        longitude: initLon,
                        latitudeDelta: 0.1,
                        longitudeDelta: 0.1
                }}>
                    {marker}
                    {locationMarker}
                </MapView>
            </View>
            
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