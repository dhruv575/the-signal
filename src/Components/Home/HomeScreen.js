import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';

// Helper function to generate random letters
const generateRandomLetter = () => {
  const alphabet = 'abcdefghijklmnopqrstuvwxyz';
  return alphabet[Math.floor(Math.random() * alphabet.length)];
};

// Helper function to generate an initial row with random letters
const generateInitialRow = (width) => {
  return Array.from({ length: width }, () => generateRandomLetter());
};

// Styled-components
const ScreenContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: black;
  overflow: hidden;
  border-radius: 0 0 45% 45% / 0 0 10% 10%;
  padding: 1rem;

  @media (max-width: 768px) {
    border-radius: 0 0 35% 35% / 0 0 15% 15%;
  }
`;

const Row = styled.div`
  height: 10vh;
  display: flex;
  align-items: center;
  position: relative;
  transition: transform 0.1s ease-in-out;
  justify-content: flex-start;

  @media (max-width: 768px) {
    justify-content: center;
  }
`;

const RowText = styled.div`
  color: #262626;
  font-size: 10vh;
  font-family: 'Times New Roman', Times, serif;
  white-space: nowrap;
  text-transform: lowercase;

  @media (max-width: 768px) {
    font-size: 8vh;
  }

  @media (max-width: 480px) {
    font-size: 6vh;
  }
`;

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const SpecialText = styled.div`
  color: lightgreen;
  height: 11vh;
  font-size: 10vh;
  font-weight: bold;
  left: ${props => props.left};
  font-family: 'Times New Roman', Times, serif;
  white-space: nowrap;
  z-index: 2;
  position: absolute;
  opacity: 0;
  animation: ${fadeIn} ${props => props.fadeDuration}s ease-in forwards;

  @media (max-width: 768px) {
    font-size: 8vh;
    left: 0;
    position: absolute;
    text-align: center;
  }

  @media (max-width: 480px) {
    font-size: 6vh;
  }
`;

const HomeScreen = () => {
  const [rows, setRows] = useState([]);
  const intervalsRef = React.useRef([]); // To store interval IDs and clear them when needed

  const screenWidth = typeof window !== 'undefined' ? window.innerWidth : 1000;
  const lettersPerRow = Math.ceil(screenWidth / 10) + 5;

  useEffect(() => {
    // Initialize rows with random letters
    setRows(Array.from({ length: 10 }, () => generateInitialRow(lettersPerRow)));
  
    // Clear any existing intervals before setting new ones
    intervalsRef.current.forEach(clearInterval);
    intervalsRef.current = [];
  
    // Set up intervals for each row to update at random speeds
    const newIntervals = Array.from({ length: 10 }).map((_, rowIndex) => {
      const randomSpeed = 100 + Math.random() * 200; // Random speed between 100ms and 300ms
      const intervalId = setInterval(() => {
        setRows((prevRows) =>
          prevRows.map((row, idx) => {
            if (idx === rowIndex) {
              const newRow = [generateRandomLetter(), ...row.slice(0, -1)];
              return newRow;
            }
            return row;
          })
        );
      }, randomSpeed);
      return intervalId;
    });
  
    // Store the interval IDs so we can clear them later
    intervalsRef.current = newIntervals;
  
    // Clean up intervals when component unmounts or dependencies change
    return () => {
      intervalsRef.current.forEach(clearInterval);
    };
  }, [lettersPerRow]); // rows is no longer needed in the dependency array
  

  return (
    <ScreenContainer>
      {rows.map((row, index) => (
        <Row key={index}>
          <RowText>
            {row.join('')}
          </RowText>
          {index === 3 && (
            <SpecialText left={'20%'} fadeDuration={2}>
              We are the
            </SpecialText>
          )}
          {index === 4 && (
            <SpecialText left={'40%'} fadeDuration={2.5}>
              Signal
            </SpecialText>
          )}
          {index === 5 && (
            <SpecialText left={'50%'} fadeDuration={3}>
              in the noise
            </SpecialText>
          )}
        </Row>
      ))}
    </ScreenContainer>
  );
};

export default HomeScreen;
