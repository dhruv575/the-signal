import React from 'react';
import styled from 'styled-components';
import stickynotes from '../../Images/stickynote.svg';
import squirrelscards from '../../Images/squirrelscards.svg';

// Styled components
const HomeMiddleContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  padding: 3rem 0;
  position: relative;
`;

const Content = styled.div`
  text-align: center;
  max-width: 800px;
  padding: 0 2rem;
`;

const StickyNoteImage = styled.img`
  position: absolute;
  left: 0;
  top: 10%;
  width: 12rem;
  height: auto;

  @media (max-width: 768px) {
    display: none;
  }
`;

const SquirrelsCardImage = styled.img`
  position: absolute;
  right: 0;
  top: 10%;
  width: 12rem;
  height: auto;

  @media (max-width: 768px) {
    display: none;
  }
`;

const Heading = styled.h2`
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: 1rem;
`;

const Text = styled.p`
  font-size: 1.25rem;
  line-height: 1.6;
`;

const Button = styled.button`
  margin-top: 1.5rem;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  color: #007bff;
  background-color: transparent;
  border: 2px solid #007bff;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: #007bff;
    color: white;
  }
`;

const HomeMiddle = () => {
  return (
    <HomeMiddleContainer>
      <StickyNoteImage src={stickynotes} alt="Sticky Notes" />
      <Content>
        <Heading>
        We are a collective of creators, designers, writers, and everything in between, with the goal of enhancing the undergraduate experience for all students
        </Heading>
        <Text>
          We provide resources to help students discover their passions and live
          deliberately at Penn, in their careers, and beyond.
        </Text>
        <Button onClick={() => window.location.href = '/projects'}>
          Learn More
        </Button>
      </Content>
      <SquirrelsCardImage src={squirrelscards} alt="Squirrels Cards" />
    </HomeMiddleContainer>
  );
};

export default HomeMiddle;
