import React from 'react';
import styled from 'styled-components';
import teamData from '../../Data/team.json';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

// Define color constants to match Navbar
const NAVY = '#0A2463';
const GRAY_LIGHT = '#f5f5f7';

const TeamContainer = styled.section`
  padding: 5rem 2rem;
  background-color: ${GRAY_LIGHT};
`;

const SectionTitle = styled.h2`
  text-align: center;
  font-size: clamp(2.5rem, 5vw, 3.5rem);
  color: ${NAVY};
  margin-bottom: 4rem;
  font-weight: 700;
  position: relative;
  
  &:after {
    content: '';
    position: absolute;
    bottom: -0.8rem;
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 4px;
    background-color: ${NAVY};
  }
`;

const TeamSection = styled.div`
  margin-bottom: 5rem;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const SectionHeader = styled.div`
  background-color: ${props => props.index % 2 === 0 ? NAVY : 'white'};
  color: ${props => props.index % 2 === 0 ? 'white' : NAVY};
  padding: 1.5rem 2rem;
  border-radius: 8px;
  margin-bottom: 2rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
`;

const PositionTitle = styled.h3`
  font-size: clamp(1.5rem, 3vw, 2rem);
  font-weight: 600;
  margin: 0;
`;

const MembersGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 1.5rem;
  }
`;

const MemberCard = styled.div`
  background-color: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  height: 100%;
  display: flex;
  flex-direction: column;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.15);
  }
`;

const ImageContainer = styled.div`
  width: 100%;
  height: 0;
  padding-top: 100%; /* 1:1 Aspect Ratio */
  position: relative;
  overflow: hidden;
`;

const MemberImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
  
  ${MemberCard}:hover & {
    transform: scale(1.05);
  }
`;

const MemberInfo = styled.div`
  padding: 1.5rem;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`;

const MemberName = styled.h4`
  font-size: 1.3rem;
  font-weight: 600;
  margin: 0 0 0.8rem 0;
  color: ${NAVY};
`;

const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

const Tag = styled.span`
  background-color: ${GRAY_LIGHT};
  color: ${NAVY};
  border-radius: 20px;
  padding: 0.3rem 0.8rem;
  font-size: 0.8rem;
  font-weight: 500;
`;

const ProjectsList = styled.p`
  margin: 0.5rem 0 1rem;
  font-size: 0.95rem;
  color: #555;
  line-height: 1.5;
  flex-grow: 1;
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: auto;
`;

const SocialLink = styled.a`
  color: ${NAVY};
  font-size: 1.2rem;
  transition: all 0.2s ease;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  
  &:hover {
    background-color: rgba(10, 36, 99, 0.1);
    transform: translateY(-2px);
  }
`;

const positions = ["Co-director", "Board", "Project Lead", "Member", "Alumni"];

const AboutTeam = () => {
  const groupedData = positions.map((position) => ({
    position,
    members: teamData.filter((member) => member.Position === position),
  }));

  return (
    <TeamContainer>
      <SectionTitle>Our Team</SectionTitle>
      
      {groupedData.map((group, groupIndex) => (
        group.members.length > 0 && (
          <TeamSection key={group.position}>
            <SectionHeader index={groupIndex}>
              <PositionTitle>{group.position}</PositionTitle>
            </SectionHeader>
            
            <MembersGrid>
              {group.members.map((member, index) => (
                <MemberCard key={index}>
                  <ImageContainer>
                    <MemberImage src={member.Image} alt={member.Name} loading="lazy" />
                  </ImageContainer>
                  
                  <MemberInfo>
                    <MemberName>{member.Name}</MemberName>
                    
                    <TagsContainer>
                      {member.Year && <Tag>{member.Year}</Tag>}
                      {member.Major && <Tag>{member.Major}</Tag>}
                    </TagsContainer>
                    
                    {member.Projects && (
                      <ProjectsList>{member.Projects}</ProjectsList>
                    )}
                    
                    <SocialLinks>
                      {member.Instagram && (
                        <SocialLink href={member.Instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                          <FontAwesomeIcon icon={faInstagram} />
                        </SocialLink>
                      )}
                      {member.Email && (
                        <SocialLink href={`mailto:${member.Email}`} aria-label="Email">
                          <FontAwesomeIcon icon={faEnvelope} />
                        </SocialLink>
                      )}
                      {member.Linkedin && (
                        <SocialLink href={member.Linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                          <FontAwesomeIcon icon={faLinkedin} />
                        </SocialLink>
                      )}
                    </SocialLinks>
                  </MemberInfo>
                </MemberCard>
              ))}
            </MembersGrid>
          </TeamSection>
        )
      ))}
    </TeamContainer>
  );
};

export default AboutTeam;
