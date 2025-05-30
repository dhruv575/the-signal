import React, { useState } from 'react';
import styled from 'styled-components';
import data from '../../Data/antires_normal.json'; // Import the JSON file
import profData from '../../Data/antires_prof.json'; // Import the professor JSON file
import PersonCard from './PersonCard'; // Import the PersonCard component

// Define color constants to match Navbar
const NAVY = '#0A2463';
const NAVY_LIGHT = '#1A3473';
const GRAY_LIGHT = '#f5f5f7';

const DataDisplayContainer = styled.div`
  background-color: white;
  padding: 4rem 0;
`;

const SectionContainer = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
  margin-bottom: 4rem;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
    gap: 1.5rem;
  }
`;

const YearHeading = styled.h2`
  font-size: 2.2rem;
  color: ${NAVY};
  margin-bottom: 2rem;
  position: relative;
  font-weight: 600;
  padding-bottom: 0.8rem;
  
  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 60px;
    height: 4px;
    background-color: ${NAVY};
  }
`;

const FilterContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 3rem;
  
  @media (max-width: 768px) {
    justify-content: center;
  }
`;

const FilterButton = styled.button`
  padding: 0.6rem 1.2rem;
  background-color: ${props => props.active ? NAVY : 'white'};
  color: ${props => props.active ? 'white' : NAVY};
  border: 1px solid ${NAVY};
  border-radius: 30px;
  cursor: pointer;
  font-size: 1rem;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: ${props => props.active ? NAVY_LIGHT : 'rgba(10, 36, 99, 0.05)'};
    transform: translateY(-2px);
  }
  
  &:active {
    transform: translateY(0);
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 3rem;
  background-color: ${GRAY_LIGHT};
  border-radius: 8px;
  margin-bottom: 4rem;
`;

const EmptyStateText = styled.p`
  font-size: 1.2rem;
  color: #666;
`;

const DataDisplay = () => {
  const [activeYear, setActiveYear] = useState('All');
  
  // Merge student and professor data
  const mergedData = [
    ...data,
    ...profData.map(prof => ({ ...prof, type: 'professor' }))
  ];

  // Get unique years from student data only (professors don't have 'class')
  const years = [
    'All',
    'Professors',
    ...Array.from(new Set(data.map(person => person.class).filter(Boolean))).sort((a, b) => b - a)
  ];
  
  // Filter data based on active year
  let filteredData;
  if (activeYear === 'All') {
    filteredData = mergedData.filter(person => person.name && person.profilePicUrl);
  } else if (activeYear === 'Professors') {
    filteredData = mergedData.filter(person => person.type === 'professor' && person.name && person.profilePicUrl);
  } else {
    filteredData = mergedData.filter(person => person.class === activeYear && person.name && person.profilePicUrl && person.type !== 'professor');
  }

  return (
    <DataDisplayContainer>
      <SectionContainer>
        <YearHeading>Anti-Resume Collection</YearHeading>
        
        <FilterContainer>
          {years.map((year, index) => (
            <FilterButton
              key={index}
              active={activeYear === year}
              onClick={() => setActiveYear(year)}
            >
              {year === 'All' ? 'All Classes' : year === 'Professors' ? 'Professors' : `Class of ${year}`}
            </FilterButton>
          ))}
        </FilterContainer>
        
        {filteredData.length > 0 ? (
          <GridContainer>
            {filteredData.map((person, index) => (
              <PersonCard
                key={index}
                person={person}
              />
            ))}
          </GridContainer>
        ) : (
          <EmptyState>
            <EmptyStateText>No entries found for this class year.</EmptyStateText>
          </EmptyState>
        )}
      </SectionContainer>
    </DataDisplayContainer>
  );
};

export default DataDisplay;
