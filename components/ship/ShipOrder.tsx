import { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet } from "react-native";
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

import getCoordinates from '../../models/nominatim';

// Not using the distance so commented out all the imports/stateprops for it - might be useful later
// import distanceBetweenCoordinates from '../../models/distance';

import { Base, Typography } from "../../styles";
import { ActivityIndicator } from 'react-native-paper';

const ShipOrder = ({ route }) => {
    const { order } = route.params;
    const [marker, setMarker] = useState(null);
    const [locationMarker, setLocationMarker] = useState(null);
    const [initLat, setInitLat] = useState(null);
    const [initLon, setInitLon] = useState(null);
    const [currentGPSLocation, setCurrentGPSLocation] = useState(null);
    const [shippingLocation, setShippingLocation] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const map = useRef(null);
    
    useEffect(() => {
        
        (async () => {
            const result = await getCoordinates(`${order.address}, ${order.city}`);

            setShippingLocation({latitude: parseFloat(result[0].lat), longitude: parseFloat(result[0].lon)});

            setMarker(
                <Marker 
                    identifier='marker'
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

            setCurrentGPSLocation(currentLocation.coords);

            setLocationMarker(<Marker 
                identifier='locationMarker'
                coordinate={{
                    latitude: currentLocation.coords.latitude, longitude: currentLocation.coords.longitude
                }}
                title="Current location"
                pinColor='blue'
            />)
            
        })();
    }, []);


    // if (shippingLocation && currentGPSLocation) {
    //     const distance = distanceBetweenCoordinates(shippingLocation, currentGPSLocation);
    // }

    const fitMarkers = () => {
        if (map?.current && (marker && locationMarker)) {
            const markers = ['locationMarker', 'marker'];
            map.current.fitToSuppliedMarkers(markers, true);
        }
    };
    
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
                {(initLat && initLon) && (marker && locationMarker)
                    ?   <MapView
                            ref={map}
                            key={locationMarker}
                            onMapReady={fitMarkers}
                            onMapLoaded={fitMarkers}
                            style={styles.map}
                            initialRegion={{
                                latitude: initLat,
                                longitude: initLon,
                                latitudeDelta: 1.1,
                                longitudeDelta: 1.1
                        }}>
                            {marker}
                            {locationMarker}
                        </MapView>
                    : <ActivityIndicator size={'large'} animating={true} color={'#00E'} style={{marginBottom: '50%'}}/>
                }
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