import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import UserLoginPage from './pages/login';
import GamePage from './pages/game';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Navigate to='/login' />} />
        <Route path='/login' element={<UserLoginPage />} />
        <Route path='/home' element={<GamePage />} />
      </Routes>
    </BrowserRouter>
  );
}
