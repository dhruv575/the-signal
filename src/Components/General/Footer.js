import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faYoutube, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faGlobe } from '@fortawesome/free-solid-svg-icons';
import logo from './logo512.png';

// Define color constants to match Navbar
const NAVY = '#0A2463';
const NAVY_LIGHT = '#1A3473';
const GRAY_LIGHT = '#f5f5f7';

const FooterContainer = styled.footer`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.2rem 2rem;
  background: ${GRAY_LIGHT};
  color: ${NAVY};
  box-shadow: 0 -6px 25px rgba(10, 36, 99, 0.15);
  font-family: "Poppins", sans-serif;
  border-top: 2px solid ${NAVY};
  box-sizing: border-box;
  width: 100%;
  
  @media (max-width: 768px) {
    padding: 1rem 1.2rem;
  }
`;

const FooterLogo = styled.div`
  display: flex;
  align-items: center;
`;

const LogoImage = styled.img`
  height: 2.5rem;
  margin-right: 0.5rem;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }
  
  @media (max-width: 768px) {
    height: 2rem;
  }
`;

const FooterRight = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  font-size: 0.9rem;
  
  @media (max-width: 768px) {
    gap: 1rem;
  }
`;

const FooterIcon = styled.a`
  color: ${NAVY};
  font-size: 1.5rem;
  transition: all 0.3s ease;
  padding: 0.5rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    color: ${NAVY_LIGHT};
    background-color: rgba(10, 36, 99, 0.08);
    transform: translateY(-2px);
  }
  
  &:active {
    transform: translateY(0);
  }
  
  @media (max-width: 768px) {
    font-size: 1.3rem;
    padding: 0.4rem;
  }
`;

const Footer = () => {
  return (
    <FooterContainer>
      <FooterLogo>
        <LogoImage src={logo} alt="Signal" />
      </FooterLogo>
      <FooterRight>
        <FooterIcon href="https://www.youtube.com/@signalsociety" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
          <FontAwesomeIcon icon={faYoutube} />
        </FooterIcon>
        <FooterIcon href="https://www.instagram.com/signal.penn/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
          <FontAwesomeIcon icon={faInstagram} />
        </FooterIcon>
        <FooterIcon href="https://thesign.al/" target="_blank" rel="noopener noreferrer" aria-label="Website">
          <FontAwesomeIcon icon={faGlobe} />
        </FooterIcon>
      </FooterRight>
    </FooterContainer>
  );
};

export default Footer;
