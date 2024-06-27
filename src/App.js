
import './App.css';
import './bootstrap.min.css'
import HomePage from './components/newHomePage.jsx';


import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NewHomePage from './components/newHomePage';
import ProfilePage from './components/profile';
import RegisterPage from './components/register';
import LoginPage from './components/login';
import ContactPage from './components/contact';
import UploadCVPage from './components/upload_cv.jsx';
import AboutPage from './components/about';

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<NewHomePage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/upload-cv" element={<UploadCVPage />} />
      <Route path="/about" element={<AboutPage />} />
    </Routes>
  </Router>
);

export default App;
