import { DataTable } from "react-native-paper";
import invoiceModel from "../../models/invoices";

import { useEffect, useState } from "react";
import { Base, Typography } from "../../styles";
import storage from "../../models/storage";
import { ScrollView, Text, TouchableOpacity } from "react-native";

import Invoice from "../../interfaces/invoice";

const InvoicesList = ({ route, navigation, setIsLoggedIn }) => {
    const { reload } = route.params || false;
    const [allInvoices, setAllInvoices] = useState<Invoice[]>([]);

    const reloadInvoices = async () => {
        setAllInvoices(await invoiceModel.getInvoices());
        // console.log("all invoices", allInvoices)
    }

    if (reload) {
        reloadInvoices();
    }

    useEffect(() => {
        reloadInvoices();
    }, [])

    const logOut = async () => { 
        storage.deleteToken();
        setIsLoggedIn(false);
    }

    const invoicesRows = allInvoices.map((invoice, index) => {
        return (
            <DataTable.Row key={index}>
                <DataTable.Cell>
                    {invoice.name}
                </DataTable.Cell>
                <DataTable.Cell numeric>
                    {invoice.total_price}
                </DataTable.Cell>
                <DataTable.Cell>
                    {invoice.due_date}
                </DataTable.Cell>
            </DataTable.Row>
            )
    });

    // const animals = [
    //     { name: "elephant", legs: 4, color: "grey"},
    //     { name: "kangaroo", legs: 2, color: "brown"},
    //     { name: "spider", legs: 8, color: "black"},
    // ];

    // const animalTable = animals.map((animal, index) => {
    //     return (
    //         <DataTable.Row key={index}>
    //             <DataTable.Cell>{animal.name}</DataTable.Cell>
    //             <DataTable.Cell numeric>{animal.legs}</DataTable.Cell>
    //             <DataTable.Cell>{animal.color}</DataTable.Cell>
    //         </DataTable.Row>
    //     );
    // });

    return (
        <ScrollView style={Base.base}>
            <Text style={Typography.header2}>Invoices</Text>

            <DataTable>
                <DataTable.Header>
                    <DataTable.Title>Name</DataTable.Title>
                    <DataTable.Title>Cost</DataTable.Title>
                    <DataTable.Title>Due</DataTable.Title>
                </DataTable.Header>
                {invoicesRows}
                {/* {animalTable} */}
            </DataTable>

            <TouchableOpacity style={Base.button} onPress={() => navigation.navigate("Form")}>
                <Text style={Typography.button}>
                    Create new invoice
                </Text>
            </TouchableOpacity>

            <TouchableOpacity style={Base.button} onPress={async () => await logOut()}>
                <Text style={Typography.button}>
                    Log out
                </Text>
            </TouchableOpacity>
        </ScrollView>
    )

};


export default InvoicesList;