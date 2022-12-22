import './App.css';
import Demo from './pages/Demo/Demo';
import Report from './pages/Report/Report';
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path='/' element={<Demo />} />
          <Route exact path='/:id' element={<Demo />} />
          <Route exact path='/report' element={<Report />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;