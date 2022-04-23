import { createNativeStackNavigator } from "@react-navigation/native-stack";

import InvoicesList from "./InvoicesList";
import InvoicesForm from "./InvoicesForm";

const Stack = createNativeStackNavigator();

const Invoices = (props) => {
    return (
        <Stack.Navigator initialRouteName="InvoicesList">
            <Stack.Screen name="InvoicesList">
                {(screenProps) => <InvoicesList {...screenProps} setIsLoggedIn={props.setIsLoggedIn} />}
            </Stack.Screen>
            <Stack.Screen name="Form" component={InvoicesForm} />
        </Stack.Navigator>
    )
};

export default Invoices;