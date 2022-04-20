import { View, Text, TextInput, Button } from "react-native";
import { Typography, Forms, Base } from "../../styles";

const AuthFields = ({ auth, setAuth, submit, title, navigation }) => {
    return (
        <View>
            <Text>{title}</Text>

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

            <Button
                title={title}
                onPress={() => {
                    submit();
                }}
            />

            {title === "Log in" &&
                <Button
                    title="No account? Press here to register"
                    onPress={() => {
                        navigation.navigate("Register")
                        }
                    }
                />
            }
        </View>

    )
};

export default AuthFields;