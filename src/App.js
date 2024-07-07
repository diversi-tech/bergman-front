import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Home } from './components/Home';
import Profile from './components/profile';
import { Register } from './components/register';
import { RouterLink } from './components/RouterLink';
import { Nav } from './components/Nav';
import { Sign_up } from './components/sign_up';
import { Login } from './components/login';
import { History } from './components/History';
import { Workers_management } from './components/Workers_management';
import { Editing_filters } from './components/Editing_filters';
import { Secretary } from './components/Secretary';
import Filter from './components/filtering';
import { Manager } from './components/Manager';
import Change_profile from './components/change_profile';

const App = () => (
  <Router>
    <MainRoutes />
  </Router>
);

const MainRoutes = () => {
  const location = useLocation();
  const hideNav = location.pathname === '/';

  return (
    <>
      {!hideNav && <Nav />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/change_profile" element={<Change_profile />} />
        <Route path="/register" element={<Register />} />
        <Route path="/routerlink/*" element={<RouterLink />} /> {/* Updated path */}
        <Route path="/filter" element={<Filter />} />
        <Route path="/manager" element={<Manager />} />
        <Route path="/secretary" element={<Secretary />} />
        <Route path="/editing_filters" element={<Editing_filters />} />
        <Route path="/workers_management" element={<Workers_management />} />
        <Route path="/history" element={<History />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sign_up" element={<Sign_up />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
};

export default App;

