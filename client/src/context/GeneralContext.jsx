import { createContext, useState } from "react";

export const GeneralContext = createContext();

export const GeneralProvider = ({ children }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [usertype, setUsertype] = useState("");
    const [username, setUsername] = useState("");

    const login = () => {
        console.log("Logging in with", { email, password });
    };

    const register = () => {
        console.log("Registering", { username, email, password, usertype });
    };

    const logout = () => {
        console.log("Logging out");
    };

    return (
        <GeneralContext.Provider value={{
            email, setEmail,
            password, setPassword,
            usertype, setUsertype,
            username, setUsername,
            login, register, logout
        }}>
            {children}
        </GeneralContext.Provider>
    );
};