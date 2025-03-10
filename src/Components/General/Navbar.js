import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import logo from './logo512.png';
import { FaChevronDown, FaBars, FaTimes } from 'react-icons/fa';

// Define color constants
const NAVY = '#0A2463';
const NAVY_LIGHT = '#1A3473';
const GRAY_LIGHT = '#f5f5f7';

const NavbarContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  position: relative;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 5;
  background-color: ${GRAY_LIGHT};
  box-shadow: 0 6px 25px rgba(10, 36, 99, 0.25);
  box-sizing: border-box;
  border-bottom: 2px solid ${NAVY};

  @media (max-width: 768px) {
    padding: 0.8rem 1.2rem;
  }
`;

const Logo = styled.img`
  height: 3rem;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }

  @media (max-width: 768px) {
    height: 2.5rem;
  }
`;

const NavbarLeft = styled.div`
  display: flex;
  align-items: center;
`;

const NavbarRight = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 2.5rem;

  @media (max-width: 768px) {
    position: fixed;
    top: ${({ isOpen }) => (isOpen ? '0' : '-100%')};
    left: 0;
    width: 100%;
    height: auto;
    flex-direction: column;
    background-color: ${GRAY_LIGHT};
    padding: 2rem 0;
    gap: 1.5rem;
    transition: top 0.3s ease;
    box-shadow: 0 6px 25px rgba(10, 36, 99, 0.25);
    z-index: 4;
    border-bottom: 2px solid ${NAVY};
  }
`;

const NavButton = styled.div`
  padding: 0.6rem 1.2rem;
  border-radius: 6px;
  font-weight: 500;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 5px;
  position: relative;
  
  &:hover {
    background-color: rgba(10, 36, 99, 0.08);
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }

  @media (max-width: 768px) {
    padding: 0.8rem 1.5rem;
    width: 80%;
    justify-content: center;
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: ${props => props.fontColor || NAVY};
  font-size: 16px;
  font-weight: 600;
  transition: color 0.2s ease;
  position: relative;
  letter-spacing: 0.3px;

  &:hover {
    color: ${NAVY_LIGHT};
  }

  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

const NavbarLink = styled.a`
  text-decoration: none;
  color: ${NAVY};
  font-size: 16px;
  font-weight: 600;
  transition: color 0.2s ease;
  letter-spacing: 0.3px;

  &:hover {
    color: ${NAVY_LIGHT};
  }

  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

// Dropdown styling
const Dropdown = styled.div`
  position: relative;
  display: inline-block;

  @media (max-width: 768px) {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

const ChevronIcon = styled(FaChevronDown)`
  margin-left: 5px;
  transition: transform 0.2s ease;
  color: ${NAVY};
  
  ${Dropdown}.active & {
    transform: rotate(180deg);
  }
`;

const DropdownContent = styled.div`
  position: absolute;
  background-color: #ffffff;
  min-width: 180px;
  box-shadow: 0px 8px 20px rgba(10, 36, 99, 0.2);
  z-index: 10;
  border-radius: 8px;
  top: 100%;
  left: 0;
  margin-top: 0.5rem;
  transition: all 0.3s ease;
  overflow: hidden;
  border-left: 2px solid ${NAVY};
  display: ${props => (props.isVisible ? 'block' : 'none')};
  opacity: ${props => (props.isVisible ? '1' : '0')};
  transform: ${props => (props.isVisible ? 'translateY(0)' : 'translateY(-10px)')};

  a {
    color: ${NAVY};
    padding: 12px 16px;
    text-decoration: none;
    display: block;
    font-size: 14px;
    transition: all 0.2s;
    border-left: 3px solid transparent;

    &:hover {
      background-color: rgba(10, 36, 99, 0.05);
      border-left: 3px solid ${NAVY};
      padding-left: 19px;
    }
  }

  @media (max-width: 768px) {
    position: static;
    box-shadow: none;
    width: 80%;
    margin: 0.5rem 0;
    background-color: transparent;
    display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
    opacity: 1;
    transform: none;
    border-left: none;
    border-top: 1px solid rgba(10, 36, 99, 0.1);
    border-bottom: 1px solid rgba(10, 36, 99, 0.1);

    a {
      text-align: center;
      padding: 10px;
      border-left: none;
      border-bottom: 1px solid rgba(10, 36, 99, 0.05);

      &:last-child {
        border-bottom: none;
      }

      &:hover {
        background-color: rgba(10, 36, 99, 0.05);
        border-left: none;
        padding-left: 10px;
      }
    }
  }
`;

// Create a connection area to prevent the dropdown from closing when moving from button to content
const DropdownConnector = styled.div`
  position: absolute;
  height: 20px;
  width: 100%;
  top: 100%;
  left: 0;
  z-index: 9;
`;

const MobileMenuButton = styled.div`
  display: none;
  cursor: pointer;
  z-index: 6;
  color: ${NAVY};
  
  @media (max-width: 768px) {
    display: block;
    font-size: 1.5rem;
  }
`;

const ProjectsButton = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
  color: ${NAVY};
  font-size: 16px;
  font-weight: 600;
  letter-spacing: 0.3px;
  
  @media (max-width: 768px) {
    width: 100%;
    justify-content: center;
  }
`;

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const dropdownRef = useRef(null);
  const dropdownButtonRef = useRef(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Handle desktop dropdown visibility
  const handleMouseEnter = () => {
    setIsDropdownVisible(true);
  };

  const handleMouseLeave = () => {
    // Add a small delay before closing to make it easier to move to the dropdown
    setTimeout(() => {
      // Check if the mouse is over the dropdown or button before closing
      if (!dropdownRef.current?.matches(':hover') && 
          !dropdownButtonRef.current?.matches(':hover')) {
        setIsDropdownVisible(false);
      }
    }, 100);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target) &&
          dropdownButtonRef.current && !dropdownButtonRef.current.contains(event.target)) {
        setIsDropdownVisible(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <NavbarContainer>
      <NavbarLeft>
        <Link to="/">
          <Logo src={logo} alt="Signal" />
        </Link>
      </NavbarLeft>

      <MobileMenuButton onClick={toggleMenu}>
        {isMenuOpen ? <FaTimes /> : <FaBars />}
      </MobileMenuButton>

      <NavbarRight isOpen={isMenuOpen}>
        {/* Dropdown Menu for Projects */}
        <Dropdown className={isDropdownVisible ? 'active' : ''}>
          {window.innerWidth <= 768 ? (
            <>
              <NavButton onClick={toggleDropdown}>
                <ProjectsButton>
                  Projects
                  <ChevronIcon size={12} />
                </ProjectsButton>
              </NavButton>
              <DropdownContent isOpen={isDropdownOpen}>
                <StyledLink to="/antiresume">Anti Resume</StyledLink>
                <StyledLink to="/confessions">Confessions</StyledLink>
              </DropdownContent>
            </>
          ) : (
            <>
              <NavButton 
                ref={dropdownButtonRef}
                onMouseEnter={handleMouseEnter} 
                onMouseLeave={handleMouseLeave}
                onClick={() => setIsDropdownVisible(!isDropdownVisible)}
              >
                <StyledLink to="/projects">Projects</StyledLink>
                <ChevronIcon size={12} />
              </NavButton>
              <DropdownConnector onMouseEnter={handleMouseEnter} />
              <DropdownContent 
                ref={dropdownRef}
                isVisible={isDropdownVisible}
                onMouseEnter={handleMouseEnter} 
                onMouseLeave={handleMouseLeave}
              >
                <StyledLink to="/antiresume">Anti Resume</StyledLink>
                <StyledLink to="/confessions">Confessions</StyledLink>
              </DropdownContent>
            </>
          )}
        </Dropdown>
        <NavButton>
          <NavbarLink href="/about">About</NavbarLink>
        </NavButton>
      </NavbarRight>
    </NavbarContainer>
  );
};

export default Navbar;
