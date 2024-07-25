import React, { useState } from 'react';
import { Box, Typography, Chip, TextField, Autocomplete, FormControl, Paper } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn'; // אייקון לבחירה

const locations = [
  'צפון', 'דרום', 'מרכז', 'ירושלים והסביבה'
];

const Locations = () => {
  const [selectedLocations, setSelectedLocations] = useState([]);
  const [locationsInputValue, setLocationsInputValue] = useState('');
  const [locationsOpen, setLocationsOpen] = useState(false);

  const handleLocationsChange = (event, newValue, reason) => {
    if ((reason === 'selectOption' || reason === 'blur') && newValue && newValue !== 'אין תוצאות' && !selectedLocations.includes(newValue)) {
      setSelectedLocations([...selectedLocations, newValue]);
      setLocationsInputValue('');
      setLocationsOpen(false);
    }
  };

  const handleInputClick = () => {
    setLocationsOpen(true);
  };

  const filterOptions = (options, { inputValue }) => {
    if (inputValue === '') return options;
    const filtered = options.filter(option =>
      option.toLowerCase().startsWith(inputValue.toLowerCase())
    );
    return filtered.length > 0 ? filtered : ['אין תוצאות'];
  };

  return (
    <Box sx={{ backgroundColor: 'white', border: '1px solid #ddd', borderRadius: 2, padding: 2, textAlign: 'left', direction: 'rtl', marginTop: 4 }}>
      <Paper elevation={3} sx={{ padding: 2, marginBottom: 2 }}>
        <Box display="flex" alignItems="center" mb={2}>
          <LocationOnIcon sx={{ marginRight: 1 }} />
          <Typography variant="h7" gutterBottom>באיזה אזור תרצה לעבוד?</Typography>
        </Box>
        
        <FormControl fullWidth variant="outlined" focused={locationsOpen}>
          <Autocomplete
            id="locations"
            value={null}
            options={locations.filter(location => !selectedLocations.includes(location)).sort()}
            onChange={handleLocationsChange}
            filterOptions={filterOptions}
            inputValue={locationsInputValue}
            onInputChange={(event, newInputValue) => {
              setLocationsInputValue(newInputValue);
            }}
            open={locationsOpen}
            onOpen={() => setLocationsOpen(true)}
            onClose={() => setLocationsOpen(false)}
            onClick={handleInputClick}
            renderInput={(params) => (
              <TextField
                {...params}
                label="באיזה אזור אתה מעדיף לעבוד?"
                variant="outlined"
                sx={{ marginTop: 2 }}
              />
            )}
          />
        </FormControl>
      </Paper>
      <Box mt={2}>
        {selectedLocations.length > 0 ? (
          selectedLocations.map((location, index) => (
            <Chip
              key={index}
              label={location}
              onDelete={() => setSelectedLocations(selectedLocations.filter(item => item !== location))}
              sx={{ margin: 0.5 }}
            />
          ))
        ) : (
          <Typography variant="body2" sx={{ marginTop: 1 }}>
            לא נבחרו מיקומים
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default Locations;
