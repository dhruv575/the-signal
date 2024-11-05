import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faYoutube, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faGlobe } from '@fortawesome/free-solid-svg-icons';
import logo from './logo512.png';

const FooterContainer = styled.footer`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background: #909090;
  color: blue;
  box-shadow: 0 4px 6px rgba(0.5, 0.5, 0.5, 0.3);
  font-family: "Poppins", sans-serif;
`;

const FooterLogo = styled.div`
  display: flex;
  align-items: center;
`;

const LogoImage = styled.img`
  height: 2rem;
  margin-right: 0.5rem;
`;

const FooterRight = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  font-size: 0.9rem;
`;

const FooterIcon = styled.a`
  color: black;
  font-size: 1.5rem;
  transition: color 0.3s ease;

  &:hover {
    color: var(--orange);
  }
`;

const Footer = () => {
  return (
    <FooterContainer>
      <FooterLogo>
        <LogoImage src={logo} alt="Signal" />
      </FooterLogo>
      <FooterRight>
        <FooterIcon href="https://www.youtube.com/@signalsociety" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faYoutube} />
        </FooterIcon>
        <FooterIcon href="https://www.instagram.com/signal.penn/" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faInstagram} />
        </FooterIcon>
        <FooterIcon href="https://thesign.al/" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faGlobe} />
        </FooterIcon>
      </FooterRight>
    </FooterContainer>
  );
};

export default Footer;
