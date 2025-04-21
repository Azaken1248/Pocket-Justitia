import React, { useState, useContext } from "react";
import { GeneralContext } from "../context/GeneralContext";
import "../styles/UserPage.css";

const UserPage = () => {
    const { caseDetails, addCase } = useContext(GeneralContext);
    const [nextCourtDate] = useState("2025-04-15"); // Static next court date

    const [newCase, setNewCase] = useState({
        caseNumber: "",
        title: "",
        description: "",
        status: "Ongoing",
        filedDate: "",
        lastUpdated: new Date().toISOString().split('T')[0],
        normalUserId: "12345",
        againstUserId: "54321",
        lawyerId: "67890",
        judgeId: "98765",
        progressTimeline: []
    });

    // Dummy Data for Past Cases
    const dummyPastCases = [
        {
            caseNumber: "C123",
            title: "Kamath Theft Case",
            description: "Allegations of Theft.",
            status: "Closed",
            filedDate: "2024-02-15",
            lastUpdated: "2024-08-20",
            normalUserId: "12345",
            againstUserId: "54321",
            lawyerId: "67890",
            judgeId: "98765",
            progressTimeline: ["Filed", "In Hearing", "Judgment", "Closed"]
        },
        {
            caseNumber: "C124",
            title: "Velachery Contract Breach",
            description: "Breach of business contract.",
            status: "Closed",
            filedDate: "2023-10-05",
            lastUpdated: "2024-01-12",
            normalUserId: "12345",
            againstUserId: "54321",
            lawyerId: "67890",
            judgeId: "98765",
            progressTimeline: ["Filed", "Mediation", "Closed"]
        }
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewCase(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (newCase.caseNumber && newCase.title && newCase.description) {
            addCase({ ...newCase });
            alert("Case added successfully!");
            setNewCase({
                ...newCase,
                caseNumber: "",
                title: "",
                description: "",
                filedDate: ""
            });
        } else {
            alert("Please fill in all fields!");
        }
    };

    const currentCases = caseDetails.filter(caseItem => caseItem.status !== "Closed");
    const pastCases = [...caseDetails.filter(caseItem => caseItem.status === "Closed"), ...dummyPastCases];

    return (
        <div className="user-page-container">
            <h2 className="page-title">User Dashboard</h2>
            
            <div className="next-court-date">
                <h4>Next Court Date</h4>
                <p>{new Date(nextCourtDate).toLocaleDateString()}</p>
            </div>

            <div className="card-container">
                {/* Add Case Card */}
                <div className="card add-case-card">
                    <h3>Add Case</h3>
                    <form onSubmit={handleSubmit}>
                        <input 
                            type="text" 
                            name="caseNumber" 
                            placeholder="Case Number" 
                            value={newCase.caseNumber} 
                            onChange={handleChange} 
                            required 
                        />
                        <input 
                            type="text" 
                            name="title" 
                            placeholder="Case Title" 
                            value={newCase.title} 
                            onChange={handleChange} 
                            required 
                        />
                        <textarea 
                            name="description" 
                            placeholder="Case Description" 
                            value={newCase.description} 
                            onChange={handleChange} 
                            required 
                        />
                        <input 
                            type="date" 
                            name="filedDate" 
                            value={newCase.filedDate} 
                            onChange={handleChange} 
                            required 
                        />
                        <select 
                            name="status" 
                            value={newCase.status} 
                            onChange={handleChange}
                            required
                        >
                            <option value="Ongoing">Ongoing</option>
                            <option value="In Hearing">In Hearing</option>
                            <option value="Evidence Submission">Evidence Submission</option>
                            <option value="Judgment">Judgment</option>
                            <option value="Closed">Closed</option>
                        </select>
                        <button type="submit">Submit</button>
                    </form>
                </div>

                {/* Current Cases Card */}
                <div className="card">
                    <h3>Current Cases</h3>
                    {currentCases.length > 0 ? (
                        <ul>
                            {currentCases.map((caseItem) => (
                                <li key={caseItem.caseNumber}>
                                    <strong>{caseItem.title}</strong> - {caseItem.status}
                                </li>
                            ))}
                        </ul>
                    ) : <p>No current cases.</p>}
                </div>

                {/* Past Cases Card */}
                <div className="card">
                    <h3>Past Cases</h3>
                    {pastCases.length > 0 ? (
                        <ul>
                            {pastCases.map((caseItem) => (
                                <li key={caseItem.caseNumber}>
                                    <div>
                                        <strong>{caseItem.title}</strong> - {caseItem.status} (Last Updated: {caseItem.lastUpdated})
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : <p>No past cases.</p>}
                </div>

                {/* Contact Lawyer Card */}
                <div className="card">
                    <h3>Contact Lawyer</h3>
                    <p>Need help with your case?</p>
                    <button onClick={() => alert("Contacting Lawyer...")}>
                        Contact Now
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UserPage;