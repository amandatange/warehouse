import { useState } from "react";
import { showMessage } from 'react-native-flash-message';

import Auth from "../../interfaces/auth";
import authModel from "../../models/auth";
import { Base } from "../../styles";
import AuthFields from "./AuthFields";



const Login = ({ navigation, setIsLoggedIn }) => {
    const [auth, setAuth] = useState<Partial<Auth>>({});

    const doLogin = async () => {
        if (auth.email && auth.password) {
            const result = await authModel.login(auth.email, auth.password);
            if (result.type === "success") {
                setIsLoggedIn(true);
            }
            showMessage(result)
            // else {
            //     showMessage({
            //         message: "Invalid input",
            //         description: "Email or password incomplete",
            //         type: "warning"
            //     })
            // }
        } else {
            showMessage({
                message: "Invalid input",
                description: "Email or password incomplete",
                type: "warning"
            })
        }
    }

    return (
        <AuthFields style={Base.container}
            auth={auth}
            setAuth={setAuth}
            submit={doLogin}
            title="Log in"
            navigation={navigation}
        />
    )
};

export default Login;