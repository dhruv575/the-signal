import React from 'react';
import styled from 'styled-components';
import logo from '../../Images/logo512.png'; // Adjust path if needed

// Styled Components
const CardsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem; /* Increase gap between cards */
  padding: 4rem;
  width: 100hh;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled.div`
  perspective: 1000px;
  cursor: pointer;
`;

const InnerCard = styled.div`
  position: relative;
  width: 100%;
  height: 300px; /* Fixed height to ensure consistent size */
  transition: transform 0.6s;
  transform-style: preserve-3d;
  border-radius: 15px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
  background-color: ${(props) => (props.index % 2 === 0 ? 'navy' : 'white')};
  transform: ${(props) => (props.isFlipped ? 'rotateY(180deg)' : 'rotateY(0)')};
`;

const Front = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%; /* Ensure consistent size */
  backface-visibility: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 15px;
  background-color: ${(props) => (props.index % 2 === 0 ? 'navy' : 'white')};
`;

const Logo = styled.img`
  height: 60%; /* Slightly larger for better visibility */
  width: auto;
`;

const Back = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%; /* Ensure consistent size */
  backface-visibility: hidden;
  transform: rotateY(180deg);
  border-radius: 15px;
  padding: 1rem;
  color: ${(props) => (props.index % 2 === 0 ? 'white' : 'navy')};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  background-color: ${(props) => (props.index % 2 === 0 ? 'navy' : 'white')};
`;

const CardTitle = styled.h3`
  margin-bottom: 0.5rem;
`;

const CardText = styled.p`
  font-size: 1rem;
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

  const [flippedCards, setFlippedCards] = React.useState(
    Array(cardData.length).fill(false)
  );

  const handleFlip = (index) => {
    const newFlippedCards = [...flippedCards];
    newFlippedCards[index] = !newFlippedCards[index];
    setFlippedCards(newFlippedCards);
  };

  return (
    <CardsContainer>
      {cardData.map((card, index) => (
        <Card key={index} onClick={() => handleFlip(index)}>
          <InnerCard isFlipped={flippedCards[index]} index={index}>
            <Front index={index}>
              <Logo src={logo} alt="Signal Logo" />
            </Front>
            <Back index={index}>
              <CardTitle>{card.title}</CardTitle>
              <CardText>{card.text}</CardText>
            </Back>
          </InnerCard>
        </Card>
      ))}
    </CardsContainer>
  );
};

export default AboutCards;
