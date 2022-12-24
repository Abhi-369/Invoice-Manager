import Demo from './pages/Demo/Demo';
import Report from './pages/Report/Report';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login/Login';

function App() {

  const user = JSON.parse(localStorage.getItem('user'))
  // const user = 'abhi'

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={!user ? <Login /> : <Navigate replace to={'/list'} />} />
          <Route path='/' element={!user ? <Navigate replace to={'/login'} /> : <Demo />} />
          <Route path='/list' element={!user ? <Navigate replace to={'/login'} /> : <Report />} />
          <Route path='/:id' element={!user ? <Navigate replace to={'/login'} /> : <Demo />} />
          <Route path='/update' element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;