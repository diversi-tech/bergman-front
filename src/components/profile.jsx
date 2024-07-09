import { Autocomplete, Box, Button, Chip, Container, FormControl, TextField, Typography } from '@mui/material';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';
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

const categorizedSkills = {
  'שפות תכנות': ['JavaScript', 'Java', 'Python', 'C', 'C#', 'C++', 'Ruby', 'Swift', 'Kotlin', 'Go', 'Rust', 'HTML', 'CSS'],
  'טכנולוגיות': ['React', 'Angular', 'Vue', 'Node.js', 'Django', 'Flask', 'Spring', 'Hibernate', 'Kubernetes', 'Docker', 'AWS', 'Azure', 'GCP', 'Git', 'MySQL', 'PostgreSQL', 'MongoDB', 'SQL', 'NoSQL', 'Blockchain', 'AI', 'Machine Learning', 'Data Science', 'Big Data', 'Cybersecurity', 'DevOps', 'Networking', 'System Administration', 'Mobile Development', 'iOS Development', 'Android Development', 'Cloud Computing', 'IoT', 'AR/VR', 'Game Development', 'UI/UX Design'],
  'כללי': ['Project Management', 'Agile', 'Scrum', 'Software Testing', 'QA', 'Business Analysis', 'E-commerce', 'SEO', 'Digital Marketing', 'Product Management', 'Tech Support', 'Help Desk', 'CRM', 'ERP', 'ITIL', 'COBIT', 'Lean IT', 'Six Sigma', 'IT Governance', 'IT Strategy', 'Visual Studio', 'Eclipse', 'IntelliJ IDEA', 'NetBeans', 'Xcode'],
  'שפות מדוברות': ['אנגלית', 'עברית', 'ספרדית', 'צרפתית', 'גרמנית', 'סינית', 'יפנית', 'קוריאנית', 'איטלקית', 'רוסית', 'פורטוגזית', 'ערבית', 'הינדי', 'בנגלית', 'פונג׳אבית', 'ג׳אוונזית', 'ויאטנמית', 'טלוגו', 'מרטהי', 'טמילית', 'אורדו', 'טורקית', 'פרסית', 'פולנית', 'הולנדית', 'יוונית', 'צ׳כית', 'הונגרית', 'שוודית', 'פינית', 'נורווגית', 'דנית', 'רומנית', 'תאית', 'מלזית', 'אינדונזית', 'סוואהילית', 'זולו', 'אמהרית', 'יורובה']
};

export const Profile = () => {
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

  const categorizedSelectedSkills = Object.keys(categorizedSkills).reduce((acc, category) => {
    const selected = selectedSkills.filter(skill => categorizedSkills[category].includes(skill));
    if (selected.length > 0) {
      acc[category] = selected;
    }
    return acc;
  }, {});

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
      <Box mt={4} sx={{ border: '1px solid #e0e0e0', borderRadius: 1, p: 2 }}>
        <Typography variant="h6">
          העלאת קורות חיים
        </Typography>
        <CV />
      </Box>

      <Box mt={4} sx={{ border: '1px solid #e0e0e0', borderRadius: 1, p: 2 }}>
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
          {Object.keys(categorizedSelectedSkills).map((category, index) => (
            <Box key={index} mt={2}>
              <Typography variant="subtitle1">{category}</Typography>
              {categorizedSelectedSkills[category].map((skill, idx) => (
                <Chip
                  key={idx}
                  label={skill}
                  onDelete={() => setSelectedSkills(selectedSkills.filter(item => item !== skill))}
                />
              ))}
            </Box>
          ))}
        </Box>
      </Box>

      <Box mt={4} sx={{ border: '1px solid #e0e0e0', borderRadius: 1, p: 2 }}>
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

      <Box mt={4} sx={{ border: '1px solid #e0e0e0', borderRadius: 1, p: 2 }}>
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
