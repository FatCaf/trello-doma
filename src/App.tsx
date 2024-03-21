import { Route, Routes, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Board from './pages/Board/Board';
import Home from './pages/Home/Home';
import Navbar from './components/Navbar';
import CardModal from './pages/Board/components/Card/components/CardModal';
import AuthPage from './pages/Auth/AuthPage';
import Greeting from './components/Greeting';

export default function App(): JSX.Element {
  const currentLocation = window.location.href;
  const isGreetingPlayed: string | null = localStorage.getItem('isGreetingPlayed');
  const [isSignInClicked, setSignInClicked] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    if (currentLocation.match(/\/\/.*home/)) {
      document.body.style.backgroundColor = '#f1f2f4';
    }
  }, [currentLocation]);

  const handleClick = (action: string): void => {
    if (action === 'sign-up') setSignInClicked(true);
    navigate('/');
  };

  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {isGreetingPlayed === 'played' ? (
        <>
          <Navbar />
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/board/:boardId/*" element={<Board />}>
              <Route path="card/:cardId/" element={<CardModal cardId="" />} />
            </Route>
            <Route path="/" element={<AuthPage isSignInClicked={isSignInClicked} />} index />
          </Routes>
        </>
      ) : (
        <Greeting onClick={handleClick} />
      )}
    </>
  );
}
