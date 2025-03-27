import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/CaseDetails.css';

const CaseDetails = () => {
    const { caseId } = useParams(); // Fetch the case ID from the URL
    const [caseData, setCaseData] = useState(null);

    useEffect(() => {
        // Dummy Data for Case Details
        const dummyCaseData = {
            caseNumber: "C-2025-001",
            title: "Property Dispute Case",
            description: "A legal dispute regarding land ownership.",
            status: "Ongoing",
            filedDate: "2025-03-01T10:00:00Z",
            lastUpdated: "2025-03-25T15:30:00Z",
            normalUserId: { username: "JohnDoe" },
            againstUserId: { username: "JaneDoe" },
            lawyerId: { name: "Amit Sharma" },
            judgeId: { name: "Neha Verma" },
            progressTimeline: [
                {
                    status: "Filed",
                    date: "2025-03-01T10:00:00Z",
                    remarks: "Case was filed by the plaintiff."
                },
                {
                    status: "In Hearing",
                    date: "2025-03-10T11:00:00Z",
                    remarks: "First hearing completed, evidence requested."
                },
                {
                    status: "Evidence Submission",
                    date: "2025-03-15T13:30:00Z",
                    remarks: "Plaintiff submitted land ownership documents."
                },
                {
                    status: "Judgement",
                    date: "2025-03-25T15:30:00Z",
                    remarks: "Final judgement scheduled."
                }
            ]
        };

        // Simulate API call with dummy data
        setCaseData(dummyCaseData);
    }, [caseId]);

    if (!caseData) {
        return <p>Loading case details...</p>;
    }

    return (
        <div className="case-details-container">
            <h2 className="case-title">{caseData.title}</h2>
            <p><strong>Case Number:</strong> {caseData.caseNumber}</p>
            <p><strong>Description:</strong> {caseData.description}</p>
            <p><strong>Status:</strong> {caseData.status}</p>
            <p><strong>Filed Date:</strong> {new Date(caseData.filedDate).toLocaleDateString()}</p>
            <p><strong>Last Updated:</strong> {new Date(caseData.lastUpdated).toLocaleDateString()}</p>
            
            <h3>Involved Parties</h3>
            <p><strong>Filed By:</strong> {caseData.normalUserId?.username || "N/A"}</p>
            <p><strong>Against:</strong> {caseData.againstUserId?.username || "N/A"}</p>
            <p><strong>Lawyer:</strong> {caseData.lawyerId?.name || "Not Assigned"}</p>
            <p><strong>Judge:</strong> {caseData.judgeId?.name || "Not Assigned"}</p>
            
            <h3>Progress Timeline</h3>
            {caseData.progressTimeline && caseData.progressTimeline.length > 0 ? (
                <div className="timeline">
                    {caseData.progressTimeline.map((update, index) => (
                        <div className="timeline-item" key={index}>
                            <div className="timeline-dot"></div>
                            <div className="timeline-content">
                                <p><strong>Status:</strong> {update.status}</p>
                                <p><strong>Date:</strong> {new Date(update.date).toLocaleDateString()}</p>
                                <p><strong>Remarks:</strong> {update.remarks || "No remarks"}</p>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p>No updates available.</p>
            )}
        </div>
    );
};

export default CaseDetails;
