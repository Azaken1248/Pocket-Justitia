import React, { useState, useContext } from "react";
import { GeneralContext } from "../context/GeneralContext";
import "../styles/UserPage.css";

const LawyerPage = () => {
    const { caseDetails } = useContext(GeneralContext);
    const [nextCourtDate, setNextCourtDate] = useState("2025-04-15"); // Dummy next court date

    // Dummy Past Cases
    const pastCases = [
        {
            caseNumber: "001",
            title: "Property Dispute",
            status: "Closed",
            lastUpdated: "2024-12-10",
        },
        {
            caseNumber: "002",
            title: "Financial Fraud",
            status: "Closed",
            lastUpdated: "2025-01-22",
        },
    ];

    // Function to Pick a Case
    const handlePickCase = (caseNumber) => {
        alert(`You have picked case #${caseNumber}`);
    };

    return (
        <div className="lawyer-page-container">
            <h2 className="page-title">Lawyer Dashboard</h2>

            <div className="card-container">
                {/* Current Cases Card */}
                <div className="card">
                    <h3>Current Cases</h3>
                    {caseDetails.length > 0 ? (
                        <ul>
                            {caseDetails.map((caseItem) => (
                                <li key={caseItem.caseNumber}>
                                    <strong>{caseItem.title}</strong> - {caseItem.status}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No current cases.</p>
                    )}
                </div>

                {/* Past Cases Card */}
                <div className="card">
                    <h3>Past Cases</h3>
                    {pastCases.length > 0 ? (
                        <ul>
                            {pastCases.map((caseItem) => (
                                <li key={caseItem.caseNumber}>
                                    <strong>{caseItem.title}</strong> - {caseItem.status}
                                    <br />
                                    <span className="date">Last Updated: {caseItem.lastUpdated}</span>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No past cases.</p>
                    )}
                </div>

                {/* Contact Client Card */}
                <div className="card">
                    <h3>Contact Client</h3>
                    <p>Need to reach out to a client?</p>
                    <button className="btn-primary">Contact Now</button>
                </div>

                {/* Pick Case Card */}
                <div className="card">
                    <h3>Pick Case</h3>
                    {caseDetails.length > 0 ? (
                        <ul>
                            {caseDetails.map((caseItem) => (
                                <li key={caseItem.caseNumber}>
                                    <strong>{caseItem.title}</strong>
                                    <button
                                        className="btn-primary pick-button"
                                        onClick={() => handlePickCase(caseItem.caseNumber)}
                                    >
                                        Pick Case
                                    </button>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No available cases to pick.</p>
                    )}
                </div>
            </div>

            {/* Next Court Date Section */}
            <div className="next-court-date">
                <h4>Next Court Date</h4>
                <p>{new Date(nextCourtDate).toLocaleDateString()}</p>
            </div>
        </div>
    );
};

export default LawyerPage;
