import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import blogData from '../../Data/Blogs/blogs.json';

// Define color constants to match Navbar
const NAVY = '#0A2463';

const BlogListContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 4rem 2rem;
  
  @media (max-width: 768px) {
    padding: 3rem 1.5rem;
  }
`;

const BlogListTitle = styled.h1`
  font-size: clamp(2.5rem, 5vw, 3.5rem);
  color: ${NAVY};
  margin-bottom: 2rem;
  font-weight: 700;
  position: relative;
  
  &:after {
    content: '';
    position: absolute;
    bottom: -0.8rem;
    left: 0;
    width: 80px;
    height: 4px;
    background-color: ${NAVY};
  }
`;

const BlogGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2.5rem;
  margin-top: 3rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const BlogCard = styled(Link)`
  display: flex;
  flex-direction: column;
  background-color: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  text-decoration: none;
  color: inherit;
  height: 100%;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.15);
  }
`;

const BlogImageContainer = styled.div`
  width: 100%;
  height: 200px;
  overflow: hidden;
`;

const BlogImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
  
  ${BlogCard}:hover & {
    transform: scale(1.05);
  }
`;

const BlogContent = styled.div`
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const BlogTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  color: ${NAVY};
  margin-bottom: 0.8rem;
  line-height: 1.3;
`;

const BlogMeta = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
  color: #666;
  font-size: 0.9rem;
`;

const BlogAuthor = styled.span`
  font-weight: 500;
`;

const BlogDate = styled.span``;

const ReadMoreButton = styled.span`
  color: ${NAVY};
  font-weight: 600;
  margin-top: auto;
  display: inline-block;
  position: relative;
  
  &:after {
    content: '';
    position: absolute;
    bottom: -4px;
    left: 0;
    width: 100%;
    height: 2px;
    background-color: ${NAVY};
    transform: scaleX(0);
    transform-origin: right;
    transition: transform 0.3s ease;
  }
  
  ${BlogCard}:hover &:after {
    transform: scaleX(1);
    transform-origin: left;
  }
`;

// Function to format date
const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('en-US', options);
};

const BlogList = () => {
  // Sort blogs by date (newest first)
  const sortedBlogs = [...blogData].sort((a, b) => new Date(b.date) - new Date(a.date));
  
  return (
    <BlogListContainer>
      <BlogListTitle>Articles</BlogListTitle>
      <BlogGrid>
        {sortedBlogs.map((blog, index) => (
          <BlogCard key={index} to={`/articles/${blog.slug}`}>
            <BlogImageContainer>
              <BlogImage src={blog.mainImage} alt={blog.title} />
            </BlogImageContainer>
            <BlogContent>
              <BlogTitle>{blog.title}</BlogTitle>
              <BlogMeta>
                <BlogAuthor>By {blog.author}</BlogAuthor>
                <BlogDate>{formatDate(blog.date)}</BlogDate>
              </BlogMeta>
              <ReadMoreButton>Read Article</ReadMoreButton>
            </BlogContent>
          </BlogCard>
        ))}
      </BlogGrid>
    </BlogListContainer>
  );
};

export default BlogList; 