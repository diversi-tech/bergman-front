import React from 'react';
import './App.css';
import { RouterLink } from './components/routerLink';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import Footer from './components/footer';
import { Box } from '@mui/material';

function App() {
  return (
    <Provider store={store}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
        }}
      >
      <div className="App">
        {/* <header><RouterLink></RouterLink></header> */}
        <RouterLink/>
        <Box component="main" sx={{ flex: 1, mt: '64px' }}>
          {/* כאן יש להוסיף את התוכן המרכזי של העמוד */}
        </Box>
        <Footer/>

      </div>
      </Box>
    </Provider>
  );
}

export default App;

// const pic = require('./images/logo.jpg');

// function Image() {
//   return (
//     <div>
//       <img src={pic} alt="תיאור תמונה" className='image'/>
//     </div>
//   );
// }