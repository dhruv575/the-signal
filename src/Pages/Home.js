import React from 'react';
import HomeScreen from '../Components/Home/HomeScreen';
import HomeMiddle from '../Components/Home/HomeMiddle';
import ProjectGrid from '../Components/Home/ProjectsGrid.js';

const Home = () => {
  return (
    <>
      <HomeScreen />
      <HomeMiddle />
      <ProjectGrid />
    </>
  );
};

export default Home;
