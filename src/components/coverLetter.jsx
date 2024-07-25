import React from 'react';
import { Container, Box, Typography, TextField } from '@mui/material';
import DescriptionIcon from '@mui/icons-material/Description';

const CoverLetter = ({ data, setData }) => {
  const handleChange = (event) => {
    setData(event.target.value);
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4, textAlign: 'right' }}>
      <Box sx={{ backgroundColor: 'white', border: '1px solid #e0e0e0', borderRadius: 1, p: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <DescriptionIcon color="primary" sx={{ mr: 1 }} />
          <Typography variant="h6">מכתב מקדים (אופציונלי)</Typography>
        </Box>
        <TextField
          id="cover-letter"
          label="מכתב מקדים"
          multiline
          value={null}
          rows={4}
          placeholder="מכתב מקדים"
          variant="outlined"
          fullWidth
          helperText="אופציונלי"
          onChange={handleChange} // עדכון ערך מהקלט
        />
      </Box>
    </Container>
  );
};

export default CoverLetter;
