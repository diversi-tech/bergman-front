import React, { useState } from 'react';
import { 
  Typography, 
  FormControl, 
  FormControlLabel, 
  RadioGroup, 
  Radio, 
  Paper,
  Box,
  TextField,
  IconButton,
  Divider
} from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

const Education = () => {
  const [hasHigherEducation, setHasHigherEducation] = useState('no');
  const [educationFields, setEducationFields] = useState(['']);

  const handleEducationChange = (index, event) => {
    const newEducationFields = [...educationFields];
    newEducationFields[index] = event.target.value;
    setEducationFields(newEducationFields);
  };

  const handleAddEducation = () => {
    if (educationFields.every(field => field.trim() !== '')) {
      setEducationFields([...educationFields, '']);
    }
  };

  const handleEducationRadioChange = (event) => {
    setHasHigherEducation(event.target.value);
  };

  const handleDeleteEducation = (index) => {
    if (educationFields.length > 1) {
      const newEducationFields = educationFields.filter((_, i) => i !== index);
      setEducationFields(newEducationFields);
    }
  };

  return (
    <Paper elevation={1} sx={{ p: 3, width: '100%' }}>
      <Box display="flex" alignItems="center" mb={2}>
        <SchoolIcon sx={{ mr: 1, color: 'orange' }} />
        <Typography variant="h6">השכלה גבוהה</Typography>
      </Box>
      <FormControl component="fieldset" sx={{ mb: 2 }}>
        <Typography variant="body1" mb={1}>
          האם למדת בתוכנית תואר אקדמי? *
        </Typography>
        <RadioGroup
          value={hasHigherEducation}
          onChange={handleEducationRadioChange}
        >
          <FormControlLabel value="yes" control={<Radio />} label="כן" />
          <FormControlLabel value="no" control={<Radio />} label="לא" />
        </RadioGroup>
      </FormControl>

      {hasHigherEducation === 'yes' && (
        <>
          {educationFields.map((field, index) => (
            <Box key={index} sx={{ mb: 2, display: 'flex', alignItems: 'center', width: '100%' }}>
              <TextField
                multiline
                minRows={2}
                fullWidth
                label={`השכלה גבוהה ${index + 1}`}
                variant="outlined"
                value={field}
                onChange={(event) => handleEducationChange(index, event)}
                sx={{ mr: 1 }}
              />
              {index > 0 && (
                <IconButton 
                  color="error" 
                  onClick={() => handleDeleteEducation(index)}
                >
                  <DeleteIcon />
                </IconButton>
              )}
            </Box>
          ))}
          <Box display="flex" alignItems="center" width="100%">
            <IconButton color="primary" onClick={handleAddEducation}>
              <AddIcon />
            </IconButton>
            <Typography variant="body2" sx={{ ml: 1 }}>
              הוסף תואר נוסף
            </Typography>
          </Box>
        </>
      )}
    </Paper>
  );
};

export default Education;
