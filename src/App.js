import React from 'react';
import './App.css';
import { RouterLink } from './components/routerLink';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import Footer from './components/footer';
import { Box } from '@mui/material';
import background from './images/background4.jpg'; // תוודא שהנתיב נכון
import { AuthProvider } from './components/authContext';

import {Profile} from './components/shoshiProfile';

function App() {
  return (
    <Provider store={store}>
      <AuthProvider>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100vh',
            backgroundImage: `url(${background})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed',
            color: 'white',
            // position:'relative',
            // zIndex: -2
          }}
        >
          <div className="App">
            <RouterLink />
            <Box component="main" sx={{ flex: 1 }}>
              {/* כאן יש להוסיף את התוכן המרכזי של העמוד */}
              {/* <Home/> */}
            </Box>
          </div>
        </Box>
        <div>
          <Profile/>
        </div>
        <Footer />
      </AuthProvider>
    </Provider>
  );
}

export default App;
