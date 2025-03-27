import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";

const apiUrl = 'http://localhost:3000';

const Login = () => {
    const [userType, setLocalUserType] = useState("normal");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const fetchData = async (endpoint, method, data) => {
        try {
            const response = await fetch(`${apiUrl}${endpoint}`, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });
            const result = await response.json();
            return result;
        } catch (error) {
            console.error('Error:', error);
            return null;
        }
    };

    const login = async () => {
        const data = { username, passwordHash: password };
        const result = await fetchData('/auth/login', 'POST', data);
        if (result && result.token) {

            alert('Login Successful!');
            if(result.user.userType === "normal"){
                navigate('/user');
            }else if(result.user.userType === "lawyer"){
                navigate('/lawyer');
            }else{
                navigate('/judge');
            }
            
        } else {
            alert('Login Failed: ' + (result?.message || 'Unknown error'));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        login();
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
