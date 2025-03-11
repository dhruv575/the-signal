import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import styled from 'styled-components';
import ReactMarkdown from 'react-markdown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faCalendarAlt, faUser, faShareAlt } from '@fortawesome/free-solid-svg-icons';
import blogData from '../../Data/Blogs/blogs.json';

// Define color constants to match Navbar
const NAVY = '#0A2463';
const NAVY_LIGHT = '#1A3473';

const BlogPostContainer = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: 4rem 2rem;
  
  @media (max-width: 768px) {
    padding: 2rem 1.5rem;
  }
`;

const BackButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  color: ${NAVY};
  text-decoration: none;
  font-weight: 600;
  margin-bottom: 2rem;
  transition: color 0.2s ease;
  
  &:hover {
    color: ${NAVY_LIGHT};
  }
  
  svg {
    margin-right: 0.5rem;
  }
`;

const BlogHeader = styled.header`
  margin-bottom: 3rem;
`;

const BlogTitle = styled.h1`
  font-size: clamp(2rem, 5vw, 3.5rem);
  color: ${NAVY};
  margin-bottom: 1.5rem;
  line-height: 1.2;
  font-weight: 700;
`;

const BlogMeta = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  margin-bottom: 2rem;
  color: #666;
  font-size: 1rem;
  
  @media (max-width: 768px) {
    gap: 1rem;
    font-size: 0.9rem;
  }
`;

const MetaItem = styled.div`
  display: flex;
  align-items: center;
  
  svg {
    margin-right: 0.5rem;
    color: ${NAVY};
  }
`;

const HeroImage = styled.img`
  width: 100%;
  height: auto;
  max-height: 500px;
  object-fit: cover;
  border-radius: 12px;
  margin-bottom: 3rem;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
`;

const BlogContent = styled.div`
  color: #333;
  line-height: 1.8;
  font-size: 1.1rem;
  
  h1, h2, h3, h4, h5, h6 {
    color: ${NAVY};
    margin: 2rem 0 1rem;
    line-height: 1.3;
  }
  
  h1 {
    font-size: 2.2rem;
  }
  
  h2 {
    font-size: 1.8rem;
  }
  
  h3 {
    font-size: 1.5rem;
  }
  
  p {
    margin-bottom: 1.5rem;
  }
  
  a {
    color: ${NAVY};
    text-decoration: underline;
    text-decoration-color: rgba(10, 36, 99, 0.3);
    text-underline-offset: 3px;
    transition: text-decoration-color 0.2s ease;
    
    &:hover {
      text-decoration-color: ${NAVY};
    }
  }
  
  ul, ol {
    margin: 1.5rem 0;
    padding-left: 2rem;
  }
  
  li {
    margin-bottom: 0.5rem;
  }
  
  blockquote {
    border-left: 4px solid ${NAVY};
    padding-left: 1.5rem;
    margin: 2rem 0;
    font-style: italic;
    color: #555;
  }
  
  img {
    max-width: 100%;
    border-radius: 8px;
    margin: 2rem 0;
  }
  
  code {
    background-color: #f4f4f4;
    padding: 0.2rem 0.4rem;
    border-radius: 4px;
    font-family: 'Courier New', monospace;
    font-size: 0.9em;
  }
  
  pre {
    background-color: #f4f4f4;
    padding: 1rem;
    border-radius: 8px;
    overflow-x: auto;
    margin: 1.5rem 0;
    
    code {
      background-color: transparent;
      padding: 0;
    }
  }
  
  @media (max-width: 768px) {
    font-size: 1rem;
    
    h1 {
      font-size: 1.8rem;
    }
    
    h2 {
      font-size: 1.5rem;
    }
    
    h3 {
      font-size: 1.3rem;
    }
  }
`;

const ShareSection = styled.div`
  margin-top: 4rem;
  padding-top: 2rem;
  border-top: 1px solid #eee;
  display: flex;
  align-items: center;
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
`;

const ShareLabel = styled.span`
  display: flex;
  align-items: center;
  margin-right: 1.5rem;
  font-weight: 600;
  color: ${NAVY};
  
  svg {
    margin-right: 0.5rem;
  }
`;

const ShareButtons = styled.div`
  display: flex;
  gap: 1rem;
`;

const ShareButton = styled.button`
  background-color: ${NAVY};
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0.5rem 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s ease;
  
  &:hover {
    background-color: ${NAVY_LIGHT};
  }
`;

// Function to format date
const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('en-US', options);
};

const BlogPost = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [markdown, setMarkdown] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    // Find the blog post with the matching slug
    const blogPost = blogData.find(blog => blog.slug === slug);
    
    if (!blogPost) {
      setError('Blog post not found');
      setLoading(false);
      return;
    }
    
    setPost(blogPost);
    
    // Fetch the markdown content
    fetch(`/Blogs/${blogPost.content}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to load blog content');
        }
        return response.text();
      })
      .then(data => {
        setMarkdown(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error loading markdown:', err);
        setError('Failed to load blog content');
        setLoading(false);
      });
  }, [slug]);
  
  const handleShare = (platform) => {
    const url = window.location.href;
    const title = post?.title || 'Blog Post';
    
    switch (platform) {
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`, '_blank');
        break;
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'linkedin':
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank');
        break;
      default:
        // Copy to clipboard
        navigator.clipboard.writeText(url)
          .then(() => alert('Link copied to clipboard!'))
          .catch(err => console.error('Could not copy text: ', err));
    }
  };
  
  if (loading) {
    return (
      <BlogPostContainer>
        <p>Loading...</p>
      </BlogPostContainer>
    );
  }
  
  if (error) {
    return (
      <BlogPostContainer>
        <p>{error}</p>
        <BackButton to="/articles">
          <FontAwesomeIcon icon={faArrowLeft} /> Back to Articles
        </BackButton>
      </BlogPostContainer>
    );
  }
  
  return (
    <BlogPostContainer>
      <BackButton to="/articles">
        <FontAwesomeIcon icon={faArrowLeft} /> Back to Articles
      </BackButton>
      
      <BlogHeader>
        <BlogTitle>{post.title}</BlogTitle>
        <BlogMeta>
          <MetaItem>
            <FontAwesomeIcon icon={faUser} /> {post.author}
          </MetaItem>
          <MetaItem>
            <FontAwesomeIcon icon={faCalendarAlt} /> {formatDate(post.date)}
          </MetaItem>
        </BlogMeta>
      </BlogHeader>
      
      <HeroImage src={post.mainImage} alt={post.title} />
      
      <BlogContent>
        <ReactMarkdown>{markdown}</ReactMarkdown>
      </BlogContent>
      
      <ShareSection>
        <ShareLabel>
          <FontAwesomeIcon icon={faShareAlt} /> Share this article
        </ShareLabel>
        <ShareButtons>
          <ShareButton onClick={() => handleShare('twitter')}>Twitter</ShareButton>
          <ShareButton onClick={() => handleShare('facebook')}>Facebook</ShareButton>
          <ShareButton onClick={() => handleShare('linkedin')}>LinkedIn</ShareButton>
          <ShareButton onClick={() => handleShare('copy')}>Copy Link</ShareButton>
        </ShareButtons>
      </ShareSection>
    </BlogPostContainer>
  );
};

export default BlogPost; 