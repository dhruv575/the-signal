import React, { useState } from 'react';
import styled from 'styled-components';
import projectsData from '../Data/projects.json';
import { Link } from 'react-router-dom';

// Define color constants to match Navbar
const NAVY = '#0A2463';
const NAVY_LIGHT = '#1A3473';
const GRAY_LIGHT = '#f5f5f7';

// Styled-components
const PageContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  min-height: 100vh;
  background-color: ${GRAY_LIGHT};

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
  position: sticky;
  top: 0;
  height: 100vh;
  box-shadow: 4px 0 15px rgba(0, 0, 0, 0.05);

  @media (max-width: 768px) {
    position: relative;
    height: auto;
    padding: 3rem 2rem;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  }
`;

const ContentWrapper = styled.div`
  max-width: 80%;
`;

const Title = styled.h1`
  text-align: left;
  font-size: 3rem;
  margin-bottom: 1.5rem;
  color: ${NAVY};
  font-weight: 700;
  position: relative;
  
  &:after {
    content: '';
    position: absolute;
    bottom: -0.5rem;
    left: 0;
    width: 60px;
    height: 4px;
    background-color: ${NAVY};
  }

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const Description = styled.p`
  text-align: left;
  font-size: 1.2rem;
  line-height: 1.8;
  color: #333;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`;

const FilterContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 1rem;
`;

const FilterButton = styled.button`
  padding: 0.5rem 1rem;
  background-color: ${props => props.active ? NAVY : 'transparent'};
  color: ${props => props.active ? 'white' : NAVY};
  border: 1px solid ${NAVY};
  border-radius: 20px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: ${props => props.active ? NAVY_LIGHT : 'rgba(10, 36, 99, 0.1)'};
  }
`;

const RightColumn = styled.div`
  background-color: ${GRAY_LIGHT};
  padding: 4rem 3rem;
  overflow-y: auto;

  @media (max-width: 768px) {
    padding: 2rem 1.5rem;
  }
`;

const ProjectsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  
  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const ProjectBox = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  height: 100%;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.15);
  }
`;

const ProjectImageContainer = styled.div`
  position: relative;
  height: 200px;
  overflow: hidden;
`;

const ProjectImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
  
  ${ProjectBox}:hover & {
    transform: scale(1.05);
  }
`;

const ProjectDetails = styled.div`
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const ProjectTitle = styled.h3`
  font-size: 1.4rem;
  margin: 0 0 0.5rem 0;
  color: ${NAVY};
  font-weight: 600;
`;

const ProjectDescription = styled.p`
  margin: 0.5rem 0 1rem 0;
  font-size: 1rem;
  line-height: 1.6;
  color: #555;
  flex: 1;
`;

const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: auto;
`;

const Tag = styled.span`
  padding: 0.3rem 0.8rem;
  background-color: rgba(10, 36, 99, 0.1);
  color: ${NAVY};
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 500;
`;

const ProjectLink = styled.div`
  margin-top: 1.5rem;
  display: flex;
  justify-content: flex-end;
`;

const StyledButton = styled.button`
  padding: 0.6rem 1.2rem;
  background-color: ${NAVY};
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  transition: background-color 0.2s ease;
  
  &:hover {
    background-color: ${NAVY_LIGHT};
  }
`;

// Extract unique categories from projects
const getCategories = () => {
  const categories = projectsData.reduce((acc, project) => {
    if (project.category) {
      if (!acc.includes(project.category)) {
        acc.push(project.category);
      }
    }
    return acc;
  }, []);
  
  return ['All', ...categories];
};

// Helper function to determine if a link is internal or external
const isInternalLink = (link) => {
  return link.startsWith('/');
};

const Projects = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const categories = getCategories();
  
  // Filter projects based on active category
  const filteredProjects = activeCategory === 'All' 
    ? projectsData 
    : projectsData.filter(project => project.category === activeCategory);

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
          
          <FilterContainer>
            {categories.map((category, index) => (
              <FilterButton 
                key={index}
                active={activeCategory === category}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </FilterButton>
            ))}
          </FilterContainer>
        </ContentWrapper>
      </LeftColumn>

      {/* Right Column */}
      <RightColumn>
        <ProjectsGrid>
          {filteredProjects.map((project, index) => (
            <ProjectBox key={index}>
              <ProjectImageContainer>
                <ProjectImage src={project.background_image} alt={project.title} />
              </ProjectImageContainer>
              <ProjectDetails>
                <ProjectTitle>{project.title}</ProjectTitle>
                {project.subtitle && <Tag>{project.subtitle}</Tag>}
                <ProjectDescription>{project.description}</ProjectDescription>
                
                <TagsContainer>
                  {project.tags && project.tags.map((tag, tagIndex) => (
                    <Tag key={tagIndex}>{tag}</Tag>
                  ))}
                </TagsContainer>
                
                <ProjectLink>
                  {isInternalLink(project.link) ? (
                    <Link to={project.link}>
                      <StyledButton>View Project</StyledButton>
                    </Link>
                  ) : (
                    <StyledButton onClick={() => window.open(project.link, '_blank')}>
                      View Project
                    </StyledButton>
                  )}
                </ProjectLink>
              </ProjectDetails>
            </ProjectBox>
          ))}
        </ProjectsGrid>
      </RightColumn>
    </PageContainer>
  );
};

export default Projects;