import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import '../styles/CaseDetails.css';
import { recentFamousCases } from '../context/recentFamousCases';

const CaseDetails = () => {
    const { caseId } = useParams();
    const location = useLocation();
    const [caseData, setCaseData] = useState(null);

    useEffect(() => {
        if (location.state?.caseData) {
            setCaseData(location.state.caseData);
        } else {
            const foundCase = recentFamousCases.find(c => c.id === caseId);
            setCaseData(foundCase || null);
        }
    }, [caseId, location.state]);

    if (!caseData) {
        return <div className="loading-container">Loading case details...</div>;
    }

    // Helper function to format dates
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    return (
        <div className="case-details-container">
            <h2 className="case-title">{caseData.title}</h2>
            <div className="case-meta">
                <p><strong>Case Number:</strong> {caseData.caseNumber}</p>
                <p><strong>Status:</strong> <span className={`status-${caseData.status.toLowerCase()}`}>{caseData.status}</span></p>
                <p><strong>Filed Date:</strong> {formatDate(caseData.filedDate)}</p>
                <p><strong>Last Updated:</strong> {formatDate(caseData.lastUpdated)}</p>
            </div>

            <div className="case-description">
                <h3>Case Description</h3>
                <p>{caseData.description}</p>
            </div>

            <div className="involved-parties">
                <h3>Involved Parties</h3>
                <div className="parties-grid">
                    <div>
                        <p className="party-label">Petitioner</p>
                        <p className="party-name">{caseData.parties?.petitioner || "N/A"}</p>
                    </div>
                    <div>
                        <p className="party-label">Respondent</p>
                        <p className="party-name">{caseData.parties?.respondent || "N/A"}</p>
                    </div>
                </div>
            </div>

            <div className="case-timeline">
                <h3>Case Timeline</h3>
                {console.log(caseData)}
                {caseData.progressTimeline?.length > 0 ? (
                    <div className="timeline">
                        {caseData.progressTimeline.map((update, index) => (
                            <div className="timeline-item" key={index}>
                                <div className="timeline-dot"></div>
                                <div className="timeline-content">
                                    <p className="timeline-status">{update.status}</p>
                                    <p className="timeline-date">{formatDate(update.date)}</p>
                                    <p className="timeline-remarks">{update.remarks}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="no-timeline">No timeline updates available</p>
                )}
            </div>
        </div>
    );
};

export default CaseDetails;