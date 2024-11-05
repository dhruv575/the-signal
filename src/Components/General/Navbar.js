import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import logo from './logo512.png';

const NavbarContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1rem;
  position: fixed;
  width: 80%;
  top: 4%;
  left: 10%;
  border-radius: 1rem;
  z-index: 5;
  background-color: rgba(215, 215, 215, 1);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.5);

  @media (max-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
    left: 0;
    top: 0;
    padding: 0.5rem 1rem;
    border-radius: 0;
    background-color: rgba(200, 200, 200, 1);
  }
`;

const Logo = styled.img`
  height: 3rem;

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
  justify-content: space-around;
  align-items: center;
  width: 30%;

  @media (max-width: 768px) {
    width: 60%;
    margin-right: 1rem;
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: ${(props) => props.fontColor || 'black'};
  font-size: 16px;

  &:hover {
    color: #a9a9a9;
  }

  @media (max-width: 768px) {
    font-size: 14px;
    margin-left: 1rem;
  }
`;

const NavbarLink = styled.a`
  text-decoration: none;
  color: var(--orange);
  font-size: 16px;

  &:hover {
    color: #a9a9a9;
  }

  @media (max-width: 768px) {
    font-size: 14px;
    margin-left: 1rem;
  }
`;

// Dropdown styling
const Dropdown = styled.div`
  position: relative;
  display: inline-block;

  &:hover > div {
    display: block;
  }
`;

const DropdownContent = styled.div`
  display: none;
  position: absolute;
  background-color: #f9f9f9;
  min-width: 160px;
  box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.2);
  z-index: 1;

  a {
    color: black;
    padding: 12px 16px;
    text-decoration: none;
    display: block;
    font-size: 14px;

    &:hover {
      background-color: #f1f1f1;
    }
  }

  @media (max-width: 768px) {
    left: -30px; /* Adjust to fit on screen */
  }
`;

const Navbar = () => {
  return (
    <NavbarContainer>
      <NavbarLeft>
        <Link to="/">
          <Logo src={logo} alt="Signal" />
        </Link>
      </NavbarLeft>
      <NavbarRight>
        {/* Dropdown Menu for Projects */}
        <Dropdown>
          <StyledLink to="/projects" fontColor="black">
            Projects
          </StyledLink>
          <DropdownContent>
            <StyledLink to="/antiresume">Anti Resume</StyledLink>
            <StyledLink to="/confessions">Confessions</StyledLink>
          </DropdownContent>
        </Dropdown>
        <NavbarLink href="/about">About</NavbarLink>
      </NavbarRight>
    </NavbarContainer>
  );
};

export default Navbar;
