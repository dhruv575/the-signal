import React from 'react';
import styled from 'styled-components';
import teamData from '../../Data/team.json';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

const TeamContainer = styled.div`
  padding: 0rem;
`;

const Title = styled.p`
  text-align: center;
  font-size: 4rem;
  margin-left: 1rem;
  margin-bottom: 2rem;
  margin-top: 0rem;
`;

const Row = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${(props) => (props.index % 2 === 0 ? 'navy' : 'white')};
  color: ${(props) => (props.index % 2 === 0 ? 'white' : 'black')};
  padding: 1rem;
`;

const RowTitle = styled.p`
  font-size: 2rem;
  margin-bottom: 1rem;
  color: ${(props) => (props.index % 2 === 0 ? 'white' : 'black')};
  padding-left: 1rem;
`;

const CardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const Card = styled.div`
  display: flex;
  width: 100%;
  max-width: 400px;
  margin: 1rem;
  overflow: hidden;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
  background-color: ${(props) => (props.rowIndex % 2 === 0 ? 'white' : 'navy')};
  color: ${(props) => (props.rowIndex % 2 === 0 ? 'black' : 'white')};

  &:hover {
    transform: scale(1.02);
  }
`;

const ImageContainer = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background-color: #f0f0f0;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Content = styled.div`
  flex: 2;
  padding: 1rem;
`;

const Name = styled.h3`
  margin: 0;
  font-weight: bold;
`;

const Tags = styled.div`
  display: flex;
  gap: 0.5rem;
  margin: 0.5rem 0;
`;

const Tag = styled.span`
  background-color: #b0b0b0;
  border-radius: 5px;
  padding: 0.2rem 0.5rem;
  font-size: 0.9rem;
`;

const Projects = styled.p`
  margin: 0.5rem 0;
`;

const Icons = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 0.5rem;
`;

const IconLink = styled.a`
  color: inherit;
  font-size: 1.5rem;
`;

const positions = ["Co-director", "Board", "Project Lead", "Member", "Alumni"];

const AboutTeam = () => {
  const groupedData = positions.map((position) => ({
    position,
    members: teamData.filter((member) => member.Position === position),
  }));

  return (
    <TeamContainer>
      <Title>Team</Title>
      {groupedData.map((group, groupIndex) => (
        <Row key={group.position} index={groupIndex}>
          <RowTitle index={groupIndex}>{group.position}</RowTitle>
          <CardContainer>
            {group.members.map((member, index) => (
              <Card key={index} rowIndex={groupIndex}>
                <ImageContainer>
                  <Image src={member.Image} alt={member.Name} />
                </ImageContainer>
                <Content>
                  <Name>{member.Name}</Name>
                  <Tags>
                    <Tag>{member.Year}</Tag>
                    <Tag>{member.Major}</Tag>
                  </Tags>
                  <Projects>{member.Projects}</Projects>
                  <Icons>
                    {member.Instagram && (
                      <IconLink href={member.Instagram} target="_blank">
                        <FontAwesomeIcon icon={faInstagram} />
                      </IconLink>
                    )}
                    {member.Email && (
                      <IconLink href={`mailto:${member.Email}`}>
                        <FontAwesomeIcon icon={faEnvelope} />
                      </IconLink>
                    )}
                    {member.Linkedin && (
                      <IconLink href={member.Linkedin} target="_blank">
                        <FontAwesomeIcon icon={faLinkedin} />
                      </IconLink>
                    )}
                  </Icons>
                </Content>
              </Card>
            ))}
          </CardContainer>
        </Row>
      ))}
    </TeamContainer>
  );
};

export default AboutTeam;
