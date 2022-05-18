import { View, Text, TextInput, Button, TouchableOpacity } from "react-native";
import { showMessage } from "react-native-flash-message";

import { Typography, Forms, Base } from "../../styles";

const AuthFields = ({ auth, setAuth, submit, title, navigation }) => {

    const validatePassword = (password: string) => {
        const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{4,30}$/;
        
        if (!password.match(pattern)) {
            showMessage({
                message: "Invalid password",
                description: "Must contain 4-30 characters. Min 1 uppercase letter, 1 lowercase letter, 1 special character, 1 number.",
                type: "warning"
            })
            return false
        }
        return true
    }

    const validateEmail = (email: string) => {
        const pattern =  	
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        
        if (!email.match(pattern)) {
            showMessage({
                message: "Invalid email address",
                description: "Email must follow general email format e.g. 'email@email.com'",
                type: "warning"
            })
            return false
        }
        return true
    }

    const onSubmit = () => {
        if (validateEmail(auth.email) && validatePassword(auth.password)) {
            submit();
        }
    }

    return (
        <View style={Base.base}>
            <Text style={Typography.header2}>{title}</Text>

            <Text>Email</Text>
            <TextInput style={Forms.input}
                onChangeText={(content:string) => {
                    validateEmail(content)
                    setAuth({ ...auth, email: content})
                }}
                value={auth?.email}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCompleteType="off"
                autoCorrect={false}
                testID="email-field"
            />

            <Text>Password</Text>
            <TextInput style={Forms.input}
                onChangeText={(content:string) => {
                    validatePassword(content)
                    setAuth({ ...auth, password: content})
                }}
                value={auth?.password}
                secureTextEntry={true}
                autoCapitalize="none"
                autoCompleteType="off"
                autoCorrect={false}
                testID="password-field"
            />

            <TouchableOpacity style={Base.button} onPress={onSubmit} accessibilityLabel={`${title} by pressing this button`}>
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