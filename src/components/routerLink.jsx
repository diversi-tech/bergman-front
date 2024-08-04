import React, { useEffect, useState } from 'react';
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
import { HomeCandidate } from './homeCandidate';
import { useSelector } from 'react-redux';
import ChangeProfile from './changeProfile';
import { PasswordReset } from './PasswordReset';


export const RouterLink = () => {

    const userType = useSelector(state => state.userReducer.currentUserType);
  
    return (
        <BrowserRouter>
            {(userType === 1) && (
                <Nav />
            )}
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
                    <Route path='/HomeCandidate' element={<HomeCandidate />} />
                    <Route path='/changeProfile' element={<ChangeProfile/>}/>
                    <Route path="/request-password-reset" element={<PasswordReset></PasswordReset>} />
                    <Route path="/" element={<Home />} />
                </Routes>
            </Box>
        </BrowserRouter>
    );
};


