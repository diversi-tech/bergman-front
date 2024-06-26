import React from 'react';
import './App.css';
import { RouterLink } from './components/RouterLink';

function App() {
  return (
    <div className="App">
      <RouterLink></RouterLink>
      <header><Image /></header>
    </div>

  );
}


const תמונה = require('./images/logo small.jpg');

function Image() {
  return (
    <div>
      <img src={תמונה} alt="תיאור תמונה" className='image' />
    </div>
  );
}

export default App;
