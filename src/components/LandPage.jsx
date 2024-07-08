
import { Autocomplete, Box, Button, Chip, Container, Grid, TextField, Typography } from '@mui/material';
import * as React from 'react';
import { CV } from './CV';
import './LandPage.css';

const skills = [
  'JavaScript', 'Java', 'Python', 'C', 'C#', 'C++', 'Ruby', 'Swift', 'Kotlin', 
  'Go', 'Rust', 'HTML', 'CSS', 'React', 'Angular', 'Vue', 'Node.js', 
  'Django', 'Flask', 'Spring', 'Hibernate', 'Kubernetes', 'Docker', 
  'AWS', 'Azure', 'GCP', 'Git', 'MySQL', 'PostgreSQL', 'MongoDB', 'SQL', 
  'NoSQL', 'Blockchain', 'AI', 'Machine Learning', 'Data Science', 'Big Data',
  'Cybersecurity', 'DevOps', 'Networking', 'System Administration', 
  'Mobile Development', 'iOS Development', 'Android Development', 
  'Cloud Computing', 'IoT', 'AR/VR', 'Game Development', 'UI/UX Design', 
  'Project Management', 'Agile', 'Scrum', 'Software Testing', 'QA', 
  'Business Analysis', 'E-commerce', 'SEO', 'Digital Marketing', 
  'Product Management', 'Tech Support', 'Help Desk', 'CRM', 'ERP', 
  'ITIL', 'COBIT', 'Lean IT', 'Six Sigma', 'IT Governance', 'IT Strategy',
  'Visual Studio', 'Eclipse', 'IntelliJ IDEA', 'NetBeans', 'Xcode',

  'אנגלית', 'עברית', 'ספרדית', 'צרפתית', 'גרמנית', 'סינית', 'יפנית', 
  'קוריאנית', 'איטלקית', 'רוסית', 'פורטוגזית', 'ערבית', 'הינדי', 'בנגלית', 
  'פונג׳אבית', 'ג׳אוונזית', 'ויאטנמית', 'טלוגו', 'מרטהי', 'טמילית', 
  'אורדו', 'טורקית', 'פרסית', 'פולנית', 'הולנדית', 'יוונית', 'צ׳כית', 
  'הונגרית', 'שוודית', 'פינית', 'נורווגית', 'דנית', 'רומנית', 
  'תאית', 'מלזית', 'אינדונזית', 'סוואהילית', 'זולו', 'אמהרית', 'יורובה'
];

const locations = [
  'תל אביב', 'ירושלים', 'אשדוד', 'חיפה', 'ראשון לציון', 'פתח תקווה', 
  'נתניה', 'באר שבע', 'חולון', 'רמת גן', 'אשקלון', 'רחובות', 
  'בית שמש', 'הרצליה', 'כפר סבא', 'חדרה', 'מודיעין-מכבים-רעות', 
  'לוד', 'רעננה', 'רמלה', 'נהריה', 'יבנה', 'קריית גת', 'אילת', 
  'קריית ביאליק', 'קריית מוצקין', 'עפולה', 'קריית אונו', 'קריית ים', 
  'קריית אתא', 'צפת', 'טבריה', 'אופקים', 'סחנין', 'שפרעם', 'טייבה', 
  'נצרת', 'באקה אל-גרביה', 'עכו', 'טמרה', 'כפר קאסם', 'דימונה', 'אריאל', 
  'קלנסווה', 'טירת כרמל', 'נשר', 'אור עקיבא', 'מגדל העמק', 'קריית מלאכי', 
  'שדרות', 'קריית שמונה', 'ערד', 'יקנעם עילית', 'כפר יונה', 
  'יהוד-מונוסון', 'ראש העין', 'גבעת שמואל', 'נוף הגליל', 'מעלות-תרשיחא'
];

export const LandPage = () => {
  const [selectedSkills, setSelectedSkills] = React.useState([]);
  const [selectedLocations, setSelectedLocations] = React.useState([]);
  const [linkedinUrl, setLinkedinUrl] = React.useState('');
  const [urlError, setUrlError] = React.useState(false);
  const [skillsInputValue, setSkillsInputValue] = React.useState('');
  const [locationsInputValue, setLocationsInputValue] = React.useState('');
  const [skillsOpen, setSkillsOpen] = React.useState(false);
  const [locationsOpen, setLocationsOpen] = React.useState(false);
  const [showCV, setShowCV] = React.useState(false);
  const [showLinkedin, setShowLinkedin] = React.useState(false);
  const [showSkillsAutocomplete, setShowSkillsAutocomplete] = React.useState(false);
  const [showLocationsAutocomplete, setShowLocationsAutocomplete] = React.useState(false);

  const handleSkillsChange = (event, newValue, reason) => {
    if (reason === 'selectOption') {
      if (newValue && newValue !== 'אין תוצאות') {
        setSelectedSkills([...selectedSkills, newValue]);
        setSkillsInputValue('');
        setSkillsOpen(false);
      }
    }
  };

  const handleLocationsChange = (event, newValue, reason) => {
    if (reason === 'selectOption' || reason === 'blur') {
      if (newValue && newValue !== 'אין תוצאות') {
        setSelectedLocations([...selectedLocations, newValue]);
        setLocationsInputValue('');
        setLocationsOpen(false);
      }
    }
  };

  const handleLinkedinChange = (event) => {
    const url = event.target.value;
    setLinkedinUrl(url);
    if (url.startsWith('https://www.linkedin.com/') || url === '') {
      setUrlError(false);
    } else {
      setUrlError(true);
    }
  };

  const filterOptions = (options, { inputValue }) => {
    if (inputValue === '') return [];
    const filtered = options.filter(option => 
      option.toLowerCase().startsWith(inputValue.toLowerCase())
    );
    return filtered.length > 0 ? filtered : ['אין תוצאות'];
  };

  const handleUploadCVButtonClick = () => {
    setShowCV(!showCV);
  };

  const handleLinkedinButtonClick = () => {
    setShowLinkedin(!showLinkedin);
  };

  const handleSkillsButtonClick = () => {
    setShowSkillsAutocomplete(!showSkillsAutocomplete);
  };

  const handleLocationsButtonClick = () => {
    setShowLocationsAutocomplete(!showLocationsAutocomplete);
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Box mt={2}>
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Button 
                variant="contained" 
                component="label" 
                onClick={handleUploadCVButtonClick}
                >
                העלאת קורות חיים
                </Button>
                {showCV && <CV />}
            </Grid>
          </Grid>
          <br></br>
          <Grid item xs={12}>
            <Button 
              variant="contained" 
              onClick={handleSkillsButtonClick}
            >
              הוסף כישורים
            </Button>
            {showSkillsAutocomplete && (
              <Autocomplete
                id="skills"
                options={skills.sort()}
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
                    placeholder="אילו כישורים יש לך?"
                  />
                )}
              />
            )}
            <Box mt={2}>
              {selectedSkills.map((skill, index) => (
                <Chip
                  key={index}
                  label={skill}
                  onDelete={() => setSelectedSkills(selectedSkills.filter(item => item !== skill))}
                  sx={{ margin: '4px' }}
                />
              ))}
            </Box>
          </Grid>
          <Grid item xs={12}>
          <Button 
            variant="contained" 
            onClick={handleLocationsButtonClick}
            >
            הוסף מיקומים
            </Button>
            {showLocationsAutocomplete && (
            <Autocomplete
                id="locations"
                options={locations.sort()}
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
                    variant="outlined"
                    placeholder="אילו מיקומים רלוונטיים?"
                />
                )}
            />
            )}
            <Box mt={2}>
            {selectedLocations.map((location, index) => (
                <Chip
                key={index}
                label={location}
                onDelete={() => setSelectedLocations(selectedLocations.filter(item => item !== location))}
                sx={{ margin: '4px' }}
                />
            ))}
            </Box>
            <Grid item xs={12}>
            <Button 
                variant="contained" 
                onClick={handleLinkedinButtonClick}
            >
                קישור ל-LinkedIn
            </Button>
            {showLinkedin && (
                <TextField
                id="linkedin-url"
                label="קישור לפרופיל LinkedIn"
                variant="outlined"
                fullWidth
                value={linkedinUrl}
                onChange={handleLinkedinChange}
                error={urlError}
                helperText={urlError ? "הקישור אינו תקין" : ""}
                sx={{ mt: 2 }}
                />
            )}
            </Grid>
          </Grid>
       </Box>
    </Container>
    );
 };
