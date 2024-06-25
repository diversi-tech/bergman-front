import './App.css';
import EnhancedTable, { EnhancedTableToolbar, Filter } from './components/filtering';
import {EnhancedTableHead} from './components/filtering'
import DataTable from './components/filtering'
// import './bootstrap.min.css'
// import './bootstrap.min.js'
function App() {
  return (
    <div className="App">
      <header><Image /></header>
      <Filter />
      <DataTable/>
      {/* <EnhancedTableHead/>
      <EnhancedTableToolbar/> */}
      {/* <EnhancedTable/> */}
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
