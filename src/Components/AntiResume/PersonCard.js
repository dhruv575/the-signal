import React, { useState } from 'react';
import styled from 'styled-components';
import Modal from './Modal'; // Import the Modal component

// Define color constants to match Navbar
const NAVY = '#0A2463';

const CardWrapper = styled.div`
  background-color: white;
  color: ${NAVY};
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  border-radius: 12px;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
  height: 100%;
  display: flex;
  flex-direction: column;
  
  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.15);
  }
`;

const ProfileImageContainer = styled.div`
  position: relative;
  height: 0;
  padding-top: 100%; /* 1:1 Aspect Ratio */
  overflow: hidden;
`;

const ProfileImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
  
  ${CardWrapper}:hover & {
    transform: scale(1.05);
  }
`;

const CardContent = styled.div`
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

const PersonName = styled.h3`
  font-size: 1.4rem;
  font-weight: 600;
  margin: 0 0 0.5rem 0;
  color: ${NAVY};
`;

const PersonClass = styled.p`
  font-size: 1rem;
  color: #666;
  margin: 0;
`;

const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 1rem;
`;

const Tag = styled.span`
  padding: 0.3rem 0.8rem;
  background-color: rgba(10, 36, 99, 0.08);
  color: ${NAVY};
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 500;
`;

const PersonCard = ({ person }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCardClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // Extract tags from person data (if available)
  const getTags = () => {
    const tags = [];
    
    if (person.major) {
      tags.push(person.major);
    }
    
    if (person.school) {
      tags.push(person.school);
    }
    
    return tags;
  };

  return (
    <>
      <CardWrapper onClick={handleCardClick}>
        <ProfileImageContainer>
          <ProfileImage 
            src={person.profilePicUrl || 'default-profile-pic-url.jpg'} 
            alt={person.name} 
            loading="lazy"
          />
        </ProfileImageContainer>
        <CardContent>
          <PersonName>{person.name}</PersonName>
          {person.class && <PersonClass>Class of {person.class}</PersonClass>}
          
          <TagsContainer>
            {getTags().map((tag, index) => (
              <Tag key={index}>{tag}</Tag>
            ))}
          </TagsContainer>
        </CardContent>
      </CardWrapper>

      {isModalOpen && (
        <Modal person={person} onClose={handleCloseModal} />
      )}
    </>
  );
};

export default PersonCard;
