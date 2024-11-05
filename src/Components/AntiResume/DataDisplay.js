import React from 'react';
import styled from 'styled-components';
import data from '../../Data/antires_normal.json'; // Import the JSON file
import PersonCard from './PersonCard'; // Import the PersonCard component

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(18rem, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
  padding: 0rem 6rem;
`;

const YearHeading = styled.h2`
  font-size: 2rem;
  color: black;
  margin-bottom: 1rem;
  padding: 0rem 6rem;
`;

const DataDisplay = () => {
  // Filter data for 2024 and 2023 entries
  const filtered2024 = data.filter(
    (person) => person.name && person.profilePicUrl && person.class === '2024'
  );
  const filtered2023 = data.filter(
    (person) => person.name && person.profilePicUrl && person.class === '2023'
  );
  const filtered2022 = data.filter(
    (person) => person.name && person.profilePicUrl && person.class === '2022'
  );
  const filtered2021 = data.filter(
    (person) => person.name && person.profilePicUrl && person.class === '2021'
  );
  const filtered2020 = data.filter(
    (person) => person.name && person.profilePicUrl && person.class === '2020'
  );
  const filtered2019 = data.filter(
    (person) => person.name && person.profilePicUrl && person.class === '2019'
  );

  return (
    <div>
      <YearHeading>Class of 2024</YearHeading>
      <GridContainer>
        {filtered2024.map((person, index) => (
          <PersonCard
            key={index}
            person={person} // Pass the entire person object
          />
        ))}
      </GridContainer>

      <YearHeading>Class of 2023</YearHeading>
      <GridContainer>
        {filtered2023.map((person, index) => (
          <PersonCard
            key={index}
            person={person} // Pass the entire person object
          />
        ))}
      </GridContainer>

      <YearHeading>Class of 2022</YearHeading>
      <GridContainer>
        {filtered2022.map((person, index) => (
          <PersonCard
            key={index}
            person={person} // Pass the entire person object
          />
        ))}
      </GridContainer>

      <YearHeading>Class of 2021</YearHeading>
      <GridContainer>
        {filtered2021.map((person, index) => (
          <PersonCard
            key={index}
            person={person} // Pass the entire person object
          />
        ))}
      </GridContainer>

      <YearHeading>Class of 2020</YearHeading>
      <GridContainer>
        {filtered2020.map((person, index) => (
          <PersonCard
            key={index}
            person={person} // Pass the entire person object
          />
        ))}
      </GridContainer>

      <YearHeading>Class of 2019</YearHeading>
      <GridContainer>
        {filtered2019.map((person, index) => (
          <PersonCard
            key={index}
            person={person} // Pass the entire person object
          />
        ))}
      </GridContainer>
    </div>
  );
};

export default DataDisplay;
