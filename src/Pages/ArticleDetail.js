import React from 'react';
import styled from 'styled-components';
import BlogPost from '../Components/Blog/BlogPost';

// Define color constants to match Navbar
const GRAY_LIGHT = '#f5f5f7';

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100%;
  background-color: ${GRAY_LIGHT};
`;

const ArticleDetail = () => {
  return (
    <PageContainer>
      <BlogPost />
    </PageContainer>
  );
};

export default ArticleDetail; 