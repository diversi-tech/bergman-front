import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FillOptionData } from '../redux/action/optionsAction';
import { Autocomplete, Box, Button, Chip, Container, FormControl, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { CV } from './CV';
import OptionsAxios from '../axios/optionsAxios';

export const Profile = () => {
  const dispatch = useDispatch();
  const { skills = [], locations = [] } = useSelector((state) => state.optionsReducer);

  const [selectedSkills, setSelectedSkills] = React.useState([]);
  const [selectedLocations, setSelectedLocations] = React.useState([]);
  const [linkedinUrl, setLinkedinUrl] = React.useState('');
  const [urlError, setUrlError] = React.useState(false);
  const [skillsInputValue, setSkillsInputValue] = React.useState('');
  const [locationsInputValue, setLocationsInputValue] = React.useState('');
  const [skillsOpen, setSkillsOpen] = React.useState(false);
  const [locationsOpen, setLocationsOpen] = React.useState(false);
  const [skillsFocused, setSkillsFocused] = React.useState(false);
  const [locationsFocused, setLocationsFocused] = React.useState(false);
  const [originalSkills, setOriginalSkills] = React.useState([]);
  const [originalLocations, setOriginalLocations] = React.useState([]);
  const [originalLinkedinUrl, setOriginalLinkedinUrl] = React.useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const options = await OptionsAxios.getAllOptions();
        console.log('Options fetched:', options);
        dispatch(FillOptionData(options));
      } catch (error) {
        console.error('Error fetching options:', error);
      }
    };

    fetchOptions();
  }, [dispatch]);

  const handleSkillsChange = (event, newValue, reason) => {
    if ((reason === 'selectOption' || reason === 'blur') && newValue && newValue !== 'אין תוצאות' && !selectedSkills.includes(newValue)) {
      setSelectedSkills([...selectedSkills, newValue]);
      setSkillsInputValue('');
      setSkillsOpen(false);
    }
  };

  const handleLocationsChange = (event, newValue, reason) => {
    if ((reason === 'selectOption' || reason === 'blur') && newValue && newValue !== 'אין תוצאות' && !selectedLocations.includes(newValue)) {
      setSelectedLocations([...selectedLocations, newValue]);
      setLocationsInputValue('');
      setLocationsOpen(false);
    }
  };

  const handleLinkedinChange = (event) => {
    const url = event.target.value;
    setLinkedinUrl(url);
    setUrlError(!(url.startsWith('https://www.linkedin.com/') || url === ''));
  };

  const filterOptions = (options, { inputValue }) => {
    if (inputValue === '') return [];
    const filtered = options.filter(option =>
      option.toLowerCase().startsWith(inputValue.toLowerCase())
    );
    return filtered.length > 0 ? filtered : ['אין תוצאות'];
  };

  const handleSubmit = () => {
    const isUpdated =
      JSON.stringify(selectedSkills) !== JSON.stringify(originalSkills) ||
      JSON.stringify(selectedLocations) !== JSON.stringify(originalLocations) ||
      linkedinUrl !== originalLinkedinUrl;

    if (isUpdated) {
      console.log('Submitted Data:', {
        skills: selectedSkills,
        locations: selectedLocations,
        linkedinUrl: linkedinUrl,
        cv: true,
      });
      alert('העדכונים נשמרו בהצלחה');
      navigate('/home');
    } else {
      alert('לא היו שינויים לשמירה');
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4, textAlign: 'right' }}>
      <Box mt={4} sx={{backgroundColor:'white' , border: '1px solid #e0e0e0', borderRadius: 1, p: 2 }}>
        <Typography variant="h6" color={'black'}>
          העלאת קורות חיים
        </Typography>
        <CV />
      </Box>

      <Box mt={4} sx={{ backgroundColor:'white' ,border: '1px solid #e0e0e0', borderRadius: 1, p: 2 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          כישורים
        </Typography>
        <FormControl fullWidth variant="outlined" focused={skillsFocused}>
          <Autocomplete
            id="skills"
            value={null} 
            options={skills.filter(skill => !selectedSkills.includes(skill)).sort()}
            onChange={handleSkillsChange}
            filterOptions={filterOptions}
            inputValue={skillsInputValue}
            onInputChange={(event, newInputValue) => {
              setSkillsInputValue(newInputValue);
              setSkillsOpen(newInputValue !== '');
            }}
            open={skillsOpen}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="outlined"
                label="איזה כישורים תרצה להוסיף לפרופיל?"
                onFocus={() => setSkillsFocused(true)}
                onBlur={() => setSkillsFocused(false)}
                sx={{ mr: 0 }}
              />
            )}
          />
        </FormControl>
        <Box mt={2}>
          {selectedSkills.map((skill, idx) => (
            <Chip
              key={idx}
              label={skill}
              onDelete={() => setSelectedSkills(selectedSkills.filter(item => item !== skill))}
            />
          ))}
        </Box>
      </Box>

      <Box mt={4} sx={{backgroundColor:'white' ,border: '1px solid #e0e0e0', borderRadius: 1, p: 2 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          מיקומים
        </Typography>
        <FormControl fullWidth variant="outlined">
          <Autocomplete
            id="locations"
            value={null}
            options={locations.filter(location => !selectedLocations.includes(location)).sort()}
            onChange={handleLocationsChange}
            filterOptions={filterOptions}
            inputValue={locationsInputValue}
            onInputChange={(event, newInputValue) => {
              setLocationsInputValue(newInputValue);
              setLocationsOpen(newInputValue !== '');
            }}
            open={locationsOpen}
            renderInput={(params) => (
              <TextField
                {...params}
                label=" באיזה מיקומים אתה מעדיף לעבוד ?"
                variant="outlined"
                onFocus={() => setLocationsFocused(true)}
                onBlur={() => setLocationsFocused(false)}
              />
            )}
          />
        </FormControl>
        <Box mt={2}>
          {selectedLocations.map((location, index) => (
            <Chip
              key={index}
              label={location}
              onDelete={() => setSelectedLocations(selectedLocations.filter(item => item !== location))}
            />
          ))}
        </Box>
      </Box>

      <Box mt={4} sx={{backgroundColor:'white' , border: '1px solid #e0e0e0', borderRadius: 1, p: 2 }}>
        <Typography variant="body1" sx={{ mb: 1 }}>
          קישור לפרופיל LinkedIn:
        </Typography>
        <TextField
          id="linkedin-url"
          label="קישור לפרופיל LinkedIn"
          variant="outlined"
          fullWidth
          value={linkedinUrl}
          onChange={handleLinkedinChange}
          error={urlError}
          helperText={urlError ? "הקישור אינו תקין" : ""}
        />
      </Box>

      <Box mt={4}>
        <Button 
          variant="contained" 
          color="primary" 
          onClick={handleSubmit}
        >
          שמירת עדכונים
        </Button>
      </Box>
    </Container>
  );
};

export default Profile;
