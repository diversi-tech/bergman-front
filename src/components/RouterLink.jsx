import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Nav } from './Nav';
import Filter from './Filtering';
import { Home } from './Home';
import { Manager } from './Manager';
import { Secretary } from './Secretary';
import { Editing_filters } from './Editing_filters';
import { History } from './History';
import { Profile } from './profile';
import { Workers_management } from './Workers_management';



export const RouterLink = () => {
    return (
        <BrowserRouter>
            <Nav></Nav>
            <Routes>
                <Route path="/Filter" element={<Filter></Filter>}></Route>
                <Route path="/Home" element={<Home></Home>}></Route>
                <Route path="/Manager" element={<Manager></Manager>}></Route>
                <Route path="/Secretary" element={<Secretary></Secretary>}></Route>
                <Route path="/Editing_filters" element={<Editing_filters></Editing_filters>}></Route>
                <Route path="/Workers_management" element={<Workers_management></Workers_management>}></Route>
                <Route path="/History" element={<History></History>}></Route>
                <Route path="/Profile" element={<Profile></Profile>}></Route>

            </Routes>
        </BrowserRouter>
    );
}
