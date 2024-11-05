import React from 'react';
import BackgroundEffect from '../Components/AntiResume/BackgroundEffect';
import AboutSection from '../Components/AntiResume/AboutSection'; // Import the new AboutSection component
import DataDisplay from '../Components/AntiResume/DataDisplay';

const AntiResume = () => {
  return (
    <>
      <BackgroundEffect />
      <AboutSection />
      <DataDisplay />
    </>
  );
};

export default AntiResume;
