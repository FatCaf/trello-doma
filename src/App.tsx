import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useEffect } from 'react';
import Board from './pages/Board';
import Home from './pages/Home';
import Navbar from './components/Navbar';

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
        <Route path="/board/:boardId" element={<Board />} />
        <Route path="/" element={<Home />} index />
      </Routes>
    </Router>
  );
}
