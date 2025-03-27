import React, { useState, useEffect } from 'react';
import '../styles/Landing.css';
import logo from '../assets/logo.jpg'; // Import logo

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

// Recent Landmark Cases
const recentFamousCases = [
  {
    title: "Central Vista Project Case (2021)",
    description: "The Supreme Court upheld the government's decision to redevelop Central Vista in Delhi, citing no procedural lapses."
  },
  {
    title: "Pegasus Spyware Case (2022)",
    description: "The Supreme Court appointed a committee to investigate the alleged use of Pegasus spyware on Indian citizens."
  },
  {
    title: "Hijab Ban Case (2022)",
    description: "Karnataka High Court upheld the ban on wearing hijabs in educational institutions, sparking national debate on religious freedom."
  },
  {
    title: "Same-Sex Marriage Case (2023)",
    description: "Supreme Court heard arguments on the legal recognition of same-sex marriage, reflecting evolving societal values."
  }
];

// Function to get random quote
const getRandomQuote = () => {
  const categories = Object.keys(lawyerQuotes);
  const randomCategory = categories[Math.floor(Math.random() * categories.length)];
  const quotes = lawyerQuotes[randomCategory];
  return quotes[Math.floor(Math.random() * quotes.length)];
};

const Landing = () => {
  const [quote, setQuote] = useState("");

  useEffect(() => {
    setQuote(getRandomQuote());
  }, []);

  return (
    <div className="landing-container">
      <div className="left-section">
        <img src={logo} alt="Justicia Logo" className="logo-img" />
        <h1 className="landing-title">JUSTICIA</h1>
        <p className="landing-quote">"{quote}"</p>

        <div className="link-container">
          <a href="https://lawmin.gov.in/" target="_blank" rel="noopener noreferrer">Ministry of Law</a>
          <a href="https://www.india.gov.in/topics/law-justice" target="_blank" rel="noopener noreferrer">Law & Justice</a>
          <a href="https://legislative.gov.in/constitution-of-india/" target="_blank" rel="noopener noreferrer">Download Constitution</a>
        </div>
      </div>

      <div className="right-section">
        <h2>Current Famous Cases</h2>
        <ul className="cases-list">
          {recentFamousCases.map((caseItem, index) => (
            <li key={index} className="case-item">
              <h4>{caseItem.title}</h4>
              <p>{caseItem.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Landing;
