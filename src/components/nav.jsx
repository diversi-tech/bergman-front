// import React from 'react'
// import { AppBar, Button, Toolbar } from "@mui/material";
// import { Link } from "react-router-dom";
// import { useSelector } from 'react-redux';


// export const Nav = () => {
//     const user = useSelector(state => state.currentUser);

//     return (
//         <AppBar position="static">
//             <Toolbar>
//                 <Button color="inherit" component={Link} to="/Home">
//                     עמוד בית
//                 </Button>
//                 {user && user.userType === 1 && (
//                     <>
//                 <Button color="inherit" component={Link} to="/Manager" >
//                         מנהלת
//                 </Button>
//                 <Button color="inherit" component={Link} to="/Filter">
//                     מסננים
//                 </Button>
//                 <Button color="inherit" component={Link} to="/EditingFilters">
//                     עריכת מסננים
//                 </Button>
//                 <Button color="inherit" component={Link} to="/WorkersManagement">
//                     ניהול עובדים
//                 </Button>
//                 <Button color="inherit" component={Link} to="/History">
//                 היסטוריה
//                 </Button>
//                     </>
//                 )}
//             {user && (user.userType === 1 || user.userType === 2) && (
//                 <>
//                 <Button color="inherit" component={Link} to="/Profile">
//                 פרופיל
//                 </Button>
//                 </>
//             )}
//             {user && user.userType === 3 && (
//                 <Button color="inherit" component={Link} to="/Secretary">
//                     מזכירה
//                 </Button>
//             )}

//                 <Button color="inherit" component={Link} to="/Login" >
//                 התחברות
//                 </Button>
//                 <Button color="inherit" component={Link} to="/SignUp">
//                 הרשמה
//                 </Button>
//             </Toolbar>
//         </AppBar>
//     );
// }



// import React, { useEffect, useState } from 'react';
// import { AppBar, Button, Toolbar } from "@mui/material";
// import { Link } from "react-router-dom";
// import { useSelector } from 'react-redux';

// export const Nav = () => {
//     const user = useSelector(state => state.currentUser);
//     const [currentUser, setCurrentUser] = useState(null);

//     useEffect(() => {
//         setCurrentUser(user);
//     }, [user]);

//     return (
//         <AppBar position="static">
//             <Toolbar>
//                 <Button color="inherit" component={Link} to="/Home">
//                     עמוד בית
//                 </Button>
//                 {currentUser && currentUser.userType === 1 && (
//                     <>
//                         <Button color="inherit" component={Link} to="/Manager" >
//                             מנהלת
//                         </Button>
//                         <Button color="inherit" component={Link} to="/Filter">
//                             מסננים
//                         </Button>
//                         <Button color="inherit" component={Link} to="/EditingFilters">
//                             עריכת מסננים
//                         </Button>
//                         <Button color="inherit" component={Link} to="/WorkersManagement">
//                             ניהול עובדים
//                         </Button>
//                         <Button color="inherit" component={Link} to="/History">
//                             היסטוריה
//                         </Button>
//                     </>
//                 )}
//                 {currentUser && (currentUser.userType === 1 || currentUser.userType === 2) && (
//                     <>
//                         <Button color="inherit" component={Link} to="/Profile">
//                             פרופיל
//                         </Button>
//                     </>
//                 )}
//                 {user && user.userType === 3 && (
//                     <Button color="inherit" component={Link} to="/Secretary">
//                         מזכירה
//                     </Button>
//                 )}
//                 {!currentUser && (
//                     <>
//                         <Button color="inherit" component={Link} to="/Login" >
//                             התחברות
//                         </Button>
//                         <Button color="inherit" component={Link} to="/SignUp">
//                             הרשמה
//                         </Button>
//                     </>
//                 )}
//             </Toolbar>
//         </AppBar>
//     );
// };

import React, { useEffect, useState } from 'react';
import { AppBar, Button, Toolbar } from "@mui/material";
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';

export const Nav = () => {
    const user = useSelector(state => state.currentUser1);
    const [currentUser, setCurrentUser] = useState({});

    useEffect(() => {
        if (user && Object.keys(user).length > 0) {
          setCurrentUser(user);
        }
      }, [user]);
    // const [currentUser, setCurrentUser] = useState(null);

    // useEffect(() => {
    //     if (user && Object.keys(user).length > 0) {
    //         setCurrentUser(user);
    //     } else {
    //         setCurrentUser(null);
    //     }
    // }, [user]);

    return (
        <AppBar position="static">
            <Toolbar>
                <Button color="inherit" component={Link} to="/Home">
                    עמוד בית
                </Button>
                {currentUser && currentUser.userType === 1 && 
                ( <>
                        <Button color="inherit" component={Link} to="/Manager" >
                            מנהלת
                        </Button>
                        <Button color="inherit" component={Link} to="/Filter">
                            מסננים
                        </Button>
                        <Button color="inherit" component={Link} to="/EditingFilters">
                            עריכת מסננים
                        </Button>
                        <Button color="inherit" component={Link} to="/WorkersManagement">
                            ניהול עובדים
                        </Button>
                        <Button color="inherit" component={Link} to="/History">
                            היסטוריה
                        </Button>
                    </>
                )}
                {currentUser && ( currentUser.userType === 2) && (
                    <>
                        <Button color="inherit" component={Link} to="/Profile">
                            פרופיל
                        </Button>
                    </>
                )}
                {currentUser && currentUser.userType === 3 && (
                    <Button color="inherit" component={Link} to="/Secretary">
                        מזכירה
                    </Button>
                )}
             {!currentUser || Object.keys(currentUser).length === 0 && (
                    <>
                        <Button color="inherit" component={Link} to="/Login" >
                            התחברות
                        </Button>
                        <Button color="inherit" component={Link} to="/SignUp">
                            הרשמה
                        </Button>
                    </>
                )}
            </Toolbar>
        </AppBar>
    );
};

