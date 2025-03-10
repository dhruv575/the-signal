import React, { useState } from 'react';
import styled from 'styled-components';
import logo from '../../Images/logo512.png'; // Adjust path if needed

// Define color constants to match Navbar
const NAVY = '#0A2463';
const NAVY_LIGHT = '#1A3473';

// Styled Components
const SectionContainer = styled.section`
  padding: 5rem 1rem;
  background-color: #ccc;
  overflow: hidden;
  width: 100%;
  box-sizing: border-box;
`;

const SectionTitle = styled.h2`
  text-align: center;
  font-size: clamp(2rem, 4vw, 3rem);
  color: ${NAVY};
  margin-bottom: 3rem;
  font-weight: 700;
  position: relative;
  
  &:after {
    content: '';
    position: absolute;
    bottom: -0.8rem;
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 4px;
    background-color: ${NAVY};
  }
`;

const CardsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const Card = styled.div`
  perspective: 1500px;
  cursor: pointer;
  height: 280px;
  width: 100%;
  
  @media (max-width: 768px) {
    height: 250px;
  }
`;

const InnerCard = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  transition: transform 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  transform-style: preserve-3d;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  transform: ${(props) => (props.isFlipped ? 'rotateY(180deg)' : 'rotateY(0)')};
`;

const CardSide = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  border-radius: 12px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
  box-sizing: border-box;
`;

const Front = styled(CardSide)`
  background-color: ${(props) => (props.index % 2 === 0 ? NAVY : 'white')};
  color: ${(props) => (props.index % 2 === 0 ? 'white' : NAVY)};
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: ${(props) => (props.index % 2 === 0 ? 
      `radial-gradient(circle at 30% 30%, ${NAVY_LIGHT} 0%, ${NAVY} 70%)` : 
      'radial-gradient(circle at 30% 30%, #ffffff 0%, #f5f5f7 70%)')};
  }
`;

const Logo = styled.img`
  height: 60%;
  max-height: 120px;
  width: auto;
  position: relative;
  z-index: 1;
  transition: transform 0.3s ease;
  
  ${Card}:hover & {
    transform: scale(1.05);
  }
`;

const Back = styled(CardSide)`
  background-color: ${(props) => (props.index % 2 === 0 ? 'white' : NAVY)};
  color: ${(props) => (props.index % 2 === 0 ? NAVY : 'white')};
  transform: rotateY(180deg);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

const CardTitle = styled.h3`
  margin-bottom: 1rem;
  font-size: 1.5rem;
  font-weight: 600;
  position: relative;
  
  &:after {
    content: '';
    position: absolute;
    bottom: -0.5rem;
    left: 50%;
    transform: translateX(-50%);
    width: 40px;
    height: 3px;
    background-color: ${props => props.light ? 'white' : NAVY};
  }
`;

const CardText = styled.p`
  font-size: 1rem;
  line-height: 1.5;
`;

const FlipHint = styled.div`
  text-align: center;
  margin-top: 2rem;
  font-size: 1rem;
  color: #666;
  font-style: italic;
`;

const AboutCards = () => {
  const cardData = [
    {
      title: 'History',
      text: 'In 2017, The Signal began as a publication that encouraged the exploration of unconventional career paths and creative passions at Penn.',
    },
    {
      title: 'Mission',
      text: 'We provide resources to help students discover their passions and live deliberately at Penn, in their careers, and beyond.',
    },
    {
      title: 'Impact',
      text: 'We have interviewed hundreds of Penn students, documented thousands of successes and failures, and accumulated hundreds of thousands of views.',
    },
    {
      title: 'Future',
      text: 'Today, we are a collective of creators, designers, writers, and everything in between, with the goal of enhancing the undergraduate experience for all students.',
    },
  ];

  const [flippedCards, setFlippedCards] = useState(Array(cardData.length).fill(false));

  const handleFlip = (index) => {
    const newFlippedCards = [...flippedCards];
    newFlippedCards[index] = !newFlippedCards[index];
    setFlippedCards(newFlippedCards);
  };

  return (
    <SectionContainer>
      <SectionTitle>About Us</SectionTitle>
      <CardsContainer>
        {cardData.map((card, index) => (
          <Card key={index} onClick={() => handleFlip(index)}>
            <InnerCard isFlipped={flippedCards[index]}>
              <Front index={index}>
                <Logo src={logo} alt="Signal Logo" />
              </Front>
              <Back index={index}>
                <CardTitle light={index % 2 !== 0}>{card.title}</CardTitle>
                <CardText>{card.text}</CardText>
              </Back>
            </InnerCard>
          </Card>
        ))}
      </CardsContainer>
      <FlipHint>Click on the cards to learn more about us</FlipHint>
    </SectionContainer>
  );
};

export default AboutCards;
