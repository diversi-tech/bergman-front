import React from 'react';
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Autocomplete,
  Chip,
} from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';
// import  UserAxios  from '../axios/userAxios'

// רשימה של כתובות אימייל תקינות
const validEmails = [
  't0556777597@gmail.com',
  'user2@gmail.com',
  'user3@gmail.com',
  // הוסף כאן כתובות אימייל נוספות
];

const emailValidationSchema = yup
  .string()
  .matches(
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
    'Enter a valid email address'
  )
  .test('is-valid-email', 'Email is not in the allowed list', (value) =>
    validEmails.includes(value)
  );

const validationSchema = yup.object({
  to: yup
    .array()
    .of(emailValidationSchema)
    .min(1, 'Enter at least one email')
    .required('Email is required'),
  subject: yup.string().required('Subject is required'),
  body: yup.string().required('Body is required'),
});

export const EditingFilters = () => {
    const formik = useFormik({
    initialValues: {
      to: [],
      subject: '',
      body: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
    //     debugger
    //   try {
    //     // const response = await fetch('/api/sendEmail', {
    //     //   method: 'POST',
    //     //   headers: {
    //     //     'Content-Type': 'application/json',
    //     //   },
    //     //   body: JSON.stringify(values),
    //     // });
    //     const response=await UserAxios.getAllUsers()
    //     if (response.ok) {
    //       alert('Email sent successfully!');
    //     } 
    //     else {
    //       alert('Failed to send email');
    //     }
    //   } catch (error) {
    //     console.error('Error sending email:', error);
    //     alert('Failed to send email');
    //   }    
     alert('Failed to send email');
    }
  });

  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Send Email
        </Typography>
        <form onSubmit={formik.handleSubmit}>
          <Autocomplete
            multiple
            options={validEmails}
            value={formik.values.to}
            onChange={(event, newValue) => {
              formik.setFieldValue('to', newValue);
            }}
            renderTags={(value, getTagProps) =>
              value.map((option, index) => (
                <Chip
                  variant="outlined"
                  label={option}
                  {...getTagProps({ index })}
                />
              ))
            }
            renderInput={(params) => (
              <TextField
                {...params}
                variant="outlined"
                label="To"
                placeholder="Add email addresses"
                // required
                error={formik.touched.to && Boolean(formik.errors.to)}
                helperText={formik.touched.to && formik.errors.to && formik.errors.to.length > 0 ? formik.errors.to.join(', ') : ''}
              />
            )}
          />
          <TextField
            fullWidth
            label="Subject"
            type="text"
            id="subject"
            name="subject"
            value={formik.values.subject}
            onChange={formik.handleChange}
            error={formik.touched.subject && Boolean(formik.errors.subject)}
            helperText={formik.touched.subject && formik.errors.subject}
            required
            margin="normal"
          />
          <TextField
            fullWidth
            label="Body"
            type="text"
            id="body"
            name="body"
            value={formik.values.body}
            onChange={formik.handleChange}
            error={formik.touched.body && Boolean(formik.errors.body)}
            helperText={formik.touched.body && formik.errors.body}
            required
            margin="normal"
            multiline
            rows={4}
          />
          <Box sx={{ mt: 2 }}>
            <Button variant="contained" color="primary" type="submit" disabled={formik.values.to.length === 0}>
              Send Email
            </Button>
          </Box>
        </form>
      </Box>
    </Container>
  );
};

