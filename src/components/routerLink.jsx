import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Nav } from './nav.jsx';
import {Filter} from './filtering.jsx';
import { Home } from './home.jsx';
import { Manager } from './manager.jsx';
import { Secretary } from './secretary.jsx';
import { EditingFilters} from './editingFilters.jsx';
import { History } from './history.jsx';
import { Profile } from './profile.jsx';
import { WorkersManagement } from './workersManagement.jsx';
import { Login } from './login.jsx';
import { SignUp } from './signUp.jsx';
import { ChangeProfile } from './changeProfile.jsx';


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
