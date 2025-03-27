import React, { useState, useContext } from "react";
import { GeneralContext } from "../context/GeneralContext";
import "../styles/UserPage.css";

const UserPage = () => {
    const { caseDetails, addCase, setCaseDetails } = useContext(GeneralContext);
    const [nextCourtDate, setNextCourtDate] = useState("2025-04-15"); // Dummy next court date

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

    // Handle Form Change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewCase({ ...newCase, [name]: value });
    };

    // Handle Form Submit
    const handleSubmit = (e) => {
        e.preventDefault();
        if (newCase.caseNumber && newCase.title && newCase.description) {
            addCase({ ...newCase });
            alert("Case added successfully!");
            setNewCase({ // Reset form
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
        } else {
            alert("Please fill in all fields!");
        }
    };

    // Move Case to Past Cases
    const handleMoveToPast = (caseNumber) => {
        if (window.confirm("Are you sure you want to mark this case as closed?")) {
            setCaseDetails(prevDetails => {
                // Split current and past cases
                const updatedCases = prevDetails.map(caseItem => {
                    if (caseItem.caseNumber === caseNumber) {
                        return { ...caseItem, status: "Closed", lastUpdated: new Date().toISOString().split('T')[0] };
                    }
                    return caseItem;
                });
                return updatedCases;
            });
        }
    };

    // Move Case to Current Cases
    const handleReopenCase = (caseNumber) => {
        if (window.confirm("Are you sure you want to reopen this case?")) {
            setCaseDetails(prevDetails => {
                const updatedCases = prevDetails.map(caseItem => {
                    if (caseItem.caseNumber === caseNumber) {
                        return { ...caseItem, status: "Ongoing", lastUpdated: new Date().toISOString().split('T')[0] };
                    }
                    return caseItem;
                });
                return updatedCases;
            });
        }
    };

    // Filter Cases
    const currentCases = caseDetails.filter(caseItem => caseItem.status !== "Closed");
    const pastCases = caseDetails.filter(caseItem => caseItem.status === "Closed");

    return (
        <div className="user-page-container">
            <h2 className="page-title">User Dashboard</h2>

            <div className="card-container">
                {/* Add Case Card */}
                <div className="card">
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
                            <option value="Judgement">Judgement</option>
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
                                    <button 
                                        className="move-button" 
                                        onClick={() => handleMoveToPast(caseItem.caseNumber)}
                                    >
                                        Mark as Closed
                                    </button>
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
                                    <strong>{caseItem.title}</strong> - {caseItem.status}
                                    <button 
                                        className="move-button" 
                                        onClick={() => handleReopenCase(caseItem.caseNumber)}
                                    >
                                        Reopen Case
                                    </button>
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

            {/* Next Court Date */}
            <div className="next-court-date">
                <h4>Next Court Date</h4>
                <p>{new Date(nextCourtDate).toLocaleDateString()}</p>
            </div>
        </div>
    );
};

export default UserPage;
