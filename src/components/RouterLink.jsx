import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Nav } from './nav';
import Filter from './filtering';
import { Home } from './home';
import { Manager } from './manager';
import { Secretary } from './secretary';
import { Editing_filters } from './editing_filters';
import { History } from './history';
import { Profile } from './profile';
import { Workers_management } from './workers_management';
import { Login } from './login';
import { Sign_up } from './Sign_up';



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
