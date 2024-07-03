import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Nav } from './nav';
import {Filter} from './filtering';
import { Home } from './home';
import { Manager } from './manager';
import { Secretary } from './secretary';
import { EditingFilters} from './editingFilters';
import { History } from './history';
import { Profile } from './profile';
import { WorkersManagement } from './workersManagement';
import { Login } from './login';
import { SignUp } from './signUp';
import { ChangeProfile } from './changeProfile';



export const RouterLink = () => {
    return (
        <BrowserRouter>
            <Nav></Nav>
            <Routes>
                <Route path="/Filter" element={<Filter></Filter>}></Route>
                <Route path="/Home" element={<Home></Home>}></Route>
                <Route path="/Manager" element={<Manager></Manager>}></Route>
                <Route path="/Secretary" element={<Secretary></Secretary>}></Route>
                <Route path="/Editing_filters" element={<EditingFilters></EditingFilters>}></Route>
                <Route path="/Workers_management" element={<WorkersManagement></WorkersManagement>}></Route>
                <Route path="/History" element={<History></History>}></Route>
                <Route path="/Profile" element={<Profile></Profile>}></Route>
                <Route path="/Login" element={<Login></Login>}></Route>
                <Route path="/Sign_up" element={<SignUp></SignUp>}></Route>
                <Route path="/ChangeProfile" element={<ChangeProfile></ChangeProfile>}></Route>  
            </Routes>
        </BrowserRouter>
    );
}
