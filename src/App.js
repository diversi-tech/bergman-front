
import './App.css';
import './bootstrap.min.css'
import HomePage from './components/newHomePage.jsx';


import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NewHomePage from './components/newHomePage';
import ProfilePage from './components/profile';
import RegisterPage from './components/register';
import LoginPage from './components/login';
import UploadCVPage from './components/upload_cv.jsx';


const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<NewHomePage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/upload-cv" element={<UploadCVPage />} />
    </Routes>
  </Router>
);

export default App;
