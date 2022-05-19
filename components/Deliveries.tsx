import { useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { showMessage } from "react-native-flash-message";

import DeliveriesList from './DeliveriesList';
import DeliveryForm from './DeliveryForm';

import productModel from "../models/products";
import deliveriesModel from '../models/deliveries';

import Delivery from "../interfaces/delivery";
import Product  from "../interfaces/product";

const Stack = createNativeStackNavigator();

const Deliveries = ({ navigation, setProducts }) => {
    const [delivery, setDelivery] = useState<Partial<Delivery>>({});
    const [currentProduct, setCurrentProduct] = useState<Partial<Product>>({});

    const addDelivery = async () => {
        console.log("hello")
        if (delivery.amount && delivery.delivery_date && delivery.product_id) {
            await deliveriesModel.addDelivery(delivery);
            const updatedProduct = {
                ...currentProduct,
                stock: (currentProduct.stock || 0) + (delivery.amount || 0)
            };
            await productModel.updateProduct(updatedProduct);
            navigation.navigate("List", { reload: true })
        } else {
            showMessage({
                message: "Invalid input",
                description: "You must choose product, delivery date and amount",
                type: "warning"
            })
        }
    }

    return (
        <Stack.Navigator initialRouteName="List">
            <Stack.Screen name="List" component={DeliveriesList} />
            <Stack.Screen name="Form">
                {(screenProps) => <DeliveryForm {...screenProps}
                navigation={navigation}
                setProducts={setProducts}
                delivery={delivery}
                setDelivery={setDelivery}
                currentProduct={currentProduct}
                setCurrentProduct={setCurrentProduct} 
                addDelivery={addDelivery}
            />}
            </Stack.Screen>
        </Stack.Navigator>
    );
};

export default Deliveries