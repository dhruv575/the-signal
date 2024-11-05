import React from 'react';
import styled from 'styled-components';
import projectsData from '../../Data/projects.json'; // Import your JSON file

// Styled-components
const GridContainer = styled.div`
  padding: 6rem;
  @media (max-width: 768px) {
    padding: 2rem;
  }
`;

const Title = styled.h2`
  text-align: left;
  font-size: 2.5rem;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 1rem;
  height: 100vh;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    height: auto;
  }
`;

const LeftColumn = styled.div`
  display: grid;
  grid-template-rows: 1fr 2fr;
  grid-template-columns: 1fr 1fr;
  grid-gap: 1rem;

  & div:nth-child(1) {
    grid-column: 1 / span 2;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    grid-template-rows: auto;
  }
`;

const RightColumn = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr;
  grid-template-columns: 1fr 1fr;
  grid-gap: 1rem;

  & div:nth-child(1) {
    grid-column: 1 / span 2; /* Upper box spans both columns */
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    grid-template-rows: auto;
  }
`;

const ProjectBox = styled.div`
  background-image: ${(props) => (props.bg ? `url(${props.bg})` : 'none')};
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: flex-start; /* Align content to the left */
  justify-content: flex-start; /* Align content to the top */
  flex-direction: column;
  color: white;
  font-size: 1.5rem;
  padding: 2rem;
  border-radius: 10px;
  cursor: pointer;
  background-color: ${(props) => (props.bg ? 'transparent' : '#f0f0f0')}; /* Whiteish-gray for "See More Projects" */
  color: ${(props) => (props.bg ? 'white' : '#333')}; /* Dark text for "See More Projects" */

  &:hover {
    opacity: 0.9;
  }

  @media (max-width: 768px) {
    font-size: 1rem; /* Smaller text on mobile */
  }
`;

const ProjectTitle = styled.h3`
  font-size: 1.5rem;
  margin: 0 0 0.5rem 0; /* Set bottom margin to 0.5rem */
  color: white;
  text-shadow: 
    -1px -1px 0 #000,  
    1px -1px 0 #000,  
    -1px 1px 0 #000,  
    1px 1px 0 #000; /* Creates an outline effect */

  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

const ProjectSubtitle = styled.p`
  margin: 0; /* Ensure no extra margin */
  font-size: 1rem;
  color: white;
  text-shadow: 
    -1px -1px 0 #000,  
    1px -1px 0 #000,  
    -1px 1px 0 #000,  
    1px 1px 0 #000; /* Creates an outline effect */

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`;


const ProjectGrid = () => {
  return (
    <GridContainer>
      <Title>Our Projects</Title>
      <Grid>
        {/* Left Column */}
        <LeftColumn>
          {projectsData.slice(0, 3).map((project, index) => (
            <ProjectBox
              key={index}
              bg={project.background_image}
              onClick={() => window.open(project.link, '_blank')}
            >
              <ProjectTitle>{project.title}</ProjectTitle>
              <ProjectSubtitle>{project.subtitle}</ProjectSubtitle>
            </ProjectBox>
          ))}
        </LeftColumn>

        {/* Right Column */}
        <RightColumn>
          {/* Top Half: Spans both columns */}
          <ProjectBox
            bg={projectsData[3]?.background_image}
            onClick={() => window.open(projectsData[3]?.link, '_blank')}
          >
            <ProjectTitle>{projectsData[3]?.title}</ProjectTitle>
            <ProjectSubtitle>{projectsData[3]?.subtitle}</ProjectSubtitle>
          </ProjectBox>

          {/* Bottom Half: Split between two boxes */}
          <ProjectBox
            bg={projectsData[4]?.background_image}
            onClick={() => window.open(projectsData[4]?.link, '_blank')}
          >
            <ProjectTitle>{projectsData[4]?.title}</ProjectTitle>
            <ProjectSubtitle>{projectsData[4]?.subtitle}</ProjectSubtitle>
          </ProjectBox>

          {/* See More Projects Box */}
          <ProjectBox onClick={() => window.location.href = '/projects'}>
            <ProjectTitle>See More Projects</ProjectTitle>
          </ProjectBox>
        </RightColumn>
      </Grid>
    </GridContainer>
  );
};

export default ProjectGrid;
