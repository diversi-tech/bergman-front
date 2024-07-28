import React, { useState } from 'react';
import { Box, Typography, Chip, TextField, Autocomplete, FormControl, Paper } from '@mui/material';
import BuildIcon from '@mui/icons-material/Build'; // אייקון לבחירה

const categorizedSkills = {
  'שפות תכנות': ['JavaScript', 'Java', 'Python', 'C', 'C#', 'C++', 'Ruby', 'Swift', 'Kotlin', 'Go', 'Rust', 'HTML', 'CSS'],
  'טכנולוגיות': ['React', 'Angular', 'Vue', 'Node.js', 'Django', 'Flask', 'Spring', 'Hibernate', 'Kubernetes', 'Docker', 'AWS', 'Azure', 'GCP', 'Git', 'MySQL', 'PostgreSQL', 'MongoDB', 'SQL', 'NoSQL', 'Blockchain', 'AI', 'Machine Learning', 'Data Science', 'Big Data', 'Cybersecurity', 'DevOps', 'Networking', 'System Administration', 'Mobile Development', 'iOS Development', 'Android Development', 'Cloud Computing', 'IoT', 'AR/VR', 'Game Development', 'UI/UX Design'],
  'כללי': ['Project Management', 'Agile', 'Scrum', 'Software Testing', 'QA', 'Business Analysis', 'E-commerce', 'SEO', 'Digital Marketing', 'Product Management', 'Tech Support', 'Help Desk', 'CRM', 'ERP', 'ITIL', 'COBIT', 'Lean IT', 'Six Sigma', 'IT Governance', 'IT Strategy', 'Visual Studio', 'Eclipse', 'IntelliJ IDEA', 'NetBeans', 'Xcode'],
  'שפות מדוברות': ['אנגלית', 'עברית', 'ספרדית', 'צרפתית', 'גרמנית', 'סינית', 'יפנית', 'קוריאנית', 'איטלקית', 'רוסית', 'פורטוגזית', 'ערבית', 'הינדי', 'בנגלית', 'פונג׳אבית', 'ג׳אוונזית', 'ויאטנמית', 'טלוגו', 'מרטהי', 'טמילית', 'אורדו', 'טורקית', 'פרסית', 'פולנית', 'הולנדית', 'יוונית', 'צ׳כית', 'הונגרית', 'שוודית', 'פינית', 'נורווגית', 'דנית', 'רומנית', 'תאית', 'מלזית', 'אינדונזית', 'סוואהילית', 'זולו', 'אמהרית', 'יורובה']
};

const allSkills = [
  'JavaScript', 'Java', 'Python', 'C', 'C#', 'C++', 'Ruby', 'Swift', 'Kotlin', 'Go', 'Rust', 'HTML', 'CSS', 'React', 'Angular', 'Vue', 'Node.js',
  'Django', 'Flask', 'Spring', 'Hibernate', 'Kubernetes', 'Docker', 'AWS', 'Azure', 'GCP', 'Git', 'MySQL', 'PostgreSQL', 'MongoDB', 'SQL',
  'NoSQL', 'Blockchain', 'AI', 'Machine Learning', 'Data Science', 'Big Data', 'Cybersecurity', 'DevOps', 'Networking', 'System Administration',
  'Mobile Development', 'iOS Development', 'Android Development', 'Cloud Computing', 'IoT', 'AR/VR', 'Game Development', 'UI/UX Design',
  'Project Management', 'Agile', 'Scrum', 'Software Testing', 'QA', 'Business Analysis', 'E-commerce', 'SEO', 'Digital Marketing',
  'Product Management', 'Tech Support', 'Help Desk', 'CRM', 'ERP', 'ITIL', 'COBIT', 'Lean IT', 'Six Sigma', 'IT Governance', 'IT Strategy',
  'Visual Studio', 'Eclipse', 'IntelliJ IDEA', 'NetBeans', 'Xcode',
  'אנגלית', 'עברית', 'ספרדית', 'צרפתית', 'גרמנית', 'סינית', 'יפנית',
  'קוריאנית', 'איטלקית', 'רוסית', 'פורטוגזית', 'ערבית', 'הינדי', 'בנגלית',
  'פונג׳אבית', 'ג׳אוונזית', 'ויאטנמית', 'טלוגו', 'מרטהי', 'טמילית',
  'אורדו', 'טורקית', 'פרסית', 'פולנית', 'הולנדית', 'יוונית', 'צ׳כית',
  'הונגרית', 'שוודית', 'פינית', 'נורווגית', 'דנית', 'רומנית',
  'תאית', 'מלזית', 'אינדונזית', 'סוואהילית', 'זולו', 'אמהרית', 'יורובה'
];

const Skills = () => {
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [skillsInputValue, setSkillsInputValue] = useState('');
  const [skillsOpen, setSkillsOpen] = useState(false);

  const handleSkillsChange = (event, newValue, reason) => {
    if ((reason === 'selectOption' || reason === 'blur') && newValue && newValue !== 'אין תוצאות' && !selectedSkills.includes(newValue)) {
      setSelectedSkills([...selectedSkills, newValue]);
      setSkillsInputValue('');
      setSkillsOpen(false);
    }
  };

  const handleInputClick = () => {
    setSkillsOpen(true);
  };

  const filterOptions = (options, { inputValue }) => {
    if (inputValue === '') return options;
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

  return (
    <Box sx={{  padding: 2, textAlign: 'left', direction: 'rtl', marginTop: 4 }}>
      <Paper elevation={3} sx={{ padding: 2, marginBottom: 2 }}>
        <Box display="flex" alignItems="center" mb={2}>
          <BuildIcon sx={{ marginRight: 1 }} />
          <Typography variant="h7" gutterBottom>אילו מיומניות תרצה להוסיף לפרופיל שלך?</Typography>
        </Box>
       
      
      <FormControl fullWidth variant="outlined" focused={skillsOpen}>
        <Autocomplete
          id="skills"
          value={null}
          options={allSkills.filter(skill => !selectedSkills.includes(skill)).sort()}
          onChange={handleSkillsChange}
          filterOptions={filterOptions}
          inputValue={skillsInputValue}
          onInputChange={(event, newInputValue) => {
            setSkillsInputValue(newInputValue);
          }}
          open={skillsOpen}
          onOpen={() => setSkillsOpen(true)} // Open when clicking on the input
          onClose={() => setSkillsOpen(false)} // Close when losing focus
          onClick={handleInputClick} // Open when clicking
          renderInput={(params) => (
            <TextField
              {...params}
              label="אילו כישורים יש לך?"
              variant="outlined"
              sx={{ marginTop: 2 }}
            />
          )}
        />
        {Object.keys(categorizedSelectedSkills).map((category) => (
        <Box key={category} sx={{ marginTop: 2 }}>
          <Typography variant="subtitle1" gutterBottom>
            {category}
          </Typography>
          {categorizedSelectedSkills[category].length > 0 ? (
            categorizedSelectedSkills[category].map((skill) => (
              <Chip
                key={skill}
                label={skill}
                onDelete={() => setSelectedSkills(selectedSkills.filter(item => item !== skill))}
                sx={{ margin: 0.5 }}
              />
            ))
          ) : (
            <Typography variant="body2" sx={{ marginTop: 1 }}>
              אין כישורים נבחרים בקטגוריה זו
            </Typography>
          )}
        </Box>
         ))}
      </FormControl>
      </Paper>
      
    </Box>
  );
};

export default Skills;
