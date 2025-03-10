import React from 'react';
import styled from 'styled-components';

// Define color constants to match Navbar
const NAVY = '#0A2463';
const NAVY_LIGHT = '#1A3473';
const GRAY_LIGHT = '#f5f5f7';

const AboutSectionWrapper = styled.section`
  background-color: ${GRAY_LIGHT};
  color: #333;
  padding: clamp(4rem, 8vw, 6rem) clamp(2rem, 5vw, 4rem);
`;

const AboutContainer = styled.div`
  max-width: 900px;
  margin: 0 auto;
`;

const AboutTitle = styled.h2`
  font-size: clamp(2.5rem, 4vw, 3.5rem);
  margin-bottom: clamp(2rem, 4vw, 3rem);
  font-weight: 700;
  color: ${NAVY};
  position: relative;
  
  &:after {
    content: '';
    position: absolute;
    bottom: -0.8rem;
    left: 0;
    width: 80px;
    height: 4px;
    background-color: ${NAVY};
  }
`;

const AboutText = styled.p`
  font-size: clamp(1.1rem, 2vw, 1.3rem);
  line-height: 1.8;
  margin-bottom: 2rem;
  
  a {
    color: ${NAVY};
    text-decoration: none;
    border-bottom: 2px solid ${NAVY_LIGHT};
    transition: all 0.2s ease;
    
    &:hover {
      background-color: rgba(10, 36, 99, 0.05);
    }
  }
`;

const HighlightBox = styled.div`
  background-color: white;
  border-left: 4px solid ${NAVY};
  padding: 2rem;
  margin: 3rem 0;
  border-radius: 0 8px 8px 0;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
`;

const HighlightText = styled.p`
  font-size: clamp(1.2rem, 2vw, 1.4rem);
  line-height: 1.6;
  font-weight: 500;
  font-style: italic;
  color: ${NAVY};
  margin: 0;
`;

const AboutSection = () => {
  return (
    <AboutSectionWrapper>
      <AboutContainer>
        <AboutTitle>About the Anti-Resume Project</AboutTitle>
        
        <AboutText>
          The goal of this project is to shine a spotlight on the personal stories of failure 
          and success experienced by people at Penn that might not usually find their way onto 
          a traditional resume. By focusing on the struggles, setbacks, and hard-earned victories, 
          we aim to send a message that goes beyond the metrics often used to define success—our 
          resume, GPA, internships, or jobs.
        </AboutText>
        
        <HighlightBox>
          <HighlightText>
            "Everyone has faced some form of failure, and these stories deserve to be told."
          </HighlightText>
        </HighlightBox>
        
        <AboutText>
          This initiative seeks to show that our identities are more complex and nuanced, 
          shaped by the challenges we face and overcome along the way. Everyone has faced 
          some form of failure, and these stories deserve to be told.
        </AboutText>
        
        <AboutText>
          At Signal, we are currently curating and sharing anti-resumes of Penn alumni 
          and students, showcasing the moments of disappointment, rejection, and failure that often 
          remain hidden from view. This project seeks to normalize open discussions about failure, 
          reframing it as an essential part of the growth and learning process.
        </AboutText>
        
        <AboutText>
          By sharing these stories, we hope to foster an environment where people feel more 
          comfortable reflecting on their own experiences with failure, understanding that 
          these moments are not just inevitable but valuable stepping stones toward success 
          and personal development. Ultimately, we want to encourage everyone to embrace their 
          full story—not just the highlights.
        </AboutText>
      </AboutContainer>
    </AboutSectionWrapper>
  );
};

export default AboutSection;
