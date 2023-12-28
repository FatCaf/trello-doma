import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Board from './pages/Board';
import Home from './pages/Home';
import Navbar from './components/Navbar';

export default function App(): JSX.Element {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/board/:boardId" element={<Board />} />
        <Route path="/" element={<Home />} index />
      </Routes>
    </Router>
  );
}
