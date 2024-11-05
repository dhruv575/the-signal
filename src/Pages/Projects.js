import React from 'react';
import styled from 'styled-components';
import projectsData from '../Data/projects.json'; // Import your JSON data

// Styled-components
const PageContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  height: 100vh;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const LeftColumn = styled.div`
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;

  @media (max-width: 768px) {
    display: none; /* Hide the left column on mobile */
  }
`;

const ContentWrapper = styled.div`
  max-width: 60%;
`;

const Title = styled.h1`
  text-align: left;
  font-size: 3rem;
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const Description = styled.p`
  text-align: left;
  font-size: 1.2rem;
  line-height: 1.8;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const RightColumn = styled.div`
  background-color: black;
  padding: 12rem 3rem 0rem 3rem;
  overflow-y: auto;

`;

const ProjectBox = styled.div`
  display: flex;
  min-height: 20vh;
  background-color: white;
  border-radius: 10px;
  margin-bottom: 2rem;
  padding: 1rem;
  box-shadow: 0 0 15px rgba(255, 255, 255, 0.5); /* Glowing effect */
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  cursor: pointer;
  overflow: hidden;

  &:hover {
    transform: scale(1.02); /* Slight enlargement on hover */
    box-shadow: 0 0 30px rgba(255, 255, 255, 0.8); /* Stronger glow on hover */
  }

  @media (max-width: 768px) {
    flex-direction: column; /* Stack image and details on mobile */
  }
`;

const ProjectImage = styled.img`
  width: 33%; /* 1/3 of the width */
  object-fit: cover;
  border-radius: 10px 0 0 10px;

  @media (max-width: 768px) {
    width: 100%; /* Full width on mobile */
    border-radius: 10px 10px 0 0;
  }
`;

const ProjectDetails = styled.div`
  flex: 1;
  padding-left: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;

  @media (max-width: 768px) {
    padding-left: 0;
    padding-top: 1rem;
  }
`;

const ProjectTitle = styled.h3`
  font-size: 1.5rem;
  margin: 0;

  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

const ProjectDescription = styled.p`
  margin-top: 0.5rem;
  font-size: 1rem;

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`;

const Projects = () => {
  return (
    <PageContainer>
      {/* Left Column */}
      <LeftColumn>
        <ContentWrapper>
          <Title>Projects</Title>
          <Description>
            Our projects often span multiple years and provide ways for us to explore the Penn condition.
            Each project highlights different aspects of the experience students here have, focusing on both 
            the good and the bad. We hope that interacting with our projects can make you feel a little less alone 
            in an often lonely world.
          </Description>
        </ContentWrapper>
      </LeftColumn>

      {/* Right Column */}
      <RightColumn>
        {projectsData.map((project, index) => (
          <ProjectBox
            key={index}
            onClick={() => window.open(project.link, '_blank')}
          >
            <ProjectImage src={project.background_image} alt={project.title} />
            <ProjectDetails>
              <ProjectTitle>{project.title}</ProjectTitle>
              <ProjectDescription>{project.description}</ProjectDescription>
            </ProjectDetails>
          </ProjectBox>
        ))}
      </RightColumn>
    </PageContainer>
  );
};

export default Projects;