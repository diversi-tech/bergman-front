import React, { useEffect, useState } from 'react';
import { Box, Typography, Chip, TextField, Autocomplete, FormControl, Paper } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn'; // אייקון לבחירה
import OptionsAxios from '../axios/optionsAxios'; // יבוא הפונקציה

const Locations = ({ iconColor = 'black' }) => {
  const [selectedLocations, setSelectedLocations] = useState([]);
  const [locations, setLocations] = useState([]); // סטייט לנתונים מה-API
  const [locationsInputValue, setLocationsInputValue] = useState('');
  const [locationsOpen, setLocationsOpen] = useState(false);

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const response = await OptionsAxios.getAllOptions(5); // שליחה עם enumId = 5
        setLocations(response.data); // עדכון הסטייט עם הנתונים מה-API
      } catch (error) {
        console.error('Error fetching options:', error);
      }
    };

    fetchOptions();
  }, []);

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
    <Box sx={{ padding: 2, textAlign: 'left', direction: 'rtl', marginTop: 4 }}>
      <Paper elevation={3} sx={{ padding: 2, marginBottom: 2, backgroundColor: 'white' }}>
        <Box display="flex" alignItems="center" mb={2}>
          <LocationOnIcon color={iconColor} sx={{ marginRight: 1 }} />
          <Typography variant="h6" gutterBottom>מיקום</Typography>
        </Box>
        <Typography variant="h7" gutterBottom>באיזה אזור תרצה לעבוד?</Typography>
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
        </FormControl>
      </Paper>
    </Box>
  );
};

export default Locations;
