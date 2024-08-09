// import React, { useEffect, useState } from 'react';
// import { BrowserRouter, Route, Routes } from 'react-router-dom';
// import { Filter } from './filtering';
// import { EditingFilters } from './editingFilters';
// import { History } from './history';
// import { Home } from './home';
// import LoginModal from './login';
// import SignUpModal from './signUp';
// import { Manager } from './manager';
// import { Secretary } from './secretary';
// import { WorkersManagement } from './workersManagement';
// import { Profile } from './profile';
// import { Nav } from './nav';
// import { Box } from '@mui/material';
// import { HomeCandidate } from './homeCandidate';
// import { useSelector } from 'react-redux';
// import ChangeProfile from './changeProfile';
// import PrivateRoute from './PrivateRoute';
// import {PasswordReset} from './PasswordReset'
// import useToken from './useToken';
// import { jwtDecode } from 'jwt-decode';
// import Cookies from "js-cookie";
// import PrivateRouteUser from './PrivateRouteUser';
// import RouteWrapper from './RouteWrapper';
// import CompanyManagement from './CompanyManagement';

// export const RouterLink = () => {

//     const [userType,setUserType] = useState(useToken()?.userTypeId || 0);
//     useEffect(() => {
//         const token = Cookies.get("jwtToken");
//         if(token){
//         try {
//           const decodedToken = jwtDecode(token);
//           // עדכן את hasAccess לפי סוג המשתמש בתוקן
//           setUserType(decodedToken.userTypeId);
//         } catch (error) {
//           console.error("Failed to decode token:", error);
//         }}
//       }, []);
//       if(userType===0){
//         try {
//         const token = Cookies.get("jwtToken");
//         const decodedToken = jwtDecode(token);
//         setUserType(decodedToken.userTypeId);}
//         catch(err){
//             console.error("Failed to decode token:", err);
//         }
//       }
//     return (
//         <BrowserRouter>
//             {(userType === 1) && (
//                 <Nav/>
//             )}
//             <Box sx={{ pt: '60px' }}>
//                 <Routes>
//                     <Route path="/Filter" element={<PrivateRoute element={Filter} />} />
//                     <Route path="/Home" element={<Home />} />
//                     <Route path="/Manager" element={<PrivateRoute element={Manager} />} />
//                     <Route path="/Secretary" element={<PrivateRoute element={Secretary} />} />
//                     <Route path="/EditingFilters" element={<PrivateRoute element={EditingFilters} />} />
//                     <Route path="/WorkersManagement" element={<WorkersManagement />} />
//                     <Route path="/History/:userId" element={<PrivateRoute element={History} />} />
//                     <Route path="/Profile" element={<RouteWrapper element={Profile} usePrivateRoute={userType} />} />
//                     <Route path="/Login" element={<LoginModal />} />
//                     <Route path="/SignUp" element={<SignUpModal />} />
//                     <Route path='/HomeCandidate' element={<HomeCandidate />} />
//                     <Route path='/changeProfile' element={<RouteWrapper element={ChangeProfile} usePrivateRoute={userType} />}/>
//                     <Route path='/request-password-reset' element={<PasswordReset/>}/>
//                     <Route path="/" element={<Home />} />
//                     <Route path='/CompanyManagement' element={<RouteWrapper element={CompanyManagement} usePrivateRoute={userType} />}/>
//                 </Routes>
//             </Box>
//         </BrowserRouter>
//     );
// };

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
import ChangeProfile from './changeProfile';
import PrivateRoute from './PrivateRoute';
import { PasswordReset } from './PasswordReset';
import Cookies from "js-cookie";
import { jwtDecode } from 'jwt-decode';
import PrivateRouteUser from './PrivateRouteUser';
import RouteWrapper from './RouteWrapper';
import CompanyManagement from './CompanyManagement';

export const RouterLink = () => {
  const [userType, setUserType] = useState(0);

  // בדיקה ראשונית בזמן העלאת הקומפוננטה
  useEffect(() => {
    const token = Cookies.get("jwtToken");
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setUserType(decodedToken.userTypeId);
      } catch (error) {
        console.error("Failed to decode token:", error);
      }
    }
  }, []);

  // בדיקה נוספת במידה והקומפוננטה כבר רונדרה והמשתמש לא היה מחובר
  useEffect(() => {
    if (userType === 0) {
      try {
        const token = Cookies.get("jwtToken");
        if (token) {
          const decodedToken = jwtDecode(token);
          setUserType(decodedToken.userTypeId);
        }
      } catch (err) {
        console.error("Failed to decode token:", err);
      }
    }
  }, [userType]);

  return (
    <BrowserRouter>
      {(userType === 1) && (
        <Nav />
      )}
      <Box sx={{ pt: '60px' }}>
        <Routes>
          <Route path="/Filter" element={<PrivateRoute element={Filter} />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/Manager" element={<PrivateRoute element={Manager} />} />
          <Route path="/CompanyManagement" element={<PrivateRoute element={CompanyManagement} />} />
          <Route path="/EditingFilters" element={<PrivateRoute element={EditingFilters} />} />
          <Route path="/WorkersManagement" element={<WorkersManagement />} />
          <Route path="/History/:userId" element={<PrivateRoute element={History} />} />
          <Route path="/Profile" element={<RouteWrapper element={Profile} usePrivateRoute={userType} />} />
          <Route path="/Login" element={<LoginModal />} />
          <Route path="/SignUp" element={<SignUpModal />} />
          <Route path='/HomeCandidate' element={<HomeCandidate />} />
          <Route path='/changeProfile' element={<RouteWrapper element={ChangeProfile} usePrivateRoute={userType} />} />
          <Route path='/request-password-reset' element={<PasswordReset />} />
          <Route path="/" element={<Home />} />
          <Route path='/CompanyManagement' element={<RouteWrapper element={CompanyManagement} usePrivateRoute={userType} />} />
        </Routes>
      </Box>
    </BrowserRouter>
  );
};
