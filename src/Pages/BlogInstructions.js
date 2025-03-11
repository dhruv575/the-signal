import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileAlt, faImage, faFileExport, faRobot, faPaperPlane } from '@fortawesome/free-solid-svg-icons';

// Define color constants to match Navbar
const NAVY = '#0A2463';
const GRAY_LIGHT = '#f5f5f7';

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100%;
  background-color: ${GRAY_LIGHT};
`;

const InstructionsContainer = styled.div`
  max-width: 900px;
  margin: 0 auto;
  padding: 4rem 2rem;
  
  @media (max-width: 768px) {
    padding: 3rem 1.5rem;
  }
`;

const PageTitle = styled.h1`
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

const Introduction = styled.p`
  font-size: 1.2rem;
  line-height: 1.8;
  color: #444;
  margin-bottom: 3rem;
`;

const StepsList = styled.ol`
  counter-reset: steps;
  list-style: none;
  padding: 0;
  margin: 0;
`;

const Step = styled.li`
  position: relative;
  margin-bottom: 3rem;
  padding-left: 4rem;
  counter-increment: steps;
  
  &:before {
    content: counter(steps);
    position: absolute;
    left: 0;
    top: 0;
    width: 3rem;
    height: 3rem;
    background-color: ${NAVY};
    color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
    font-size: 1.5rem;
  }
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const StepTitle = styled.h2`
  font-size: 1.8rem;
  color: ${NAVY};
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  
  svg {
    margin-right: 0.8rem;
  }
`;

const StepContent = styled.div`
  font-size: 1.1rem;
  line-height: 1.7;
  color: #444;
  
  p {
    margin-bottom: 1rem;
  }
  
  ul {
    margin: 1rem 0;
    padding-left: 1.5rem;
  }
  
  li {
    margin-bottom: 0.5rem;
  }
  
  strong {
    color: ${NAVY};
  }
`;

const CodeBlock = styled.pre`
  background-color: #f4f4f4;
  padding: 1.5rem;
  border-radius: 8px;
  overflow-x: auto;
  margin: 1.5rem 0;
  font-family: 'Courier New', monospace;
  font-size: 0.9rem;
  border-left: 4px solid ${NAVY};
`;

const Note = styled.div`
  background-color: rgba(10, 36, 99, 0.05);
  border-left: 4px solid ${NAVY};
  padding: 1.5rem;
  margin: 1.5rem 0;
  border-radius: 0 8px 8px 0;
  
  p {
    margin: 0;
    font-style: italic;
  }
`;

const ImageExample = styled.div`
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 1rem;
  margin: 1.5rem 0;
  font-family: 'Courier New', monospace;
  font-size: 0.9rem;
  color: #666;
  word-break: break-all;
`;

const BlogInstructions = () => {
  return (
    <PageContainer>
      <InstructionsContainer>
        <PageTitle>Article Submission Guidelines</PageTitle>
        
        <Introduction>
          This guide will walk you through the process of preparing and submitting your articles for publication on the Signal website. 
          Following these steps will ensure your content is properly formatted and can be quickly published.
        </Introduction>
        
        <StepsList>
          <Step>
            <StepTitle>
              <FontAwesomeIcon icon={faFileAlt} /> Write Your Article
            </StepTitle>
            <StepContent>
              <p>Start by writing your article in a Google Doc with whatever formatting and images you would like to include.</p>
              <p>Feel free to use:</p>
              <ul>
                <li>Headings and subheadings</li>
                <li>Bold and italic text</li>
                <li>Bullet points and numbered lists</li>
                <li>Images and diagrams</li>
                <li>Quotes and citations</li>
              </ul>
              <p>Make sure your article has a clear title and is well-structured.</p>
            </StepContent>
          </Step>
          
          <Step>
            <StepTitle>
              <FontAwesomeIcon icon={faImage} /> Prepare Your Images
            </StepTitle>
            <StepContent>
              <p>For each image in your article:</p>
              <ol>
                <li>Go to <a href="https://imgbb.com/" target="_blank" rel="noopener noreferrer">ImgBB</a></li>
                <li>Upload your image</li>
                <li>Select the <strong>"Don't autodelete"</strong> setting from the dropdown menu</li>
                <li>After uploading, click on "Embed codes" and select <strong>"HTML Full Linked"</strong></li>
                <li>The code will look something like this:</li>
              </ol>
              
              <ImageExample>
                &lt;a href="https://imgbb.com/"&gt;&lt;img src="https://i.ibb.co/vxnGZMkx/filename.png" alt="djt" border="0"&gt;&lt;/a&gt;
              </ImageExample>
              
              <p>Copy <strong>only</strong> the URL within the <code>src</code> attribute (e.g., <code>https://i.ibb.co/vxnGZMkx/filename.png</code>)</p>
              <p>Replace each image in your document with its corresponding ImgBB link.</p>
              
              <Note>
                <p>Make sure to save these links separately as well, as you'll need them when formatting your article.</p>
              </Note>
            </StepContent>
          </Step>
          
          <Step>
            <StepTitle>
              <FontAwesomeIcon icon={faFileExport} /> Export as PDF
            </StepTitle>
            <StepContent>
              <p>Once your article is complete with all images replaced by ImgBB links:</p>
              <ol>
                <li>Go to File → Download → PDF Document (.pdf)</li>
                <li>Save the PDF to your computer</li>
              </ol>
              <p>This PDF will be used in the next step to generate the properly formatted files.</p>
            </StepContent>
          </Step>
          
          <Step>
            <StepTitle>
              <FontAwesomeIcon icon={faRobot} /> Format with ChatGPT
            </StepTitle>
            <StepContent>
              <p>Go to <a href="https://chat.openai.com/" target="_blank" rel="noopener noreferrer">ChatGPT</a> and provide it with the following prompt along with your PDF:</p>
              
              <CodeBlock>{`I have written an article in a pdf format, but need to edit it to fit the formatting of the company where it is going to be published.

The company requires 2 components, one being a JSON with the following format: 
{
 "title": "Test Blog",
 "slug": "test-blog",
 "date": "2025-03-11",
 "author": "John Doe",
 "mainImage": "imgBB link"
 "content": "testBlog.md"
}
and an accompanying markdown file, which does not include the title, date, author, or mainImage link at the top.

Please provide me with the relevant JSON and markdown file for the attached PDF. For the markdown file, maintain any formatting used in the pdf. Any time you encounter an ImgBB link, embed that as an image`}</CodeBlock>
              
              <p>Upload your PDF when prompted by ChatGPT.</p>
              
              <Note>
                <p>For the "mainImage" field in the JSON, use the ImgBB link of the main/featured image of your article.</p>
              </Note>
              
              <p>ChatGPT will provide you with:</p>
              <ol>
                <li>A JSON object with your article metadata</li>
                <li>A markdown file with your formatted content</li>
              </ol>
            </StepContent>
          </Step>
          
          <Step>
            <StepTitle>
              <FontAwesomeIcon icon={faPaperPlane} /> Submit Your Article
            </StepTitle>
            <StepContent>
              <p>Send the following to Dhruv:</p>
              <ol>
                <li>The JSON object provided by ChatGPT</li>
                <li>The markdown content provided by ChatGPT</li>
              </ol>
              <p>Dhruv will review your submission and publish it to the website as soon as possible.</p>
              
              <Note>
                <p>Please make sure both the JSON and markdown files are properly formatted before submission to avoid delays in publishing.</p>
              </Note>
            </StepContent>
          </Step>
        </StepsList>
      </InstructionsContainer>
    </PageContainer>
  );
};

export default BlogInstructions; 