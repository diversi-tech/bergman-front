// import React from 'react';
// import { BrowserRouter, Route, Routes } from 'react-router-dom';
// import { Nav } from './Nav';
// import Filter from './filtering';
// import { Home } from './Home';
// import { Manager } from './Manager';
// import { Secretary } from './Secretary';
// import { Editing_filters } from './Editing_filters';
// import { History } from './History';
// import { Workers_management } from './Workers_management';
// import { Login } from './login';
// import { Sign_up } from './sign_up';
// import Profile from './profile';
// import { Register } from './register';


// export const RouterLink = () => {
//     return (
//         <BrowserRouter>
//             <Home></Home>
//             <Routes>
//                 <Route path="/Filter" element={<Filter></Filter>}></Route>
//                 <Route path="/" element={<Home></Home>}></Route>
//                 <Route path="/Manager" element={<Manager></Manager>}></Route>
//                 <Route path="/Secretary" element={<Secretary></Secretary>}></Route>
//                 <Route path="/Editing_filters" element={<Editing_filters></Editing_filters>}></Route>
//                 <Route path="/Workers_management" element={<Workers_management></Workers_management>}></Route>
//                 <Route path="/History" element={<History></History>}></Route>
//                 <Route path="/Profile" element={<Profile></Profile>}></Route>
//                 <Route path="/Login" element={<Login></Login>}></Route>
//                 <Route path="/Sign_up" element={<Sign_up></Sign_up>}></Route>
//                 <Route path="/register" element={<Register></Register>} ></Route>
//             </Routes>
//         </BrowserRouter>
//     );
// }


import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Nav } from './Nav';
import Filter from './filtering';
import { Home } from './Home';
import { Manager } from './Manager';
import { Secretary } from './Secretary';
import { Editing_filters } from './Editing_filters';
import { History } from './History';
import { Workers_management } from './Workers_management';
import { Login } from './login';
import { Sign_up } from './sign_up';
import Profile from './profile';
import { Register } from './register';

export const RouterLink = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
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
        </BrowserRouter>
    );
};
