import { useState } from "react";

import Auth from "../../interfaces/auth";
import authModel from "../../models/auth";
import AuthFields from "./AuthFields";

const Register = ({ navigation }) => {
    const [auth, setAuth] = useState<Partial<Auth>>({});

    const doRegister = async () => {
        if (auth.email && auth.password) {
            const result = await authModel.register(auth.email, auth.password);
            navigation.navigate("Login");
        }
    }

    return (
        <AuthFields
            auth={auth}
            setAuth={setAuth}
            submit={doRegister}
            title="Register"
            navigation={navigation}
        />
    )
};

export default Register;