import React from 'react';
import styled from 'styled-components';
import projectsData from '../../Data/projects.json';

const GridContainer = styled.div`
  width: 100%;
  padding: 2rem;
  box-sizing: border-box;
  overflow: hidden;
`;

const Title = styled.h2`
  text-align: left;
  font-size: 2.5rem;
  margin-bottom: 2rem;
  color: #333;
  font-weight: 600;

  @media (max-width: 768px) {
    font-size: 2rem;
    margin-bottom: 1.5rem;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  width: 100%;
  box-sizing: border-box;
  
  @media (max-width: 1200px) {
    grid-template-columns: repeat(3, 1fr);
  }
  
  @media (max-width: 900px) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const ProjectCard = styled.div`
  position: relative;
  border-radius: 8px;
  overflow: hidden;
  aspect-ratio: 4/3;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  background-color: #f5f5f5;
  width: 100%;
  box-sizing: border-box;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  }
`;

const ProjectImage = styled.div`
  width: 100%;
  height: 100%;
  background-image: ${props => props.bg ? `url(${props.bg})` : 'none'};
  background-size: cover;
  background-position: center;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.7) 100%);
  }
`;

const ProjectContent = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 1.5rem;
  color: white;
  z-index: 1;
`;

const ProjectTitle = styled.h3`
  font-size: 1.25rem;
  margin: 0 0 0.5rem 0;
  font-weight: 600;
  line-height: 1.3;
`;

const ProjectSubtitle = styled.p`
  font-size: 0.9rem;
  margin: 0;
  opacity: 0.9;
  line-height: 1.4;
`;

const ProjectGrid = () => {
  return (
    <GridContainer>
      <Title>Our Projects</Title>
      <Grid>
        {projectsData.slice(0, 8).map((project, index) => (
          <ProjectCard
            key={index}
            onClick={() => window.open(project.link, '_blank')}
          >
            <ProjectImage bg={project.background_image} />
            <ProjectContent>
              <ProjectTitle>{project.title}</ProjectTitle>
              <ProjectSubtitle>{project.subtitle}</ProjectSubtitle>
            </ProjectContent>
          </ProjectCard>
        ))}
      </Grid>
    </GridContainer>
  );
};

export default ProjectGrid;
