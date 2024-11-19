import React, { useMemo, useState } from 'react';
import styled from 'styled-components';
import loveImage from '../Images/love2.svg';
import conf1 from '../Images/conf1.jpg';
import conf2 from '../Images/conf2.jpg';
import confessionsData from '../Data/confessions.json';

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
  height: 70vh;
  color: black;
  display: flex;
  flex-direction: column;
  padding: 3rem;
  align-items: center;
  justify-content: flex-start;
`;

const SectionTwoTitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 1rem;
`;

const SectionTwoText = styled.p`
  font-size: 1rem;
  text-align: center;
  margin-bottom: 1rem;
`;

const SectionTwoImageContainer = styled.div`
  display: flex;
  gap: 1rem;
  width: 100%;
  justify-content: center;
`;

const SectionTwoImage = styled.img`
  height: 45vh;
  object-fit: cover;
  &:first-child {
    width: 60%;
  }
  &:last-child {
    width: 35%;
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
  height: 200px;
  width: 200px;
  transform: translate(-50%, -50%);
  background-color: ${({ color }) => color};
  color: black;
  font-size: 1.5rem;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
  z-index: 10;
  max-width: 80%;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-family: ${({ font }) => font};
`;

const ModalButton = styled.button`
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  background-color: rgba(255, 255, 255, 0.2);
  border: none;
  border-radius: 4px;
  color: white;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: rgba(255, 255, 255, 0.3);
  }
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 5;
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
        <SectionTwoTitle>About</SectionTwoTitle>
        <SectionTwoText>
          Confessions on Locust is a series of exhibits and videos that encourage 
          the Penn community to slow down and reflect on the Penn experience. 
          Look out for our chalk circles or LOVE Statue exhibits! 
        </SectionTwoText>
        <SectionTwoText>
        Hint: Click on the post its above 
        for a sneak peek at some confessions!
        </SectionTwoText>
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