import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const GeneralContext = createContext();

export const GeneralProvider = ({ children }) => {
    // Authentication States
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [usertype, setUsertype] = useState("");
    const [username, setUsername] = useState("");
    const [error, setError] = useState("");

    // Case Management States
    const [caseDetails, setCaseDetails] = useState([]);
    const navigate = useNavigate();

    // Dummy Case Data
    const sampleCaseDetails = [
        {
            caseNumber: "C001",
            title: "Property Dispute",
            description: "A property ownership conflict between two parties.",
            status: "Ongoing",
            filedDate: "2023-06-15",
            lastUpdated: "2023-09-20",
            normalUserId: "12345",
            againstUserId: "54321",
            lawyerId: "67890",
            judgeId: "98765",
            progressTimeline: [
                { date: "2023-06-15", status: "Filed", remarks: "Case officially filed." },
                { date: "2023-07-01", status: "In Hearing", remarks: "First hearing conducted." },
                { date: "2023-08-15", status: "Evidence Submitted", remarks: "Evidence reviewed." },
                { date: "2023-09-20", status: "Judgement", remarks: "Final verdict delivered." }
            ]
        },
        {
            caseNumber: "C002",
            title: "Breach of Contract",
            description: "Business contract breach between two companies.",
            status: "Pending",
            filedDate: "2023-10-01",
            lastUpdated: "2023-10-15",
            normalUserId: "12346",
            againstUserId: "54322",
            lawyerId: "67891",
            judgeId: "98766",
            progressTimeline: [
                { date: "2023-10-01", status: "Filed", remarks: "Case filed by plaintiff." }
            ]
        }
    ];

    // Initialize with Dummy Data
    useEffect(() => {
        setCaseDetails(sampleCaseDetails);
    }, []);

    // Get Case by ID
    const getCaseById = (caseId) => {
        return caseDetails.find(caseItem => caseItem.caseNumber === caseId) || null;
    };

    // Add New Case
    const addCase = (newCase) => {
        setCaseDetails([...caseDetails, newCase]);
    };

    // Remove Case by ID (Optional)
    const removeCase = (caseId) => {
        setCaseDetails(caseDetails.filter(caseItem => caseItem.caseNumber !== caseId));
    };

    // Login Function
    const login = async () => {
        try {
            const response = await axios.post("/api/login", { email, password });
            const { token, userType, userName } = response.data;

            // Store in Local Storage
            localStorage.setItem("token", token);
            localStorage.setItem("userType", userType);
            localStorage.setItem("username", userName);

            // Update States
            setUsertype(userType);
            setUsername(userName);
            setError("");

            // Navigate to Dashboard
            if (userType === "lawyer") navigate("/lawyer-dashboard");
            else if (userType === "judge") navigate("/judge-dashboard");
            else navigate("/home");
        } catch (err) {
            console.error(err);
            setError("Invalid email or password");
        }
    };

    // Register Function
    const register = async () => {
        try {
            const response = await axios.post("/api/register", {
                username,
                email,
                password,
                usertype,
            });
            console.log("Registration successful:", response.data);
            navigate("/login");
        } catch (err) {
            console.error(err);
            setError("Failed to register. Try again.");
        }
    };

    // Logout Function
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
            // Authentication
            email, setEmail,
            password, setPassword,
            usertype, setUsertype,
            username, setUsername,
            login, register, logout,
            error,

            // Case Management
            caseDetails,
            getCaseById,
            addCase,
            removeCase
        }}>
            {children}
        </GeneralContext.Provider>
    );
};

export default GeneralContext;
