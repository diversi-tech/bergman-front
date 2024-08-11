import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import logo from '../images/logo1.png';
const NotFound = () => {
  const navigate = useNavigate();
  const handleGoHome = () => {
    navigate('/'); // מחזיר לדף הבית
  };
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      height: '60vh',
      textAlign: 'center',
       color: 'black'
    }}>
    <img
        src={logo}
        alt="Logo"
        style={{ width: '240px', height: 'auto', marginBottom: '20px' }}
      />
      <h1 style={{ fontSize: '1.2rem', marginBottom: '10px' }}>הדף שחיפשת אינו נימצא - 404</h1>
      <p style={{ fontSize: '0.9rem', marginTop: '0' }}>מצטערים, הדף שאתה מחפש לא נימצא</p>
     <Button variant="contained" color="primary" onClick={handleGoHome}>
        חזרה לעמוד הבית
      </Button>
    </div>
  );
};
export default NotFound;