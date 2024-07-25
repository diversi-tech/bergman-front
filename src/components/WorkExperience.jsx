import React from 'react';
import { Container, Select, MenuItem, Typography, Box, Paper, FormControl, InputLabel, Button } from '@mui/material';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const WorkExperience = ({ data, setData }) => {
  const validationSchema = Yup.object({
    experience: Yup.number()
      .required('שדה חובה')
      .min(1, 'שנות ניסיון מינימליות הן 1')
      .max(10, 'שנות ניסיון מקסימליות הן 10'),
  });

  const formik = useFormik({
    initialValues: {
      experience: data,
    },
    validationSchema,
    onSubmit: (values) => {
      setData(values.experience);
    },
  });

  return (
    <Container maxWidth="sm">
      <Paper elevation={1} sx={{ padding: 2, marginTop: 2, width: '100%' }}>
        <Box display="flex" alignItems="center">
          <Box marginRight={1}>
            <WorkOutlineIcon sx={{ color: '#0033A0' }} /> {/* צבע כחול */}
          </Box>
          <Typography variant="h6">ניסיון תעסוקתי</Typography>
        </Box>
        <Typography variant="body1" sx={{ marginTop: 2, marginBottom: 1 }}>
          כמה שנות ניסיון תעסוקתי יש לך? <span style={{ color: 'red' }}>*</span>
        </Typography>
        <form onSubmit={formik.handleSubmit}>
          <FormControl variant="outlined" margin="normal" sx={{ width: '150px' }}> {/* רוחב מותאם */}
            <InputLabel id="experience-label">שנות ניסיון</InputLabel>
            <Select
              labelId="experience-label"
              id="experience-select"
              name="experience"
              value={formik.values.experience}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              label="שנות ניסיון"
              error={formik.touched.experience && Boolean(formik.errors.experience)}
              required
            >
              {[...Array(10).keys()].map((value) => (
                <MenuItem key={value + 1} value={value + 1}>
                  {value + 1}
                </MenuItem>
              ))}
            </Select>
            {formik.touched.experience && formik.errors.experience && (
              <Typography color="error">{formik.errors.experience}</Typography>
            )}
          </FormControl>
          
        </form>
      </Paper>
    </Container>
  );
};

export default WorkExperience;
