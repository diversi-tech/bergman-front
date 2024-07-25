import React, { useState } from 'react';
import { Container, Typography, Button, Box } from '@mui/material';
import CV from './CV';
import Skills from './skills';
import Locations from './locations';
import Links from './links';
import CoverLetter from './coverLetter';
import { useNavigate } from 'react-router-dom';
import ContactDetails from './ContactDetails';
import WorkExperience from './WorkExperience';
import isEqual from 'lodash/isEqual';
import Educatuin from './education';

const Candidate = () => {
  // הגדרת נתונים ראשוניים (שימוש בנתונים דיפולטיביים)
  const [initialData, setInitialData] = useState({
    cv: '',
    skills: [],
    links: [],
    locations: [],
    coverLetter: '',
    workExperience: '',
    contactDetails: {}
  });
  const [currentData, setCurrentData] = useState(initialData);
  const navigate = useNavigate();

  const areRequiredFieldsFilled = () => {
    const { contactDetails, cv, skills, links, locations, coverLetter, workExperience } = currentData;
    return (
      contactDetails.name &&
      contactDetails.email &&
      contactDetails.phone &&
      contactDetails.city &&
      cv &&
      skills.length > 0 &&
      links.length > 0 &&
      locations.length > 0 &&
      coverLetter &&
      workExperience
    );
  };

  const handleSave = () => {
    if (!areRequiredFieldsFilled()) {
      alert('יש למלא את כל השדות החובה');
      return;
    }

    // השוואת אובייקטים בעזרת lodash
    if (isEqual(initialData, currentData)) {
      alert('לא היו שינויים');
    } else {
      alert('הנתונים נשמרו בהצלחה');
      setInitialData(currentData); // עדכון הנתונים הראשוניים לאחר השמירה
      navigate('/home'); // נניח שזה הנתיב של דף הבית
    }
  };

  return (
    <Container maxWidth="md" sx={{ marginTop: 4, textAlign: 'right' }}>
      
      <Box sx={{ borderRadius: 1, p: 2, mb: 2 }}>
        <ContactDetails
          data={currentData.contactDetails}
          setData={(data) => setCurrentData({ ...currentData, contactDetails: data })}
        />
      </Box>
      <Box sx={{ borderRadius: 1, p: 2, mb: 2 }}>
        <CV
          data={currentData.cv}
          setData={(data) => setCurrentData({ ...currentData, cv: data })}
        />
      </Box>
      <Box sx={{ borderRadius: 1, p: 2, mb: 2 }}>
        <Skills
          data={currentData.skills}
          setData={(data) => setCurrentData({ ...currentData, skills: data })}
        />
      </Box>
      <Box sx={{ borderRadius: 1, p: 2, mb: 2 }}>
        <Links
          data={currentData.links}
          setData={(data) => setCurrentData({ ...currentData, links: data })}
        />
      </Box>
      <Box sx={{ borderRadius: 1, p: 2, mb: 2 }}>
        <Educatuin
          data={currentData.links}
          setData={(data) => setCurrentData({ ...currentData, links: data })}
        />
      </Box>
      <Box sx={{ borderRadius: 1, p: 2, mb: 2 }}>
        <Locations
          data={currentData.locations}
          setData={(data) => setCurrentData({ ...currentData, locations: data })}
        />
      </Box>
      <Box sx={{ borderRadius: 1, p: 2, mb: 2 }}>
        <WorkExperience
          data={currentData.workExperience}
          setData={(data) => setCurrentData({ ...currentData, workExperience: data })}
        />
      </Box>
      <Box sx={{ borderRadius: 1, p: 2, mb: 2 }}>
        <CoverLetter
          data={currentData.coverLetter}
          setData={(data) => setCurrentData({ ...currentData, coverLetter: data })}
        />
      </Box>
      <Button 
        variant="contained" 
        color="primary" 
        onClick={handleSave}
        sx={{ marginBottom: 4, marginTop: 2, width: '100%' }} // רוחב 100%
      >
        שמור
      </Button>
    </Container>
  );
};

export default Candidate;
