import { useState, useEffect } from "react";
import { Platform, TouchableOpacity, ScrollView, Text, TextInput, View, TextComponent } from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from "@react-native-picker/picker";


import { Base, Typography, Forms } from "../styles";

import productModel from "../models/products";
import deliveriesModel from '../models/deliveries';

import Delivery from "../interfaces/delivery";
import Product  from "../interfaces/product";

const ProductDropDown = (props) => {
    const [products, setProducts] = useState<Product[]>([]);
    let productsHash: any = {};

    useEffect(async () => {
        setProducts(await productModel.getProducts());
    }, []);

    const itemsList = products.map((prod, index) => {
        productsHash[prod.id] = prod;
        return <Picker.Item key={index} label={prod.name} value={prod.id}
        />;
    });
    
    return (
        <Picker
            selectedValue={props.delivery?.product_id}
            onValueChange={(itemValue) => {
                props.setDelivery({ ...props.delivery, product_id: itemValue});
                props.setCurrentProduct(productsHash[itemValue]);
        }}>
            <Picker.Item key='unselectable' label='Choose a plant' value={0} />
            {itemsList}
        </Picker>
    )
}

const DateDropDown = (props) => {
    const [dropDownDate, setDropDownDate] = useState<Date>(new Date());
    const [show, setShow] = useState<Boolean>(false);

    const showDatePicker = () => {
        setShow(true);
    };

    useEffect(() => {
        setShow(false);
    }, [dropDownDate]);

    return (
        <View>
            {Platform.OS === 'android' && (
                <TouchableOpacity style={Base.button} onPress={showDatePicker}>
                    <Text style={Typography.button}>
                        Show date picker
                    </Text>
                </TouchableOpacity>
            )}
            {(show || Platform.OS === 'ios') && (
                <DateTimePicker 
                    onChange={(event, date) => {
                        if (date !== undefined) {
                            setDropDownDate(date);
                            props.setDelivery({
                                ...props.delivery,
                                delivery_date: date.toLocaleDateString('se-SV')
                            });
                            
                        }
                    }}
                    value={dropDownDate}
                />
            )}
        </View>
    );
}


const DeliveryForm = ({ navigation, setProducts, delivery, setDelivery, currentProduct, setCurrentProduct, addDelivery }) => {
    // const [delivery, setDelivery] = useState<Partial<Delivery>>({});
    // const [currentProduct, setCurrentProduct] = useState<Partial<Product>>({});

    // const addDelivery = async () => {
    //     if (delivery.amount && delivery.delivery_date && delivery.product_id) {
    //         await deliveriesModel.addDelivery(delivery);
    //         const updatedProduct = {
    //             ...currentProduct,
    //             stock: (currentProduct.stock || 0) + (delivery.amount || 0)
    //         };
    //         await productModel.updateProduct(updatedProduct);
    //         navigation.navigate("List", { reload: true })
    //     } else {
    //         showMessage({
    //             message: "Invalid input",
    //             description: "You must choose product, delivery date and amount",
    //             type: "warning"
    //         })
    //     }
    // }

    return (
        <ScrollView style={{ ...Base.base }}>
            <Text style={{ ...Typography.header3}}>
                New delivery
            </Text>

            <Text style={{ ...Typography.label}}>
                Pick a product
            </Text>
            <ProductDropDown
                delivery={delivery}
                setDelivery={setDelivery}
                setCurrentProduct={setCurrentProduct}
            />

            <Text style={{ ...Typography.label }}>
                Choose delivery date
            </Text>
            <DateDropDown
                delivery={delivery}
                setDelivery={setDelivery}
                testID='DateDropDown'
            />
            
            <Text style={{ ...Typography.label }}>
                Amount
            </Text>
            <TextInput
                style={{ ...Forms.input }}
                onChangeText={(content: string) => {
                    setDelivery({ ...delivery, amount: parseInt(content) })
                }}
                value={delivery?.amount?.toString()}
                keyboardType="numeric"
                testID="amount-field"
            />
            
            <Text style={Typography.label}>
                Comment
            </Text>
            <TextInput
                style={Forms.input}
                onChangeText={(content: string) => {
                    setDelivery({ ...delivery, comment: content})
                }}
                value={delivery?.comment}
                testID="comment-field"
            />

            <TouchableOpacity accessibilityLabel={`Create new delivery by pressing this button`} style={Base.button} onPress={() => addDelivery()}>
                <Text style={Typography.button}>
                    Create delivery
                </Text>
            </TouchableOpacity>
        </ScrollView>
    )
}

export default DeliveryForm;
