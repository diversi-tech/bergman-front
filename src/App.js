// import React from 'react';
// import './App.css';
// import { Provider } from 'react-redux';
// import { store } from './redux/store';
// import { RouterLink } from './components/routerLink';

// function App() {
//   return (
//     <Provider store={store}>
//       <div className="App">
//         <RouterLink></RouterLink>
//         <header><Image /></header>
//       </div>
//     </Provider>
//   );
// }

// const pic = require('./images/logo.jpg');

// function Image() {
//   return (
//     <div>
//       <img src={pic} alt="תיאור תמונה" className='image'/>
//     </div>
//   );
// }

// export default App;

import React from 'react';
import './App.css';
import { RouterLink } from './components/routerLink';
import { Provider } from 'react-redux';
import { store } from './redux/store';
// import { Home } from './components/home';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <header><RouterLink></RouterLink>

          <Image /></header>
          {/* <Home></Home> */}
      </div>
    </Provider>
  );
}
const pic = require('./images/logo.jpg');
function Image() {
  return (
    <div>
      <img src={pic} alt="תיאור תמונה" className='image'/>
    </div>
  );
}
export default App;