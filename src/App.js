import React from 'react';
import './App.css';
import { Filter } from './components/filtering';

function App() {
  return (
    <div className="App">
      <header><Image /></header>
      <Filter></Filter>
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
