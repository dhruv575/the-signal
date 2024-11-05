import React, { useState } from 'react';
import styled from 'styled-components';
import Modal from './Modal'; // Import the Modal component

const CardWrapper = styled.div`
  background-color: #ff3333;
  color: white;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
  border-radius: 1rem;
  overflow: hidden;
  padding: 1rem;
  text-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.3);
  }
`;

const ProfileImage = styled.img`
  width: 100%;
  height: 16rem;
  object-fit: cover; /* Crop the image to a square */
  margin-bottom: 1rem;
`;

const PersonName = styled.h3`
  font-size: 1.5rem;
  font-weight: bold;
  margin: 0;
`;

const PersonCard = ({ person }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCardClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <CardWrapper onClick={handleCardClick}>
        <ProfileImage src={person.profilePicUrl || 'default-profile-pic-url.jpg'} alt={person.name} />
        <PersonName>{person.name}</PersonName>
      </CardWrapper>

      {isModalOpen && (
        <Modal person={person} onClose={handleCloseModal} />
      )}
    </>
  );
};

export default PersonCard;
