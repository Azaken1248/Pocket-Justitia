import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { useNavigate } from 'react-router-dom';
import '../styles/Landing.css';
import { recentFamousCases } from '../context/recentFamousCases';
import logo from '../assets/Icon.svg';
import lightbulb from '../assets/lightbulb.svg';
import ministry from '../assets/minestry.svg';
import law from '../assets/law.svg';
import constitution from '../assets/constitution.svg'

const lawyerQuotes = {
  inspirational: [
    "The leading rule for the lawyer, as for the man of every calling, is diligence. - Abraham Lincoln",
    "Justice delayed is justice denied. - William Ewart Gladstone",
    "Injustice anywhere is a threat to justice everywhere. - Martin Luther King Jr.",
    "The power of the lawyer is in the uncertainty of the law. - Jeremy Bentham"
  ],
  philosophical: [
    "The law is reason, free from passion. - Aristotle",
    "The law is the public conscience. - Thomas Hobbes",
    "Laws are spider webs through which the big flies pass and the little ones get caught. - Honoré de Balzac",
    "To live outside the law, you must be honest. - Bob Dylan"
  ]
};


const wordWeights = {
  "ban": 9.0,
  "spyware": 8.5,
  "marriage": 8.0,
  "court": 7.5,
  "constitution": 7.0,
  "government": 6.5,
  "law": 6.0,
  "rights": 5.5,
  "appeal": 5.0,
  "reform": 4.5,
  "policy": 4.0
};

const calculatePriority = (title) => {
  if (!title) return 0.0;

  const words = title.toLowerCase().split(/\s+/);
  const totalWeight = words.reduce((sum, word) => sum + (wordWeights[word] || 1.0), 0);


  const normalizedScore = Math.log1p(totalWeight) * 2; 

  return Math.min(Math.max(normalizedScore.toFixed(2), 0), 10); 
};

const getRandomQuote = () => {
  const categories = Object.keys(lawyerQuotes);
  const randomCategory = categories[Math.floor(Math.random() * categories.length)];
  const quotes = lawyerQuotes[randomCategory];
  return quotes[Math.floor(Math.random() * quotes.length)];
};

const Landing = () => {
  const navigate = useNavigate();
  const [quote, setQuote] = useState("");
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedCase, setSelectedCase] = useState(null);

  useEffect(() => {
    setQuote(getRandomQuote());
  }, []);

  const handleCaseClick = (caseItem) => {
    setSelectedCase(caseItem);
    fetchSummary(caseItem.description);
  };

  const fetchSummary = async (caseDescription) => {
    setLoading(true);
    try {
      const response = await fetch('https://api.justicia.azaken.com/gemini/generate-summary', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ caseDescription })
      });
      const data = await response.json();
      setSummary(data.summary);
    } catch (error) {
      console.error('Error fetching summary:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    <div className="landing-container">
      <div className="left-section">
      <img src={logo} width={"150px"}></img>
      <h1 className="landing-title">JUSTICIA</h1>
      <p className="landing-quote">"{quote}"</p>

      <div className="link-container">
      <div className="top-row">
        <div onClick={() => window.open("https://lawmin.gov.in/")}>
          <a href="https://lawmin.gov.in/" target="_blank" rel="noopener noreferrer">Ministry of Law</a>
          <img src={ministry} width={"40px"} />
        </div>
        <div onClick={() => window.open("https://www.india.gov.in/topics/law-justice")}>
          <a href="https://www.india.gov.in/topics/law-justice" target="_blank" rel="noopener noreferrer">Law & Justice</a>
          <img src={law} width={"90px"} />
      </div>
</div>

<div className="bottom-row">
  <div onClick={() => window.open("https://legislative.gov.in/constitution-of-india/")}>
    <a href="https://legislative.gov.in/constitution-of-india/" target="_blank" rel="noopener noreferrer">Download Constitution</a>
    <img src={constitution} width={"60px"} />
  </div>
</div>
      </div>

    </div>

    <div className="right-section">
          <h2>Current Famous Cases</h2>
          <div className="cases-list">
            {recentFamousCases.map((caseItem, index) => (
              <div 
                key={index} 
                className="case-item" 
                onClick={() => handleCaseClick(caseItem)}
              >
                <div className="case-header">
                  <h3>{caseItem.title}</h3>
                  <p>{caseItem.description}</p>
                </div>
                <div className='case-content'>
                  <div className='bulb-container'>
                    <img src={lightbulb} width={"60px"} className='bulb-image' alt="Priority indicator" />
                    <span className='bulb-text'>{calculatePriority(caseItem.title)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
    </div>

    {loading && (
      <div className="loading-overlay">
        <div className="spinner"></div>
        <p>⏳ Generating summary, please wait...</p>
      </div>
    )}

{summary && (
        <div className="summary-overlay">
          <div className="summary-content">
            <h3>Case Summary</h3>
            <ReactMarkdown>{summary}</ReactMarkdown>
            <button 
              className="view-details-btn"
              onClick={() => navigate(`/cases/${selectedCase.id}`, { state: { caseData: selectedCase } })}
            >
              View Full Case Details
            </button>
            <button className="close-button" onClick={() => setSummary(null)}>×</button>
          </div>
        </div>
      )}
    </>
  );
};

export default Landing;
