import React, { useState, useEffect, useRef } from 'react';
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

// Define the messages and their positions
const MESSAGES = [
  { text: "We are the", rowIndex: 3, position: 20 },
  { text: "Signal", rowIndex: 4, position: 40 },
  { text: "in the noise", rowIndex: 5, position: 50 }
];

// Define color constants to match Navbar
const NAVY = '#0A2463';

// Styled-components
const ScreenContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 75vh;
  background-color: black;
  overflow: hidden;
  border-radius: 0 0 45% 45% / 0 0 10% 10%;
  padding: 1rem;
  position: relative;

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
  overflow: hidden;

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
  position: relative;
  z-index: 1;

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

// Overlay that will be visible through the cutout text
const TextBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: ${NAVY};
  z-index: 2;
  opacity: 0.9;
  mix-blend-mode: lighten;
`;

// Container for the rows of random letters
const LetterContainer = styled.div`
  position: relative;
  z-index: 1;
  width: 100%;
  height: 100%;
`;

// Container for the message masks
const MessageContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 3;
  pointer-events: none;
`;

// The cutout mask that creates the hollowed effect
const CutoutMask = styled.div`
  position: absolute;
  top: ${props => (props.rowIndex * 10)}vh;
  left: ${props => props.position}%;
  font-size: 10vh;
  font-family: 'Times New Roman', Times, serif;
  font-weight: bold;
  white-space: nowrap;
  color: black;
  mix-blend-mode: destination-out;
  animation: ${fadeIn} ${props => props.fadeDuration}s ease-in forwards;
  opacity: 0;
  
  @media (max-width: 768px) {
    font-size: 8vh;
    left: 50%;
    transform: translateX(-50%);
    text-align: center;
  }

  @media (max-width: 480px) {
    font-size: 6vh;
  }
`;

// The text that appears inside the hollowed area
const RevealedText = styled.div`
  position: absolute;
  top: ${props => (props.rowIndex * 10)}vh;
  left: ${props => props.position}%;
  font-size: 10vh;
  font-family: 'Times New Roman', Times, serif;
  font-weight: bold;
  white-space: nowrap;
  color: white;
  text-shadow: 0 0 15px rgba(255, 255, 255, 0.5);
  animation: ${fadeIn} ${props => props.fadeDuration}s ease-in forwards;
  opacity: 0;
  z-index: 4;
  
  @media (max-width: 768px) {
    font-size: 8vh;
    left: 50%;
    transform: translateX(-50%);
    text-align: center;
  }

  @media (max-width: 480px) {
    font-size: 6vh;
  }
`;

// Outline to enhance the hollowed effect
const TextOutline = styled.div`
  position: absolute;
  top: ${props => (props.rowIndex * 10)}vh;
  left: ${props => props.position}%;
  font-size: 10vh;
  font-family: 'Times New Roman', Times, serif;
  font-weight: bold;
  white-space: nowrap;
  color: transparent;
  -webkit-text-stroke: 1px rgba(255, 255, 255, 0.7);
  text-stroke: 1px rgba(255, 255, 255, 0.7);
  animation: ${fadeIn} ${props => props.fadeDuration}s ease-in forwards;
  opacity: 0;
  z-index: 5;
  filter: drop-shadow(0 0 5px rgba(255, 255, 255, 0.5));
  
  @media (max-width: 768px) {
    font-size: 8vh;
    left: 50%;
    transform: translateX(-50%);
    text-align: center;
  }

  @media (max-width: 480px) {
    font-size: 6vh;
  }
`;

const HomeScreen = () => {
  const [rows, setRows] = useState([]);
  const intervalsRef = useRef([]); // To store interval IDs and clear them when needed

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
  }, [lettersPerRow]);
  
  return (
    <ScreenContainer>
      <LetterContainer>
        {rows.map((row, index) => (
          <Row key={index}>
            <RowText>
              {row.join('')}
            </RowText>
          </Row>
        ))}
      </LetterContainer>
      
      <TextBackground />
      
      <MessageContainer>
        {MESSAGES.map((message, index) => (
          <React.Fragment key={index}>
            <CutoutMask 
              rowIndex={message.rowIndex} 
              position={message.position} 
              fadeDuration={2 + index * 0.5}
            >
              {message.text}
            </CutoutMask>
            <RevealedText 
              rowIndex={message.rowIndex} 
              position={message.position} 
              fadeDuration={2 + index * 0.5}
            >
              {message.text}
            </RevealedText>
            <TextOutline 
              rowIndex={message.rowIndex} 
              position={message.position} 
              fadeDuration={2 + index * 0.5}
            >
              {message.text}
            </TextOutline>
          </React.Fragment>
        ))}
      </MessageContainer>
    </ScreenContainer>
  );
};

export default HomeScreen;
