import { useState, useEffect } from "react";
import { Platform, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { Base, Typography } from "../../styles";
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from "@react-native-community/datetimepicker";

import invoiceModel from "../../models/invoices";
import ordersModel from "../../models/orders";

import Invoice from "../../interfaces/invoice";
import Order from "../../interfaces/order";

const zeroPad = (number:number):string => {
    if (number < 10) {
        return "0" + number
    }
    return "" + number
}

const formatDate = (date: Date):string => {
    


    return `${date.getFullYear()}-${zeroPad(date.getMonth()+1)}-${zeroPad(date.getDate())}`;
}

const OrderDropDown = ({ invoice, setInvoice }) => {

    const [orders, setOrders] = useState<Order[]>([]);
    let productsHash: any = {};

    useEffect(async () => {
        setOrders(await ordersModel.getOrders());
    }, []);

    const ordersList = orders.filter(order => order.status === "Packad").map((order, index) => {
        return <Picker.Item key={index} label={order.name} value={order.id}
        />;
    });
    
    return (
        <Picker
            selectedValue={invoice?.order_id}
            onValueChange={(itemValue) => {
                setInvoice({ ...invoice, order_id: itemValue});
        }}>
            <Picker.Item key='unselectable' label='Choose an invoice' value={0} />
            {ordersList}
        </Picker>
    )
}

const DateDropDown = ({ invoice, setInvoice }) => {
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
                            setInvoice({
                                ...invoice,
                                creation_date: formatDate(date)
                            });
                            // setDelivery(date.toLocaleDateString('se-SV'))
                        }
                        // setShow(false)
                    }}
                    value={dropDownDate}
                />
            )}
        </View>
    );
}

const InvoicesForm = ({navigation, setProducts}) => {
    const [invoice, setInvoice] = useState<Partial<Invoice>>({});

    const createInvoice = async () => {
        await invoiceModel.createInvoice(invoice);

        navigation.navigate("InvoicesList", {reload: true});
    }

    const setDelivery = (date) => {
        invoice.creation_date = date
        console.log(invoice)
    }

    return (
        <ScrollView style={{ ...Base.base }}>
            <Text style={{ ...Typography.header2 }}>New invoice</Text>

            <Text style={{ ...Typography.label }}>Order</Text>
            <OrderDropDown
                invoice={invoice}
                setInvoice={setInvoice}
            />

            <Text style={{ ...Typography.label }}>Due by</Text>
            <DateDropDown
                // setDelivery={setDelivery}
                invoice={invoice}
                setInvoice={setInvoice}
            />

            <TouchableOpacity style={{ ...Base.button }} onPress={createInvoice}>
                <Text style={{ ...Typography.button }}>
                    Create invoice
                </Text>
            </TouchableOpacity>
        </ScrollView>
    )
};

export default InvoicesForm;