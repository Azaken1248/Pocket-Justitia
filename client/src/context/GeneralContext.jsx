import { createContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const GeneralContext = createContext();

export const GeneralProvider = ({ children }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [usertype, setUsertype] = useState("");
    const [username, setUsername] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const login = async () => {
        try {
            const response = await axios.post("/api/login", { email, password });
            const { token, userType, userName } = response.data;

            // Store in localStorage
            localStorage.setItem("token", token);
            localStorage.setItem("userType", userType);
            localStorage.setItem("username", userName);

            setUsertype(userType);
            setUsername(userName);
            setError("");

            // Navigate based on userType
            if (userType === "lawyer") navigate("/lawyer-dashboard");
            else if (userType === "judge") navigate("/judge-dashboard");
            else navigate("/home");

        } catch (err) {
            console.error(err);
            setError("Invalid email or password");
        }
    };

    //Registration
    const register = async () => {
        try {
            const response = await axios.post("/api/register", {
                username, email, password, usertype,
            });
            console.log("Registration successful:", response.data);
            navigate("/login");
        } catch (err) {
            console.error(err);
            setError("Failed to register. Try again.");
        }
    };

    // Logout
    const logout = () => {
        localStorage.clear();
        setEmail("");
        setPassword("");
        setUsertype("");
        setUsername("");
        console.log("Logged out");
        navigate("/login");
    };

    return (
        <GeneralContext.Provider value={{
            email, setEmail,
            password, setPassword,
            usertype, setUsertype,
            username, setUsername,
            login, register, logout,
            error
        }}>
            {children}
        </GeneralContext.Provider>
    );
};
