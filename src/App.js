import React from 'react';
import './App.css';
import { RouterLink } from './components/routerLink';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import Footer from './components/footer';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <header><RouterLink></RouterLink></header>
      </div>
      <Footer/>
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