import React, { useMemo, useState } from 'react';
import styled from 'styled-components';
import loveImage from '../Images/love2.svg';
import conf1 from '../Images/conf1.jpg';
import conf2 from '../Images/conf2.jpg';
import confessionsData from '../Data/confessions.json';

// Define color constants to match Navbar
const NAVY = '#0A2463';
const NAVY_LIGHT = '#1A3473';
const GRAY_LIGHT = '#f5f5f7';

// Pre-compute pastel colors for better performance
const generatePastelColors = (count) => {
  const colors = [];
  for (let i = 0; i < count; i++) {
    const hue = (i * 137.508) % 360; // Golden angle for better distribution
    colors.push(`hsl(${hue}, 70%, 80%)`);
  }
  return colors;
};

const ConfessionsContainer = styled.div`
  width: 100%;
`;

const SectionTwo = styled.div`
  min-height: 70vh;
  color: ${NAVY};
  display: flex;
  flex-direction: column;
  padding: 5rem 3rem;
  align-items: center;
  justify-content: flex-start;
  background-color: ${GRAY_LIGHT};
  
  @media (max-width: 768px) {
    padding: 3rem 1.5rem;
  }
`;

const SectionTwoTitle = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 2rem;
  position: relative;
  font-weight: 700;
  
  &:after {
    content: '';
    position: absolute;
    bottom: -0.5rem;
    left: 50%;
    transform: translateX(-50%);
    width: 60px;
    height: 4px;
    background-color: ${NAVY};
  }
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const SectionTwoText = styled.p`
  font-size: 1.1rem;
  text-align: center;
  margin-bottom: 1.5rem;
  max-width: 800px;
  line-height: 1.8;
  
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const HintText = styled(SectionTwoText)`
  font-style: italic;
  color: ${NAVY_LIGHT};
  background-color: rgba(10, 36, 99, 0.05);
  padding: 1rem 2rem;
  border-radius: 8px;
  margin: 1rem 0 2.5rem;
  display: flex;
  align-items: center;
  
  &:before, &:after {
    content: '✨';
    margin: 0 0.5rem;
  }
`;

const SectionTwoImageContainer = styled.div`
  display: flex;
  gap: 2rem;
  width: 100%;
  max-width: 1200px;
  justify-content: center;
  margin-top: 1rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    gap: 1.5rem;
  }
`;

const SectionTwoImage = styled.img`
  height: auto;
  max-height: 50vh;
  object-fit: cover;
  border-radius: 12px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 25px rgba(0, 0, 0, 0.2);
  }
  
  &:first-child {
    width: 60%;
  }
  &:last-child {
    width: 35%;
  }
  
  @media (max-width: 768px) {
    &:first-child, &:last-child {
      width: 100%;
      max-width: 500px;
    }
  }
`;

const SectionThree = styled.div`
  background-color: beige;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const Image = styled.img`
  width: 200vh;
  object-fit: contain;
`;

const PostItNote = styled.button`
  width: 2.6rem;
  height: 2.6rem;
  background-color: ${({ color }) => color};
  position: absolute;
  font-family: sans-serif;
  top: ${({ top }) => top}%;
  left: ${({ left }) => left}%;
  border-radius: 5%;
  box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.3);
  cursor: pointer;
  border: none;
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.1);
  }

  @media (max-width: 768px) {
    width: 1.8rem;
    height: 1.8rem;
  }
  @media (max-width: 500px) {
    width: 1.2rem;
    height: 1.2rem;
  }
`;

const fonts = [
  "'Permanent Marker', cursive",
  "'Reenie Beanie', cursive",
  "'Shadows Into Light', cursive",
  "'Gloria Hallelujah', cursive",
  "'Patrick Hand', cursive"
];

const getRandomFont = () => fonts[Math.floor(Math.random() * fonts.length)];

const Modal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  min-height: 250px;
  width: 300px;
  transform: translate(-50%, -50%);
  background-color: ${({ color }) => color};
  color: rgba(0, 0, 0, 0.8);
  font-size: 1.5rem;
  padding: 2.5rem;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  z-index: 10;
  max-width: 90%;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-family: ${({ font }) => font};
  transition: transform 0.3s ease;
  animation: modalAppear 0.3s ease-out;
  
  @keyframes modalAppear {
    from {
      opacity: 0;
      transform: translate(-50%, -40%);
    }
    to {
      opacity: 1;
      transform: translate(-50%, -50%);
    }
  }
  
  @media (max-width: 768px) {
    font-size: 1.3rem;
    padding: 2rem;
    width: 280px;
  }
`;

const ModalButton = styled.button`
  margin-top: 1.5rem;
  padding: 0.7rem 1.5rem;
  background-color: rgba(0, 0, 0, 0.1);
  border: none;
  border-radius: 30px;
  color: rgba(0, 0, 0, 0.7);
  font-weight: bold;
  cursor: pointer;
  transition: all 0.2s ease;
  font-family: inherit;
  font-size: 1rem;

  &:hover {
    background-color: rgba(0, 0, 0, 0.2);
    transform: translateY(-2px);
  }
  
  &:active {
    transform: translateY(0);
  }
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  z-index: 5;
  animation: fadeIn 0.3s ease-out;
  
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const positions = [
  { top: 16, left: 16 },
  { top: 17, left: 20 },
  { top: 22, left: 19 },
  { top: 27, left: 21 },
  { top: 40, left: 18 },
  { top: 36, left: 23 },
  { top: 46, left: 27 },
  { top: 50, left: 25 },
  { top: 53, left: 21 },
  { top: 66, left: 28 },
  { top: 60, left: 23 },
  { top: 66, left: 22 },
  { top: 24, left: 24 },
  { top: 74, left: 33 },
  { top: 78, left: 28 },
  { top: 80, left: 30 },
  { top: 28, left: 56 },
  { top: 22, left: 55 },
  { top: 18, left: 60 },
  { top: 36, left: 76 },
  { top: 42, left: 72 },
  { top: 45, left: 68 },
  { top: 44, left: 44 },
  { top: 48, left: 46 },
  { top: 50, left: 60 },
  { top: 54, left: 65 },
  { top: 60, left: 61 },
  { top: 57, left: 57 },
  { top: 58, left: 40 },
  { top: 64, left: 39 },
  { top: 62, left: 58 },
  { top: 70, left: 62 },
  { top: 77, left: 57 },
  { top: 66, left: 64 },
  { top: 68, left: 68 },
  { top: 70, left: 75 },
  { top: 78, left: 63 },
  { top: 56, left: 83 },
  { top: 84, left: 60 },
  { top: 82, left: 82 }
];

const Confessions = () => {
  const [modalContent, setModalContent] = useState(null);
  
  // Memoize the shuffled confessions and colors
  const { shuffledConfessions, colors } = useMemo(() => {
    const colors = generatePastelColors(40);
    const shuffled = [...confessionsData]
      .sort(() => 0.5 - Math.random())
      .slice(0, 40);
    return { shuffledConfessions: shuffled, colors };
  }, []);

  const handlePostItClick = (confessionText, color) => {
    setModalContent({ text: confessionText, color });
  };

  return (
    <ConfessionsContainer>
      <SectionThree>
        <Image 
          src={loveImage} 
          alt="Love illustration" 
          loading="lazy"
        />
        {shuffledConfessions.map((confession, index) => (
          <PostItNote
            key={index}
            color={colors[index]}
            top={positions[index].top}
            left={positions[index].left}
            onClick={() => handlePostItClick(confession.confession, colors[index])}
            aria-label={`Open confession ${index + 1}`}
          />
        ))}
      </SectionThree>

      <SectionTwo>
        <SectionTwoTitle>About Confessions</SectionTwoTitle>
        <SectionTwoText>
          Confessions on Locust is a series of exhibits and videos that encourage 
          the Penn community to slow down and reflect on the Penn experience. 
          Look out for our chalk circles or LOVE Statue exhibits!
        </SectionTwoText>
        <HintText>
          Click on the post-its above for a sneak peek at some confessions!
        </HintText>
        <SectionTwoImageContainer>
          <SectionTwoImage 
            src={conf1} 
            alt="Confession 1" 
            loading="lazy"
          />
          <SectionTwoImage 
            src={conf2} 
            alt="Confession 2" 
            loading="lazy"
          />
        </SectionTwoImageContainer>
      </SectionTwo>

      {modalContent && (
        <>
          <Overlay onClick={() => setModalContent(null)} />
          <Modal color={modalContent.color} font={getRandomFont()}>
            <p>{modalContent.text}</p>
            <ModalButton onClick={() => setModalContent(null)}>
              Close
            </ModalButton>
          </Modal>
        </>
      )}
    </ConfessionsContainer>
  );
};

export default Confessions;