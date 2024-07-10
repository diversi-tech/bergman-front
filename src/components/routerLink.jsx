import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Filter } from './filtering';
import {EditingFilters}  from './editingFilters';
import { History } from './history';
import { Home } from './home';
import LoginModal  from './login';
import SignUpModal from './signUp';
import { Manager } from './manager';
import { Secretary } from './secretary';
import { WorkersManagement } from './workersManagement';
import { Profile } from './profile';
import { Nav } from './nav';
export const RouterLink = () => {
    return (
        <BrowserRouter>
        <Nav></Nav>
            <Routes>
                <Route path="/Filter" element={<Filter></Filter>}></Route>
                <Route path="/Home" element={<Home></Home>}></Route>
                <Route path="/Manager" element={<Manager></Manager>}></Route>
                <Route path="/Secretary" element={<Secretary></Secretary>}></Route>
                <Route path="/EditingFilters" element={<EditingFilters></EditingFilters>}></Route>
                <Route path="/WorkersManagement" element={<WorkersManagement></WorkersManagement>}></Route>
                <Route path="/History" element={<History></History>}></Route>
                <Route path="/Profile" element={<Profile></Profile>}></Route>
                <Route path="/Login" element={<LoginModal></LoginModal>}></Route>
                <Route path="/SignUp" element={<SignUpModal></SignUpModal>}></Route>
                <Route path="/" element={<Home></Home>}></Route>
            </Routes>
        </BrowserRouter>
    );
}