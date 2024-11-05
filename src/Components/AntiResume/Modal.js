import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faGlobe, faEnvelope } from '@fortawesome/free-solid-svg-icons'; // Import FontAwesome icons

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

const ModalContent = styled.div`
  width: 60%;
  height: 80%;
  background: white;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  position: relative;
  overflow-y: auto;

  @media (max-width: 768px) {
    width: 80%;
    height: 80%;
    padding: 1.5rem;
  }
`;

const ModalRow = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 1.5rem;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const ModalColumn = styled.div`
  flex: 0 0 25%;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;

  @media (max-width: 768px) {
    flex: none;
    width: 100%;
    margin-bottom: 1.5rem;
  }
`;

const ModalTextColumn = styled.div`
  flex: 0 0 75%;
  padding: 0rem 2rem;
  margin-right: 1rem;

  @media (max-width: 768px) {
    padding-left: 0;
  }
`;

const ModalImage = styled.img`
  width: 150px;
  height: 150px;
  object-fit: cover;
  border-radius: 50%;

  @media (max-width: 768px) {
    width: 120px;
    height: 120px;
  }
`;

const ContactLinks = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 1rem;

  a {
    color: black;
    text-decoration: none;
    margin: 0.5rem 0;

    &:hover {
      color: #555;
    }

    svg {
      margin-right: 0.5rem;
    }
  }

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`;

const IconLink = styled.a`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const ModalName = styled.h2`
  font-size: 2.5rem;
  font-weight: bold;
  margin: 0;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const Divider = styled.hr`
  margin: 1.5rem 0;
  border: 0;
  border-top: 1px solid #ddd;
`;

const ShortBio = styled.p`
  font-size: 1.2rem;
  line-height: 1.6;
  margin-right: 2rem;
  margin-bottom: 0rem;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const SectionTitle = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
`;

const BulletList = styled.ul`
  list-style-type: disc;
  margin-left: 1rem;
  padding-left: 0;
`;

const RejectedItems = styled.li`
  font-size: 1rem;
  line-height: 1.6;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
`;

const Modal = ({ person, onClose }) => {
  const {
    name,
    profilePicUrl,
    shortBio,
    companiesRejectedFrom,
    clubsRejectedFrom,
    quirks,
    regrets,
    everydayLs,
    advice,
    memoriesImade,
    thingsIsworeIdFinish,
    thingsLearnt,
    booksForFun,
    endOfTheWorld,
    linkedIn,
    personalWebsite,
    publicEmail,
  } = person;

  const limitItems = (items, limit = 6) => items && items.length > 0 && items.slice(0, limit);

  return (
    <ModalOverlay>
      <ModalContent>
        <ModalRow>
          <ModalColumn>
            <ModalImage src={profilePicUrl || 'default-profile-pic-url.jpg'} alt={name} />
            <ContactLinks>
              {linkedIn && (
                <IconLink href={linkedIn} target="_blank" rel="noopener noreferrer">
                  <FontAwesomeIcon icon={faLinkedin} /> LinkedIn
                </IconLink>
              )}
              {personalWebsite && (
                <IconLink href={personalWebsite} target="_blank" rel="noopener noreferrer">
                  <FontAwesomeIcon icon={faGlobe} /> Website
                </IconLink>
              )}
              {publicEmail && (
                <IconLink href={`mailto:${publicEmail}`}>
                  <FontAwesomeIcon icon={faEnvelope} /> Email
                </IconLink>
              )}
            </ContactLinks>
          </ModalColumn>

          <ModalTextColumn>
            <ModalName>{name}</ModalName>
            <Divider />
            <ShortBio>{shortBio || 'No bio available'}</ShortBio>
          </ModalTextColumn>
        </ModalRow>

        <ModalRow>
          <ModalColumn>
            {companiesRejectedFrom && companiesRejectedFrom.length > 0 && (
              <>
                <SectionTitle>Rejected From</SectionTitle>
                <BulletList>
                  {limitItems(companiesRejectedFrom).map((company, index) => (
                    <RejectedItems key={index}>{company}</RejectedItems>
                  ))}
                </BulletList>
              </>
            )}
            {clubsRejectedFrom && clubsRejectedFrom.length > 0 && (
              <>
                <SectionTitle>Clubs Rejected From</SectionTitle>
                <BulletList>
                  {limitItems(clubsRejectedFrom).map((club, index) => (
                    <RejectedItems key={index}>{club}</RejectedItems>
                  ))}
                </BulletList>
              </>
            )}
            {quirks && quirks.length > 0 && (
              <>
                <SectionTitle>Quirks</SectionTitle>
                <BulletList>
                  {limitItems(quirks).map((quirk, index) => (
                    <RejectedItems key={index}>{quirk}</RejectedItems>
                  ))}
                </BulletList>
              </>
            )}
            {booksForFun && booksForFun.length > 0 && (
              <>
                <SectionTitle>Fun Books</SectionTitle>
                <BulletList>
                  {limitItems(booksForFun).map((book, index) => (
                    <RejectedItems key={index}>{book}</RejectedItems>
                  ))}
                </BulletList>
              </>
            )}
            {thingsLearnt && thingsLearnt.length > 0 && (
              <>
                <SectionTitle>Things Learnt</SectionTitle>
                <BulletList>
                  {limitItems(thingsLearnt).map((things, index) => (
                    <RejectedItems key={index}>{things}</RejectedItems>
                  ))}
                </BulletList>
              </>
            )}
          </ModalColumn>

          <ModalTextColumn>
            {regrets && regrets.length > 0 && (
              <>
                <SectionTitle>Regrets</SectionTitle>
                <BulletList>
                  {limitItems(regrets).map((regret, index) => (
                    <RejectedItems key={index}>{regret}</RejectedItems>
                  ))}
                </BulletList>
              </>
            )}
            {everydayLs && everydayLs.length > 0 && (
              <>
                <SectionTitle>Everyday Losses</SectionTitle>
                <BulletList>
                  {limitItems(everydayLs).map((loss, index) => (
                    <RejectedItems key={index}>{loss}</RejectedItems>
                  ))}
                </BulletList>
              </>
            )}
            {advice && advice.length > 0 && (
              <>
                <SectionTitle>Advice</SectionTitle>
                <BulletList>
                  {limitItems(advice).map((adviceItem, index) => (
                    <RejectedItems key={index}>{adviceItem}</RejectedItems>
                  ))}
                </BulletList>
              </>
            )}
            {memoriesImade && memoriesImade.length > 0 && (
              <>
                <SectionTitle>Memories Made</SectionTitle>
                <BulletList>
                  {limitItems(memoriesImade).map((memory, index) => (
                    <RejectedItems key={index}>{memory}</RejectedItems>
                  ))}
                </BulletList>
              </>
            )}
            {thingsIsworeIdFinish && thingsIsworeIdFinish.length > 0 && (
              <>
                <SectionTitle>Never Finished</SectionTitle>
                <BulletList>
                  {limitItems(thingsIsworeIdFinish).map((thing, index) => (
                    <RejectedItems key={index}>{thing}</RejectedItems>
                  ))}
                </BulletList>
              </>
            )}
            {endOfTheWorld && endOfTheWorld.length > 0 && (
              <>
                <SectionTitle>End of the World</SectionTitle>
                <BulletList>
                  {limitItems(endOfTheWorld).map((thing, index) => (
                    <RejectedItems key={index}>{thing}</RejectedItems>
                  ))}
                </BulletList>
              </>
            )}
          </ModalTextColumn>
        </ModalRow>

        <CloseButton onClick={onClose}>×</CloseButton>
      </ModalContent>
    </ModalOverlay>
  );
};

export default Modal;
