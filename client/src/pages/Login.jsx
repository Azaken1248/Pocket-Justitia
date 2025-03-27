import React, { useContext, useState } from "react";
import { GeneralContext } from "../context/GeneralContext";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";

const Login = () => {
    const { login, setUsertype, setUsername, setPassword } = useContext(GeneralContext);
    const [userType, setLocalUserType] = useState("normal");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        setUsertype(userType);
        login();  // Call the login function (you can add error handling if needed)
        
        // Conditional Navigation Based on User Type
        if (userType === "normal") {
            navigate("/user");  // Redirect to User Homepage
        } else if (userType === "lawyer") {
            navigate("/lawyer");  // Redirect to Lawyer Homepage
        } else if (userType === "judge") {
            navigate("/judge");  // Redirect to Judge Homepage (if needed)
        }
    };

    return (
        <div className="login-container">
            <h2 className="auth-heading">Login</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>User Type</label>
                    <select
                        className="form-control"
                        value={userType}
                        onChange={(e) => setLocalUserType(e.target.value)}
                        required
                    >
                        <option value="normal">Normal User</option>
                        <option value="lawyer">Lawyer</option>
                        <option value="judge">Judge</option>
                    </select>
                </div>

                <div className="form-group">
                    <label>Username</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Enter your username"
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input
                        type="password"
                        className="form-control"
                        placeholder="Enter your password"
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

                <div className="btn-container">
                    <button type="submit" className="btn btn-primary">Login</button>
                </div>

                <div className="signup-link">
                    <p>
                        Not Registered?{" "}
                        <span onClick={() => navigate("/register")} className="hyperlink">
                            Signup
                        </span>
                    </p>
                </div>
            </form>
        </div>
    );
};

export default Login;
