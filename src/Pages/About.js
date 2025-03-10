import React from 'react';
import styled from 'styled-components';
import AboutBackground from '../Components/About/AboutBackground';
import AboutCards from '../Components/About/AboutCards';
import AboutTeam from '../Components/About/AboutTeam';

// Define color constants to match Navbar
const GRAY_LIGHT = '#f5f5f7';

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100%;
  background-color: ${GRAY_LIGHT};
`;

const About = () => {
  return (
    <PageContainer>
      <AboutBackground />
      <AboutCards />
      <AboutTeam />
    </PageContainer>
  );
};

export default About;
