import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faGlobe, faEnvelope, faTimes } from '@fortawesome/free-solid-svg-icons';

// Define color constants to match Navbar
const NAVY = '#0A2463';

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
  animation: fadeIn 0.3s ease;
  
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
`;

const ModalContent = styled.div`
  width: 70%;
  height: 85%;
  background: white;
  padding: 2.5rem;
  display: flex;
  flex-direction: column;
  border-radius: 12px;
  position: relative;
  overflow-y: auto;
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.2);
  animation: slideIn 0.3s ease;
  -webkit-overflow-scrolling: touch; /* Smooth scrolling on iOS */
  
  @keyframes slideIn {
    from { transform: translateY(20px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
  }

  @media (max-width: 768px) {
    width: 90%;
    height: 80%;
    padding: 1.5rem 1.2rem 0;
  }
  
  @media (max-width: 480px) {
    width: 95%;
    height: 85%;
    padding: 1.2rem 1rem 0;
  }
`;

const ModalRow = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    flex-direction: column;
    margin-bottom: 1.5rem;
  }
  
  &:last-child {
    margin-bottom: 0;
    padding-bottom: 2rem;
    
    @media (max-width: 768px) {
      padding-bottom: 1.5rem;
    }
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
    align-items: center;
  }
`;

const ModalTextColumn = styled.div`
  flex: 0 0 75%;
  padding: 0 2rem;

  @media (max-width: 768px) {
    padding: 0;
    width: 100%;
  }
`;

const ModalImage = styled.img`
  width: 180px;
  height: 180px;
  object-fit: cover;
  border-radius: 50%;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    width: 150px;
    height: 150px;
  }
  
  @media (max-width: 480px) {
    width: 120px;
    height: 120px;
  }
`;

const ContactLinks = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 1.5rem;
  width: 100%;

  @media (max-width: 768px) {
    align-items: center;
    margin-top: 1rem;
  }
`;

const IconLink = styled.a`
  display: flex;
  align-items: center;
  color: ${NAVY};
  text-decoration: none;
  margin: 0.5rem 0;
  padding: 0.5rem;
  border-radius: 4px;
  transition: all 0.2s ease;

  &:hover {
    background-color: rgba(10, 36, 99, 0.05);
    transform: translateX(5px);
  }

  svg {
    margin-right: 0.8rem;
    font-size: 1.2rem;
  }

  @media (max-width: 768px) {
    font-size: 0.9rem;
    padding: 0.7rem;
    margin: 0.2rem 0;
    
    &:hover {
      transform: none;
    }
  }
`;

const ModalName = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  margin: 0;
  color: ${NAVY};

  @media (max-width: 768px) {
    font-size: 2rem;
    text-align: center;
  }
  
  @media (max-width: 480px) {
    font-size: 1.8rem;
  }
`;

const Divider = styled.hr`
  margin: 1.5rem 0;
  border: 0;
  border-top: 1px solid #eee;
  
  @media (max-width: 768px) {
    margin: 1rem 0;
  }
`;

const ShortBio = styled.p`
  font-size: 1.2rem;
  line-height: 1.8;
  color: #444;

  @media (max-width: 768px) {
    font-size: 1rem;
    text-align: center;
    line-height: 1.6;
  }
`;

const SectionTitle = styled.h3`
  font-size: 1.3rem;
  margin: 1.5rem 0 0.8rem;
  color: ${NAVY};
  font-weight: 600;
  position: relative;
  padding-left: 1rem;
  
  &:before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: 4px;
    background-color: ${NAVY};
    border-radius: 4px;
  }
  
  @media (max-width: 768px) {
    font-size: 1.1rem;
    margin: 1.2rem 0 0.6rem;
  }
`;

const BulletList = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
`;

const RejectedItems = styled.li`
  font-size: 1rem;
  line-height: 1.6;
  padding: 0.5rem 0;
  position: relative;
  padding-left: 1.5rem;
  
  &:before {
    content: '•';
    position: absolute;
    left: 0;
    color: ${NAVY};
    font-weight: bold;
  }
  
  @media (max-width: 768px) {
    font-size: 0.95rem;
    padding: 0.4rem 0;
    line-height: 1.5;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  color: ${NAVY};
  font-size: 1.5rem;
  cursor: pointer;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: all 0.2s ease;
  z-index: 10;
  
  &:hover {
    background-color: rgba(10, 36, 99, 0.05);
  }
  
  @media (max-width: 768px) {
    top: 0.8rem;
    right: 0.8rem;
    width: 36px;
    height: 36px;
  }
`;

// Mobile-specific section container for better organization
const MobileSectionContainer = styled.div`
  @media (max-width: 768px) {
    background-color: #f9f9f9;
    border-radius: 8px;
    padding: 1rem;
    margin-bottom: 1rem;
    width: 100%;
  }
`;

// Container for sections on mobile to ensure equal width
const MobileSectionsGrid = styled.div`
  @media (max-width: 768px) {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1rem;
    width: 100%;
    margin-bottom: 1.5rem;
  }
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

  // Check if there are any sections to display
  const hasLeftSections = companiesRejectedFrom?.length > 0 || 
                         clubsRejectedFrom?.length > 0 || 
                         quirks?.length > 0 ||
                         booksForFun?.length > 0 ||
                         thingsLearnt?.length > 0;
                         
  const hasRightSections = regrets?.length > 0 || 
                          everydayLs?.length > 0 || 
                          advice?.length > 0 ||
                          memoriesImade?.length > 0 ||
                          thingsIsworeIdFinish?.length > 0 ||
                          endOfTheWorld?.length > 0;

  // Determine if we're on mobile
  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={onClose} aria-label="Close modal">
          <FontAwesomeIcon icon={faTimes} />
        </CloseButton>
        
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

        {(hasLeftSections || hasRightSections) && (
          <ModalRow>
            {/* Desktop view: Two columns */}
            {!isMobile ? (
              <>
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
                        {limitItems(thingsLearnt).map((thing, index) => (
                          <RejectedItems key={index}>{thing}</RejectedItems>
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
                        {limitItems(advice).map((tip, index) => (
                          <RejectedItems key={index}>{tip}</RejectedItems>
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
              </>
            ) : (
              /* Mobile view: Single column with grid */
              <MobileSectionsGrid>
                {companiesRejectedFrom && companiesRejectedFrom.length > 0 && (
                  <MobileSectionContainer>
                    <SectionTitle>Rejected From</SectionTitle>
                    <BulletList>
                      {limitItems(companiesRejectedFrom).map((company, index) => (
                        <RejectedItems key={index}>{company}</RejectedItems>
                      ))}
                    </BulletList>
                  </MobileSectionContainer>
                )}
                
                {clubsRejectedFrom && clubsRejectedFrom.length > 0 && (
                  <MobileSectionContainer>
                    <SectionTitle>Clubs Rejected From</SectionTitle>
                    <BulletList>
                      {limitItems(clubsRejectedFrom).map((club, index) => (
                        <RejectedItems key={index}>{club}</RejectedItems>
                      ))}
                    </BulletList>
                  </MobileSectionContainer>
                )}
                
                {quirks && quirks.length > 0 && (
                  <MobileSectionContainer>
                    <SectionTitle>Quirks</SectionTitle>
                    <BulletList>
                      {limitItems(quirks).map((quirk, index) => (
                        <RejectedItems key={index}>{quirk}</RejectedItems>
                      ))}
                    </BulletList>
                  </MobileSectionContainer>
                )}
                
                {regrets && regrets.length > 0 && (
                  <MobileSectionContainer>
                    <SectionTitle>Regrets</SectionTitle>
                    <BulletList>
                      {limitItems(regrets).map((regret, index) => (
                        <RejectedItems key={index}>{regret}</RejectedItems>
                      ))}
                    </BulletList>
                  </MobileSectionContainer>
                )}
                
                {everydayLs && everydayLs.length > 0 && (
                  <MobileSectionContainer>
                    <SectionTitle>Everyday Losses</SectionTitle>
                    <BulletList>
                      {limitItems(everydayLs).map((loss, index) => (
                        <RejectedItems key={index}>{loss}</RejectedItems>
                      ))}
                    </BulletList>
                  </MobileSectionContainer>
                )}
                
                {advice && advice.length > 0 && (
                  <MobileSectionContainer>
                    <SectionTitle>Advice</SectionTitle>
                    <BulletList>
                      {limitItems(advice).map((tip, index) => (
                        <RejectedItems key={index}>{tip}</RejectedItems>
                      ))}
                    </BulletList>
                  </MobileSectionContainer>
                )}
                
                {memoriesImade && memoriesImade.length > 0 && (
                  <MobileSectionContainer>
                    <SectionTitle>Memories Made</SectionTitle>
                    <BulletList>
                      {limitItems(memoriesImade).map((memory, index) => (
                        <RejectedItems key={index}>{memory}</RejectedItems>
                      ))}
                    </BulletList>
                  </MobileSectionContainer>
                )}
                
                {thingsIsworeIdFinish && thingsIsworeIdFinish.length > 0 && (
                  <MobileSectionContainer>
                    <SectionTitle>Never Finished</SectionTitle>
                    <BulletList>
                      {limitItems(thingsIsworeIdFinish).map((thing, index) => (
                        <RejectedItems key={index}>{thing}</RejectedItems>
                      ))}
                    </BulletList>
                  </MobileSectionContainer>
                )}
                
                {booksForFun && booksForFun.length > 0 && (
                  <MobileSectionContainer>
                    <SectionTitle>Fun Books</SectionTitle>
                    <BulletList>
                      {limitItems(booksForFun).map((book, index) => (
                        <RejectedItems key={index}>{book}</RejectedItems>
                      ))}
                    </BulletList>
                  </MobileSectionContainer>
                )}
                
                {thingsLearnt && thingsLearnt.length > 0 && (
                  <MobileSectionContainer>
                    <SectionTitle>Things Learnt</SectionTitle>
                    <BulletList>
                      {limitItems(thingsLearnt).map((thing, index) => (
                        <RejectedItems key={index}>{thing}</RejectedItems>
                      ))}
                    </BulletList>
                  </MobileSectionContainer>
                )}
                
                {endOfTheWorld && endOfTheWorld.length > 0 && (
                  <MobileSectionContainer>
                    <SectionTitle>End of the World</SectionTitle>
                    <BulletList>
                      {limitItems(endOfTheWorld).map((thing, index) => (
                        <RejectedItems key={index}>{thing}</RejectedItems>
                      ))}
                    </BulletList>
                  </MobileSectionContainer>
                )}
              </MobileSectionsGrid>
            )}
          </ModalRow>
        )}
      </ModalContent>
    </ModalOverlay>
  );
};

export default Modal;
