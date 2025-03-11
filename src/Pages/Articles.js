import React from 'react';
import styled from 'styled-components';
import BlogList from '../Components/Blog/BlogList';

// Define color constants to match Navbar
const GRAY_LIGHT = '#f5f5f7';

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100%;
  background-color: ${GRAY_LIGHT};
`;

const Articles = () => {
  return (
    <PageContainer>
      <BlogList />
    </PageContainer>
  );
};

export default Articles; 