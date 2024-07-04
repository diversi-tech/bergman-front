import React from 'react';
import './App.css';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { RouterLink } from './components/routerLink';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <header><Image /></header>
        <RouterLink></RouterLink>
      </div>
    </Provider>
  );
}

const pic = require('./images/logo small.jpg');

function Image() {
  return (
    <div>
      <img src={pic} alt="תיאור תמונה" className='image' />
    </div>
  );
}

export default App;
