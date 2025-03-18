import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';

const companies = [
  'Google', 'Amazon', 'Meta', 'Microsoft', 'Apple',
  'Facebook', 'Netflix', 'Tesla', 'Twitter', 'Oracle',
  'IBM', 'Intel', 'Spotify', 'Adobe', 'Uber',
  'McKinsey & Company', 'Boston Consulting Group', 'Bain & Company',
  'Deloitte', 'PwC', 'Ernst & Young', 'KPMG', 'Accenture',
  'Goldman Sachs', 'JPMorgan Chase', 'Morgan Stanley', 'Citigroup',
  'Bank of America', 'Wells Fargo', 'HSBC', 'Barclays', 'Credit Suisse'
];

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
  width: 100%;
  height: 80vh;
  background-color: black;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

const CompanyList = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding: 1rem;
  display: grid;
  grid-template-rows: repeat(10, 1fr);
  color: gray;
  font-family: 'JetBrains Mono', 'Courier New', monospace;
  text-align: center;
  overflow: hidden;
`;

const CompanyRow = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  gap: 1rem;
`;

const CompanyName = styled.span`
  color: ${({ isHighlighted }) => (isHighlighted ? 'blue' : 'black')};
  transition: color 0.5s ease;
  font-size: 1rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: min-content;
`;

const WhiteBox = styled.div`
  position: relative;
  color: rgba(255, 255, 255, 0.7);
  padding: 2rem;
  border-radius: 10px;
  font-size: 3rem;
  font-weight: 700;
  opacity: 0;
  animation: ${fadeIn} 4s forwards;
  z-index: 10;
  text-align: center;
  max-width: 90%;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  @media (max-width: 600px) {
    padding: 1rem;
    font-size: 2rem;
  }
`;

const BackgroundEffect = () => {
  const [highlightedCompanies, setHighlightedCompanies] = useState([]);

  // Create grid of companies
  const rows = 10;
  const cols = 10;
  const shuffledCompanies = Array(rows * cols).fill().map(() =>
    companies[Math.floor(Math.random() * companies.length)]
  );

  useEffect(() => {
    const interval = setInterval(() => {
      const highlighted = Array(50).fill().map(() =>
        Math.floor(Math.random() * (rows * cols))
      );
      setHighlightedCompanies(highlighted);
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
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
  );
};

export default BackgroundEffect;
