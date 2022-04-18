import { useState, useEffect } from "react";
import { Platform, TouchableOpacity, ScrollView, Text, TextInput, View, TextComponent } from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from "@react-native-picker/picker";

import { Base, Typography, Forms } from "../styles";

import productModel from "../models/products"
import deliveriesModel from '../models/deliveries';

import Delivery from "../interfaces/delivery";
import Product  from "../interfaces/product";

const ProductDropDown = (props) => {
    // console.log(props.delivery)
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
    // console.log(itemsList)
    return (
        <Picker
            selectedValue={props.delivery?.product_id}
            onValueChange={(itemValue) => {
                props.setDelivery({ ...props.delivery, product_id: itemValue});
                props.setCurrentProduct(productsHash[itemValue]);
        }}>
            {itemsList}
        </Picker>
    )
    // return (
    //     <Text>picker</Text>
    // )

}


const DateDropDown = (props) => {
    const [dropDownDate, setDropDownDate] = useState<Date>(new Date());
    const [show, setShow] = useState<Boolean>(false);

    const showDatePicker = () => {
        setShow(true);
    };

    return (
        <View>
            {Platform.OS === 'android' && (
                <TouchableOpacity style={Base.button} onPress={showDatePicker}>
                    <Text style={Typography.button}>
                        {/* Show date picker */}
                        {dropDownDate.toLocaleDateString('se-SV')}
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
                        setShow(false)
                    }}
                    value={dropDownDate}
                />
            )}
        </View>
    );
}


const DeliveryForm = ({ navigation, setProducts }) => {
    const [delivery, setDelivery] = useState<Partial<Delivery>>({});
    const [currentProduct, setCurrentProduct] = useState<Partial<Product>>({});


    const addDelivery = async () => {
        await deliveriesModel.addDelivery(delivery);

        const updatedProduct = {
            ...currentProduct,
            stock: (currentProduct.stock || 0) + (delivery.amount || 0)
        };

        await productModel.updateProduct(updatedProduct);

        setProducts(await productModel.getProducts());
        // console.log(delivery, "addDelivery i DeliveryForm");
        navigation.navigate("List", { reload: true })
    }

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
            />
            
            <Text style={Typography.label}>
                Comment
            </Text>
            <TextInput
                style={Forms.input}
                onChangeText={(content: string) => {
                    setDelivery({ ...delivery, comment: content})
                    // console.log("i onchangeText")
                    // console.log(content)
                }}
                value={delivery?.comment}
            />
            
            <TouchableOpacity style={Base.button} onPress={addDelivery}>
                <Text style={Typography.button}>
                    Create delivery
                </Text>
            </TouchableOpacity>
        </ScrollView>
    )
}

export default DeliveryForm