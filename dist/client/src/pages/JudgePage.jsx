import React, { useContext, useState } from "react";
import { GeneralContext } from "../context/GeneralContext";
import "../styles/JudgePage.css";

const JudgePage = () => {
    const { caseDetails, setCaseDetails } = useContext(GeneralContext);
    const [nextCourtDate] = useState("2025-04-15"); // Dummy next court date

    // Mark Case as Completed
    const handleMarkAsComplete = (caseNumber) => {
        if (window.confirm("Are you sure you want to mark this case as complete?")) {
            setCaseDetails(prevDetails => {
                const updatedCases = prevDetails.map(caseItem => 
                    caseItem.caseNumber === caseNumber 
                        ? { ...caseItem, status: "Closed" } 
                        : caseItem
                );
                return updatedCases;
            });
            alert("Case marked as completed.");
        }
    };

    // Filter Cases
    const currentCases = caseDetails.filter(caseItem => caseItem.status !== "Closed");
    const pastCases = [
        ...caseDetails.filter(caseItem => caseItem.status === "Closed"),
        // Adding 7 more dummy past cases
        { caseNumber: "P001", title: "Tax Fraud", status: "Closed", filedDate: "2023-01-15" },
        { caseNumber: "P002", title: "Theft", status: "Closed", filedDate: "2023-03-20" },
        { caseNumber: "P003", title: "Cyber Crime", status: "Closed", filedDate: "2022-11-10" },
        { caseNumber: "P004", title: "Property Dispute", status: "Closed", filedDate: "2024-05-05" },
        { caseNumber: "P005", title: "Breach of Contract", status: "Closed", filedDate: "2023-09-12" },
        { caseNumber: "P006", title: "Trademark Violation", status: "Closed", filedDate: "2022-08-21" },
        { caseNumber: "P007", title: "Illegal Possession", status: "Closed", filedDate: "2024-01-14" }
    ];

    return (
        <div className="judge-page-container">
            <h2 className="page-title">Judge Dashboard</h2>

            <div className="card-container">
                {/* Current Cases Card */}
                <div className="card">
                    <h3>Current Cases</h3>
                    {currentCases.length > 0 ? (
                        <ul>
                            {currentCases.map((caseItem) => (
                                <li key={caseItem.caseNumber}>
                                    <strong>{caseItem.title}</strong> - {caseItem.status}
                                    <button 
                                        className="mark-complete-button" 
                                        onClick={() => handleMarkAsComplete(caseItem.caseNumber)}
                                    >
                                        Mark as Complete
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
                                </li>
                            ))}
                        </ul>
                    ) : <p>No past cases.</p>}
                </div>

                {/* Next Court Date */}
                <div className="next-court-date">
                    <h4>Next Court Date</h4>
                    <p>{new Date(nextCourtDate).toLocaleDateString()}</p>
                </div>
            </div>
        </div>
    );
};

export default JudgePage;
