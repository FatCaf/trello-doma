import { Route, Routes } from 'react-router-dom';
import { useEffect } from 'react';
import Board from './pages/Board/Board';
import Home from './pages/Home/Home';
import Navbar from './components/Navbar';
import CardModal from './pages/Board/components/Card/components/CardModal';
import AuthPage from './pages/Auth/AuthPage';

export default function App(): JSX.Element {
  const currentLocation = window.location.href;

  useEffect(() => {
    if (currentLocation.match(/\/\/.*home/)) {
      document.body.style.backgroundColor = '#f1f2f4';
    }
  }, [currentLocation]);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/board/:boardId/*" element={<Board />}>
          <Route path="card/:cardId/" element={<CardModal />} />
        </Route>
        <Route path="/" element={<AuthPage />} index />
      </Routes>
    </>
  );
}
