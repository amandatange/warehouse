import { View, Text, TextInput, Button, TouchableOpacity } from "react-native";
import { Typography, Forms, Base } from "../../styles";

const AuthFields = ({ auth, setAuth, submit, title, navigation }) => {
    return (
        <View style={Base.base}>
            <Text style={Typography.header2}>{title}</Text>

            <Text>Email</Text>
            <TextInput style={Forms.input}
                onChangeText={(content:string) => {
                    setAuth({ ...auth, email: content})
                }}
                value={auth?.email}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCompleteType="off"
                autoCorrect={false}
            />

            <Text>Password</Text>
            <TextInput style={Forms.input}
                onChangeText={(content:string) => {
                    setAuth({ ...auth, password: content})
                }}
                value={auth?.password}
                secureTextEntry={true}
                autoCapitalize="none"
                autoCompleteType="off"
                autoCorrect={false}
            />

            <TouchableOpacity style={Base.button} onPress={submit}>
                <Text style={Typography.button}>{title}</Text>
            </TouchableOpacity>

            {title === "Log in" &&
                <TouchableOpacity style={Base.button} onPress={() => navigation.navigate("Register")}>
                    <Text style={Typography.button}>Register new user</Text>
                </TouchableOpacity>
            }
        </View>

    )
};

export default AuthFields;