import React from 'react';
import styled from 'styled-components';

const AboutSectionWrapper = styled.section`
  background-color: white;
  color: black;
  padding: clamp(2rem, 5vw, 4rem);
`;

const AboutContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const AboutTitle = styled.h2`
  font-size: clamp(2rem, 4vw, 3rem);
  margin-bottom: clamp(1.5rem, 3vw, 2.5rem);
  font-weight: 700;
  color: #ff3333;
`;

const AboutText = styled.p`
  font-size: clamp(1rem, 2vw, 1.2rem);
  line-height: 1.6;
  margin-bottom: 1.5rem;
  
  a {
    color: black;
    text-decoration: none;
    border-bottom: 1px solid #ff3333;
    transition: opacity 0.2s ease;
    
    &:hover {
      opacity: 0.8;
    }
  }
`;

const AboutSection = () => {
  return (
    <AboutSectionWrapper>
      <AboutContainer>
        <AboutTitle>About</AboutTitle>
        <AboutText>
          The goal of this project is to shine a spotlight on the personal stories of failure 
          and success experienced by people at Penn that might not usually find their way onto 
          a traditional resume. By focusing on the struggles, setbacks, and hard-earned victories, 
          we aim to send a message that goes beyond the metrics often used to define success—our 
          resume, GPA, internships, or jobs. This initiative seeks to show that our identities are 
          more complex and nuanced, shaped by the challenges we face and overcome along the way. 
          Everyone has faced some form of failure, and these stories deserve to be told.
        </AboutText>
        <AboutText>
          At Signal, we are currently curating and sharing anti-resumes of Penn alumni 
          and students, showcasing the moments of disappointment, rejection, and failure that often 
          remain hidden from view. This project seeks to normalize open discussions about failure, 
          reframing it as an essential part of the growth and learning process. By sharing these stories, 
          we hope to foster an environment where people feel more comfortable reflecting on their own 
          experiences with failure, understanding that these moments are not just inevitable but valuable 
          stepping stones toward success and personal development. Ultimately, we want to encourage 
          everyone to embrace their full story—not just the highlights.
        </AboutText>
      </AboutContainer>
    </AboutSectionWrapper>
  );
};


export default AboutSection;
