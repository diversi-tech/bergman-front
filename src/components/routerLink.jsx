import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Filter } from './filtering';
import { EditingFilters } from './editingFilters';
import { History } from './history';
import { Home } from './home';
import LoginModal from './login';
import SignUpModal from './signUp';
import { Manager } from './manager';
import { Secretary } from './secretary';
import { WorkersManagement } from './workersManagement';
import { Profile } from './profile';
import { Nav } from './nav';
import { Box } from '@mui/material';
import { useAuth } from './authContext';

export const RouterLink = () => {
    const { isAuthenticated } = useAuth();

    return (
        <BrowserRouter>
            {isAuthenticated && <Nav />}
            <Box sx={{ pt: '60px' }}>
                <Routes>
                    <Route path="/Filter" element={<Filter />} />
                    <Route path="/Home" element={<Home />} />
                    <Route path="/Manager" element={<Manager />} />
                    <Route path="/Secretary" element={<Secretary />} />
                    <Route path="/EditingFilters" element={<EditingFilters />} />
                    <Route path="/WorkersManagement" element={<WorkersManagement />} />
                    <Route path="/History/:userId" element={<History />} />
                    <Route path="/Profile" element={<Profile />} />
                    <Route path="/Login" element={<LoginModal />} />
                    <Route path="/SignUp" element={<SignUpModal />} />
                    <Route path="/" element={<Home />} />
                </Routes>
            </Box>
        </BrowserRouter>
    );
};


