import React, { useState, useEffect } from 'react';
import styled, { keyframes, createGlobalStyle } from 'styled-components';

const companies = [
  'Google', 'Amazon', 'Meta', 'Microsoft', 'Apple',
  'Facebook', 'Netflix', 'Tesla', 'Twitter', 'Oracle',
  'IBM', 'Intel', 'Spotify', 'Adobe', 'Uber',
  'McKinsey & Company', 'Boston Consulting Group', 'Bain & Company',
  'Deloitte', 'PwC', 'Ernst & Young', 'KPMG', 'Accenture',
  'Goldman Sachs', 'JPMorgan Chase', 'Morgan Stanley', 'Citigroup',
  'Bank of America', 'Wells Fargo', 'HSBC', 'Barclays', 'Credit Suisse'
];

// Global styles to prevent horizontal scrolling only
const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    overflow-x: hidden; /* Only prevent horizontal scrolling */
  }
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const BackgroundContainer = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
  background-color: black;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow-x: hidden;
`;

const CompanyList = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding: clamp(1rem, 3vw, 2rem);
  display: grid;
  grid-template-rows: repeat(15, 1fr);
  color: gray;
  font-family: 'JetBrains Mono', 'Courier New', monospace;
  text-align: center;
  overflow: hidden;

  /* Responsive adjustments */
  @media (max-width: 600px) {
    grid-template-rows: repeat(10, 1fr); /* Fewer rows on smaller screens */
    padding: 1rem;
  }
`;

const CompanyRow = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  gap: clamp(0.5rem, 1vw, 2rem);

  /* Ensure that the gap reduces on smaller screens */
  @media (max-width: 600px) {
    gap: 0.25rem;
  }
`;

const CompanyName = styled.span`
  color: ${({ isHighlighted }) => (isHighlighted ? 'blue' : 'black')};
  transition: color 0.5s ease;
  font-size: clamp(0.5rem, 1.5vw, 1.5rem);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: min-content;

  /* Adjust font size on smaller screens */
  @media (max-width: 600px) {
    font-size: clamp(0.5rem, 1vw, 1rem); /* Smaller font size */
  }
`;

const WhiteBox = styled.div`
  position: relative;
  color: rgba(255, 255, 255, 0.7);
  padding: clamp(1rem, 3vw, 2rem);
  border-radius: 10px;
  font-size: clamp(1.5rem, 4vw, 3rem);
  font-weight: 700;
  opacity: 0;
  animation: ${fadeIn} 4s forwards;
  z-index: 10;
  text-align: center;
  max-width: 90vw;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  /* Responsive adjustments */
  @media (max-width: 600px) {
    padding: 1rem; /* Smaller padding */
    font-size: clamp(2rem, 3vw, 2.5rem); /* Slightly smaller font size */
  }
`;

const BackgroundEffect = () => {
  const [highlightedCompanies, setHighlightedCompanies] = useState([]);

  // Create grid of companies
  const rows = 15;
  const cols = 15;
  const shuffledCompanies = Array(rows * cols).fill().map(() =>
    companies[Math.floor(Math.random() * companies.length)]
  );

  useEffect(() => {
    const interval = setInterval(() => {
      const highlighted = Array(80).fill().map(() =>
        Math.floor(Math.random() * (rows * cols))
      );
      setHighlightedCompanies(highlighted);
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <GlobalStyle />
      <BackgroundContainer>
        <CompanyList>
          {Array.from({ length: rows }).map((_, rowIndex) => (
            <CompanyRow key={rowIndex}>
              {shuffledCompanies
                .slice(rowIndex * cols, (rowIndex + 1) * cols)
                .map((company, index) => (
                  <CompanyName
                    key={index}
                    isHighlighted={highlightedCompanies.includes(rowIndex * cols + index)}
                  >
                    {company}
                  </CompanyName>
                ))}
            </CompanyRow>
          ))}
        </CompanyList>
        <WhiteBox>Anti Resume Project</WhiteBox>
      </BackgroundContainer>
    </>
  );
};

export default BackgroundEffect;
