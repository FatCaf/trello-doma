import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useEffect } from 'react';
import Board from './pages/Board';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import CardModal from './components/CardModal';
import AuthPage from './pages/AuthPage';

export default function App(): JSX.Element {
  useEffect(() => {
    const handleBrowserBack = (): void => {
      document.body.style.backgroundColor = '#f1f2f4';
    };

    window.addEventListener('popstate', handleBrowserBack);

    return () => {
      window.removeEventListener('popstate', handleBrowserBack);
    };
  }, []);

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} index />
        <Route path="/board/:boardId/*" element={<Board />}>
          <Route path="card/:cardId/" element={<CardModal />} />
        </Route>
        <Route path="/auth-page" element={<AuthPage />} />
      </Routes>
    </Router>
  );
}
