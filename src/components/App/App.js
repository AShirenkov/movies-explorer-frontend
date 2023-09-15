import { useState, useEffect, useLayoutEffect } from 'react';

import { Route, Routes } from 'react-router-dom';

// import { useNavigate, Navigate } from 'react-router-dom';

// import { useWindowSize } from 'react-hooks';

//import logo from './logo.svg';
//import './App.css';

// import Header from '../Header/Header';
import Main from '../Main/Main';
// import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import Login from '../Login/Login';
import Register from '../Register/Register';
import Profile from '../Profile/Profile';
import NotFoundPage from '../NotFoundPage/NotFoundPage';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';

import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import PopupNavi from '../PopupNavi/PopupNavi';

function App() {
  const [isLoggedIn, setLoggedIn] = useState(true);
  const [currentUser, setCurrentUser] = useState({});
  const [isBurger, setIsBurger] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [countCard, setCountCard] = useState(16);

  const [width, setWidth] = useState(window.innerWidth);

  // const navigate = useNavigate();

  useLayoutEffect(() => {
    function updateSize() {
      setWidth(window.innerWidth);
      setCountCard(width > 900 ? 16 : width > 450 ? 8 : 5);
      setIsBurger(width > 900 ? false : true);
    }
    updateSize();

    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, [width]);

  useEffect(() => {
    setCurrentUser({ name: 'Виталий', email: 'pochta@yandex.ru' });
    setLoggedIn(true);
  }, []);

  function handlePopupOpen() {
    setIsPopupOpen(true);
  }
  function handlePopupClose() {
    setIsPopupOpen(false);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className='page'>
        <Routes>
          {/* <Route
            path='/'
            element={
              <ProtectedRoute
                element={Main}
                isLoggedIn={isLoggedIn}
               
              />
            }
          /> */}
          <Route
            path='/'
            element={
              <Main isLoggedIn={isLoggedIn} isBurger={isBurger} onBurgerClick={handlePopupOpen} />
            }
          />
          {/* <Route path='/sign-up' element={<Register onRegister={handleRegister} />} />
          <Route path='/sign-in' element={<Login onLogin={handleLogin} />} /> */}

          <Route path='/signup' element={<Register />} />
          <Route path='/signin' element={<Login />} />
          <Route
            path='/profile'
            element={
              <Profile
                isLoggedIn={isLoggedIn}
                isBurger={isBurger}
                onBurgerClick={handlePopupOpen}
              />
            }
          />
          <Route
            path='/movies'
            element={
              <Movies
                isLoggedIn={isLoggedIn}
                isBurger={isBurger}
                countCard={countCard}
                onBurgerClick={handlePopupOpen}
              />
            }
          />
          <Route
            path='/saved-movies'
            element={
              <SavedMovies
                isLoggedIn={isLoggedIn}
                isBurger={isBurger}
                countCard={countCard}
                onBurgerClick={handlePopupOpen}
              />
            }
          />
          <Route path='*' element={<NotFoundPage />} />
        </Routes>
        <PopupNavi onButtonCloseClick={handlePopupClose} isPopupOpen={isPopupOpen} />
        {/* <Header>test</Header> */}
        {/* <Main /> */}
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
