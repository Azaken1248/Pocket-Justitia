import React, { useContext, useState } from "react";
import { GeneralContext } from "../context/GeneralContext";
import { useNavigate } from "react-router-dom";
import "../styles/Register.css";

const Register = () => {
    const { register, setUsertype, setUsername, setEmail, setPassword } = useContext(GeneralContext);
    const [userType, setLocalUserType] = useState("normal");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        setUsertype(userType);
        register();
    };

    return (
        <div className="register-container">
            <h2 className = "auth-heading">Register</h2>
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
                    <label>Email</label>
                    <input
                        type="email"
                        className="form-control"
                        placeholder="Enter your email"
                        onChange={(e) => setEmail(e.target.value)}
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
                    <button type="submit" className="btn btn-primary">Register</button>
                </div>

                <div className="login-link">
                    <p>
                        Already Registered?{" "}
                        <span onClick={() => navigate("/login")} className="hyperlink">
                            Login
                        </span>
                    </p>
                </div>
            </form>
        </div>
    );
};

export default Register;
