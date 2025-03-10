import React from 'react';
import styled from 'styled-components';
import backgroundImage from '../../Images/LOVE.jpg'; // Adjust path if necessary

const BackgroundContainer = styled.div`
  height: 100vh;
  width: 100%;
  background-image: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0.2) 0%,
      rgba(0, 0, 0, 0.4) 50%, 
      rgba(0, 0, 0, 0.8) 100%
    ),
    url(${backgroundImage});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  padding-bottom: 5rem;
`;

const TextOverlay = styled.div`
  text-align: center;
  color: white;
  max-width: 800px;
  padding: 0 2rem;
`;

const Title = styled.h1`
  font-size: clamp(3rem, 8vw, 5rem);
  font-weight: 700;
  margin-bottom: 1.5rem;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
  
  @media (max-width: 768px) {
    margin-bottom: 1rem;
  }
`;

const Subtitle = styled.p`
  font-size: clamp(1.2rem, 3vw, 1.8rem);
  line-height: 1.6;
  margin-bottom: 2rem;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.7);
  
  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`;

const ScrollIndicator = styled.div`
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;
  opacity: 0.8;
  animation: bounce 2s infinite;
  
  @keyframes bounce {
    0%, 20%, 50%, 80%, 100% {
      transform: translateY(0) translateX(-50%);
    }
    40% {
      transform: translateY(-20px) translateX(-50%);
    }
    60% {
      transform: translateY(-10px) translateX(-50%);
    }
  }
`;

const Arrow = styled.div`
  width: 20px;
  height: 20px;
  border-right: 3px solid white;
  border-bottom: 3px solid white;
  transform: rotate(45deg);
  margin-bottom: 0.5rem;
`;

const ScrollText = styled.span`
  font-size: 0.9rem;
  letter-spacing: 1px;
  text-transform: uppercase;
`;

const AboutBackground = () => {
  return (
    <BackgroundContainer>
      <TextOverlay>
        <Title>The Signal</Title>
        <Subtitle>
          We're a student-run organization dedicated to enhancing the Penn experience 
          through creative projects, meaningful connections, and honest conversations.
        </Subtitle>
      </TextOverlay>
      
      <ScrollIndicator>
        <Arrow />
        <ScrollText>Scroll Down</ScrollText>
      </ScrollIndicator>
    </BackgroundContainer>
  );
};

export default AboutBackground;
