import React, { useState } from 'react';
import { Container, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import isEqual from 'lodash/isEqual';
import CV from './CV';
import Skills from './skills';
import Locations from './locations';
import Links from './links';
import CoverLetter from './coverLetter';
import ContactDetails from './ContactDetails';
import WorkExperience from './WorkExperience';
import Education from './education';

const Candidate = () => {
  const [initialData, setInitialData] = useState({
    cv: '',
    skills: [],
    links: [],
    locations: [],
    coverLetter: '',
    workExperience: '',
    contactDetails: {},
    education: {
      hasHigherEducation: 'no',
      educationFields: ['']
    }
  });
  const [currentData, setCurrentData] = useState(initialData);
  const [hasChanged, setHasChanged] = useState(false);
  const navigate = useNavigate();

  const handleSave = () => {
    if (!hasChanged && isEqual(initialData, currentData)) {
      alert('לא היו שינויים');
    } else {
      alert('הנתונים נשמרו בהצלחה');
      setInitialData(currentData);
      setHasChanged(false);
      navigate('/home');
    }
  };

  const iconColor = 'primary'; // Define your custom color here

  return (
    <Container maxWidth="md" sx={{ marginTop: 4, textAlign: 'right' }}>
      <Box sx={{ borderRadius: 1, p: 2, mb: 2 }}>
        <ContactDetails
          data={currentData.contactDetails}
          setData={(data) => setCurrentData({ ...currentData, contactDetails: data })}
          iconColor={iconColor}
        />
      </Box>
      <Box sx={{ borderRadius: 1, p: 2, mb: 2 }}>
        <CV
          data={currentData.cv}
          setData={(data) => setCurrentData({ ...currentData, cv: data })}
          iconColor={iconColor}
        />
      </Box>
      <Box sx={{ borderRadius: 1, p: 2, mb: 2 }}>
        <Skills
          data={currentData.skills}
          setData={(data) => setCurrentData({ ...currentData, skills: data })}
          iconColor={iconColor}
        />
      </Box>
      <Box sx={{ borderRadius: 1, p: 2, mb: 2 }}>
        <Links
          data={currentData.links}
          setData={(data) => setCurrentData({ ...currentData, links: data })}
          iconColor={iconColor}
        />
      </Box>
      <Box sx={{ borderRadius: 1, p: 2, mb: 2 }}>
        <Education
          data={currentData.education}
          setData={(data) => setCurrentData({ ...currentData, education: data })}
          setHasChanged={setHasChanged}
          iconColor={iconColor}
        />
      </Box>
      <Box sx={{ borderRadius: 1, p: 2, mb: 2 }}>
        <Locations
          data={currentData.locations}
          setData={(data) => setCurrentData({ ...currentData, locations: data })}
          iconColor={iconColor}
        />
      </Box>
      <Box sx={{ borderRadius: 1, p: 2, mb: 2 }}>
        <WorkExperience
          data={currentData.workExperience}
          setData={(data) => setCurrentData({ ...currentData, workExperience: data })}
          iconColor={iconColor}
        />
      </Box>
      <Box sx={{ borderRadius: 1, p: 2, mb: 2 }}>
        <CoverLetter
          data={currentData.coverLetter}
          setData={(data) => setCurrentData({ ...currentData, coverLetter: data })}
          iconColor={iconColor}
        />
      </Box>
      <Button
        variant="contained"
        color="primary"
        onClick={handleSave}
        sx={{ marginBottom: 4, marginTop: 2, marginRight: 10, width: '80%' }}
      >
        שמור
      </Button>
    </Container>
  );
};

export default Candidate;
