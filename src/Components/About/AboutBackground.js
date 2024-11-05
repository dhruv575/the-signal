import React from 'react';
import styled from 'styled-components';
import backgroundImage from '../../Images/LOVE.jpg'; // Adjust path if necessary

const BackgroundContainer = styled.div`
  height: 100vh;
  width: 100%;
  background-image: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0) 50%, 
      rgba(0, 0, 0, 1)
    ),
    url(${backgroundImage});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  position: relative;
`;

const TextOverlay = styled.div`
  position: absolute;
  bottom: 10px;
  width: 100%;
  text-align: center;
  color: white;
  font-size: 4rem;
  font-family: inherit; /* Default font */
`;

const AboutBackground = () => {
  return (
    <BackgroundContainer>
      <TextOverlay>The Signal</TextOverlay>
    </BackgroundContainer>
  );
};

export default AboutBackground;
