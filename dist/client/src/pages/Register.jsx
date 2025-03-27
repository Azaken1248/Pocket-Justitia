import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Register.css";

const apiUrl = 'http://localhost:3000';

const Register = () => {
    const [userType, setLocalUserType] = useState("normal");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [specialization, setSpecialization] = useState("");
    const [experienceYears, setExperienceYears] = useState("");
    const [licenseNumber, setLicenseNumber] = useState("");
    const [courtName, setCourtName] = useState("");
    const [judgeExperience, setJudgeExperience] = useState("");
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

    const signup = async () => {
        const data = {
            username,
            passwordHash: password,
            email,
            userType
        };

        if (userType === 'lawyer') {
            data.lawyerInfo = {
                specialization,
                experienceYears: parseInt(experienceYears),
                licenseNumber
            };
        } else if (userType === 'judge') {
            data.judgeInfo = {
                courtName,
                yearsOfExperience: parseInt(judgeExperience)
            };
        }

        const result = await fetchData('/auth/signup', 'POST', data);
        if (result) {
            alert('Signup Successful!');
            navigate('/login');
        } else {
            alert('Signup Failed: ' + (result?.message || 'Unknown error'));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        signup();
    };

    return (
        <div className="register-container">
            <h2 className="auth-heading">Register</h2>
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

                {userType === 'lawyer' && (
                    <>
                        <div className="form-group">
                            <label>Specialization</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter your specialization"
                                onChange={(e) => setSpecialization(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label>Years of Experience</label>
                            <input
                                type="number"
                                className="form-control"
                                placeholder="Enter your years of experience"
                                onChange={(e) => setExperienceYears(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label>License Number</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter your license number"
                                onChange={(e) => setLicenseNumber(e.target.value)}
                            />
                        </div>
                    </>
                )}

                {userType === 'judge' && (
                    <>
                        <div className="form-group">
                            <label>Court Name</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter court name"
                                onChange={(e) => setCourtName(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label>Years of Experience</label>
                            <input
                                type="number"
                                className="form-control"
                                placeholder="Enter years of experience"
                                onChange={(e) => setJudgeExperience(e.target.value)}
                            />
                        </div>
                    </>
                )}

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