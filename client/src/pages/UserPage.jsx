import React, { useState } from "react";
import "../styles/UserPage.css";

const UserPage = () => {
    const [nextCourtDate, setNextCourtDate] = useState("2025-04-15"); // Dummy next court date

    // Dummy Data for Current and Past Cases
    const currentCases = [
        { id: 1, title: "Property Dispute", status: "In Hearing" },
        { id: 2, title: "Divorce Settlement", status: "Evidence Submission" }
    ];

    const pastCases = [
        { id: 3, title: "Theft Case", status: "Closed" },
        { id: 4, title: "Breach of Contract", status: "Closed" }
    ];

    // Handle case submission
    const handleAddCase = (e) => {
        e.preventDefault();
        alert("Case added successfully!");
    };

    return (
        <div className="user-page-container">
            <h2 className="page-title">User Dashboard</h2>

            <div className="card-container">
                {/* Add Cases Card */}
                <div className="card">
                    <h3>Add Case</h3>
                    <form onSubmit={handleAddCase}>
                        <input type="text" placeholder="Case Title" required />
                        <textarea placeholder="Case Description" required></textarea>
                        <input type="date" placeholder="Filed Date" required />
                        <select required>
                            <option value="" disabled selected>Select Status</option>
                            <option value="Filed">Filed</option>
                            <option value="In Hearing">In Hearing</option>
                            <option value="Evidence Submission">Evidence Submission</option>
                            <option value="Judgement">Judgement</option>
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
                                <li key={caseItem.id}>
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
                                <li key={caseItem.id}>
                                    <strong>{caseItem.title}</strong> - {caseItem.status}
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
