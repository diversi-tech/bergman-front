import React, { useState } from 'react';
import { Container, TextField, Typography, Paper, Box, Autocomplete, Alert } from '@mui/material';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const cities = [
  'תל אביב', 'ירושלים', 'חיפה', 'באר שבע', 'נתניה', 'אשדוד', 'פתח תקווה', 'ראשון לציון',
  'הרצליה', 'רעננה', 'כפר סבא', 'בת ים', 'חולון', 'רמת גן', 'גבעתיים', 'נהריה', 'עפולה', 'עכו',
  'צפת', 'טבריה', 'מודיעין', 'אילת', 'אור יהודה', 'כפר יונה', 'מגדל העמק', 'מעלה אדומים', 'נשר',
  'עכו', 'רמלה', 'רחובות', 'תל אביב יפו', 'נתניה', 'שדרות', 'קרית שמונה', 'חדרה', 'קרית ביאליק',
  'קרית אתא', 'קרית מוצקין', 'כפר סבא', 'כפר יונה', 'נמל תעופה בן-גוריון', 'אשקלון', 'רמת השרון',
  'הרצליה', 'חולון', 'בת ים', 'רמת גן', 'גבעתיים'
];

const ContactDetails = ({ data, setData }) => {
  const [errorMessage, setErrorMessage] = useState('');

  const validationSchema = Yup.object({
    name: Yup.string()
      .matches(/^[א-ת]+\s+[א-ת]+$/, 'יש למלא שם פרטי ושם משפחה בעברית')
      .required('שדה חובה'),
    email: Yup.string().email('כתובת מייל לא תקינה').required('שדה חובה'),
    phone: Yup.string()
      .matches(/^[0-9]+$/, 'מספר לא תקין')
      .required('שדה חובה'),
    city: Yup.string().required('שדה חובה'),
  });

  const formik = useFormik({
    initialValues: data,
    validationSchema,
    onSubmit: (values) => {
      // נקה הודעות שגיאה קודמות
      formik.setErrors({});
      setErrorMessage('');

      // בדוק אם יש שדות חובה חסרים
      const firstInvalidField = Object.keys(formik.errors)[0];
      if (firstInvalidField) {
        setErrorMessage('חסר מידע באחד משדות החובה');
      } else {
        setData(values); // עדכן את הנתונים במצב ההורה אם כל השדות מלאים
      }
    },
  });

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ padding: 4, marginTop: 4 }}>
        <Box display="flex" alignItems="center" mb={2}>
          <ContactMailIcon sx={{ marginRight: 2, color: 'black' }} />
          <Typography variant="h5" gutterBottom sx={{ color: 'black' }}>פרטי קשר</Typography>
        </Box>
        {errorMessage && (
          <Alert severity="error" sx={{ marginBottom: 2 }}>
            {errorMessage}
          </Alert>
        )}
        <form onSubmit={formik.handleSubmit}>
          <TextField
            fullWidth
            label="שם פרטי ומשפחה"
            variant="outlined"
            margin="normal"
            id="name"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
          />

          <Autocomplete
            fullWidth
            id="city"
            options={cities}
            value={formik.values.city}
            onChange={(event, newValue) => formik.setFieldValue('city', newValue)}
            renderInput={(params) => (
              <TextField
                {...params}
                label="עיר"
                variant="outlined"
                margin="normal"
                onBlur={formik.handleBlur}
                error={formik.touched.city && Boolean(formik.errors.city)}
                helperText={formik.touched.city && formik.errors.city}
                sx={{ backgroundColor: 'white' }} // צבע רקע לבן
              />
            )}
          />
          <TextField
            fullWidth
            label="אימייל"
            variant="outlined"
            margin="normal"
            id="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
            sx={{ backgroundColor: 'white' }} // צבע רקע לבן
          />
          <TextField
            fullWidth
            label="טלפון"
            variant="outlined"
            margin="normal"
            id="phone"
            name="phone"
            value={formik.values.phone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.phone && Boolean(formik.errors.phone)}
            helperText={formik.touched.phone && formik.errors.phone}
            sx={{ backgroundColor: 'white' }} // צבע רקע לבן
          />
        </form>
      </Paper>
    </Container>
  );
};

export default ContactDetails;
