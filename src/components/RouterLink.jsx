import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Editing_filters } from './Editing_filters';
import Filter from './Filtering';
import { History } from './History';
import { Home } from './Home';
import { Login } from './Login';
import { Manager } from './Manager';
import { Nav } from './Nav';
import { Secretary } from './Secretary';
import { Workers_management } from './Workers_management';
import { Profile } from './profile';
import { Sign_up } from './sign_up';



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
                <Route path="/Login" element={<Login></Login>}></Route>
                <Route path="/Sign_up" element={<Sign_up></Sign_up>}></Route>
            </Routes>
        </BrowserRouter>
    );
}
