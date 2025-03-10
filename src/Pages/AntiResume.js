import React from 'react';
import styled from 'styled-components';
import BackgroundEffect from '../Components/AntiResume/BackgroundEffect';
import AboutSection from '../Components/AntiResume/AboutSection'; // Import the new AboutSection component
import DataDisplay from '../Components/AntiResume/DataDisplay';

// Define a container to ensure proper spacing between sections
const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100%;
`;

const AntiResume = () => {
  return (
    <PageContainer>
      <BackgroundEffect />
      <AboutSection />
      <DataDisplay />
    </PageContainer>
  );
};

export default AntiResume;
