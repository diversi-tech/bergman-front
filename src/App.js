import './App.css';
<<<<<<< HEAD
import { Filter } from './components/filtering';
=======
import './bootstrap.min.css'
>>>>>>> 3e501b9aace99d3058c7449825928cafbfa30fdc

function App() {
  return (
    <div className="App">
      <header><Image /></header>
      <Filter />
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
