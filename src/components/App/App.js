import { useState, useEffect, useLayoutEffect } from 'react';

import { Route, Routes } from 'react-router-dom';

// import { useNavigate, Navigate } from 'react-router-dom';

// import { useWindowSize } from 'react-hooks';

//import logo from './logo.svg';
//import './App.css';

// import Header from '../Header/Header';
import Main from '../Main/Main';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import Login from '../Login/Login';
import Register from '../Register/Register';
import Profile from '../Profile/Profile';
import NotFoundPage from '../NotFoundPage/NotFoundPage';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';

import authApi from '../../utils/AuthApi';
import api from '../../utils/Api';

import PopupInfo from '../PopupInfo/PopupInfo';

import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import PopupNavi from '../PopupNavi/PopupNavi';

import { useNavigate, Navigate } from 'react-router-dom';

function App() {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [isBurger, setIsBurger] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const [isPopupInfoOpen, setIsPopupInfoOpen] = useState(false);
  const [isPopupInfoStatus, setIsPopupInfoStatus] = useState(false);
  const [popupInfoMessage, setPopupInfoMessage] = useState('');

  const [countCard, setCountCard] = useState(16);

  const [width, setWidth] = useState(window.innerWidth);

  const navigate = useNavigate();

  useEffect(() => {
    checkToken();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      Promise.all([authApi.getMyUser()])
        .then(([userInfo, cards]) => {
          setCurrentUser(userInfo);
          // setCards(cards);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }, [isLoggedIn]);

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

  // useEffect(() => {
  //   setCurrentUser({ name: 'Виталий', email: 'pochta@yandex.ru' });
  //   setLoggedIn(true);
  // }, []);

  function handleRegister({ password, email, name }) {
    authApi
      .register(password, email, name)

      .then(values => {
        // setSuccessInfoTooltipStatus(true);
        // setIsInfoTooltipPopupOpen(true);
        handleLogin({ password, email });
        navigate('/movies');
      })
      .catch(err => {
        // setSuccessInfoTooltipStatus(false);
        // setIsInfoTooltipPopupOpen(true);
        setPopupInfoMessage(err.message);
        setIsPopupInfoStatus(true);
        setIsPopupInfoOpen(true);
        console.log(err.message);

        console.log(err);
      });
  }

  function handleLogin({ password, email }) {
    authApi
      .login(password, email)

      .then(values => {
        localStorage.setItem('token', values.token);
        setLoggedIn(true);

        // setCurrentEmail(email);
        navigate('/movies');
      })
      .catch(err => {
        //не было в ТЗ но решил добавить выдачу окошка с ошибкой
        // setSuccessInfoTooltipStatus(false);
        // setIsInfoTooltipPopupOpen(true);

        setIsPopupInfoStatus(true);
        setIsPopupInfoOpen(true);
        setPopupInfoMessage(err.message);

        console.log(err);
      });
  }

  function checkToken() {
    const token = localStorage.getItem('token');
    if (token) {
      authApi
        .checkToken(token)
        .then(values => {
          setCurrentUser({ name: values.name, email: values.email });
          setLoggedIn(true);
          navigate('/movies');
        })
        .catch(err => {
          setLoggedIn(false);
          console.log(err);
        });
    } else {
      navigate('/');
    }
  }

  function handleLogout() {
    localStorage.removeItem('token');
    setLoggedIn(false);
    navigate('/');
  }
  function handleUpdateUser(objUser) {
    authApi
      .setUserInfo(objUser)
      .then(values => {
        setCurrentUser(values);

        //closeAllPopups();
      })
      .catch(err => {
        console.log(err);
      });
  }

  function handlePopupInfoOpen() {
    setIsPopupInfoOpen(true);
  }

  function handlePopupOpen() {
    setIsPopupOpen(true);
  }
  function handlePopupClose() {
    setIsPopupOpen(false);
    setIsPopupInfoOpen(false);
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
                isBurger={isBurger}
                onBurgerClick={handlePopupOpen}
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

          <Route path='/signup' element={<Register onRegister={handleRegister} />} />
          <Route path='/signin' element={<Login onLogin={handleLogin} />} />
          {/* <Route
            path='/profile'
            element={
              <Profile
                isLoggedIn={isLoggedIn}
                isBurger={isBurger}
                onBurgerClick={handlePopupOpen}
              />
            }
          /> */}
          <Route
            path='/profile'
            element={
              <ProtectedRoute
                element={Profile}
                isLoggedIn={isLoggedIn}
                isBurger={isBurger}
                onBurgerClick={handlePopupOpen}
                onLogout={handleLogout}
                onEdit={handleUpdateUser}
              />
            }
          />
          <Route
            path='/movies'
            element={
              <ProtectedRoute
                element={Movies}
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
              <ProtectedRoute
                element={SavedMovies}
                isLoggedIn={isLoggedIn}
                isBurger={isBurger}
                countCard={countCard}
                onBurgerClick={handlePopupOpen}
              />
            }
          />

          {/* <Route
            path='/movies'
            element={
              <Movies
                isLoggedIn={isLoggedIn}
                isBurger={isBurger}
                countCard={countCard}
                onBurgerClick={handlePopupOpen}
              />
            }
          /> */}
          {/* <Route
            path='/saved-movies'
            element={
              <SavedMovies
                isLoggedIn={isLoggedIn}
                isBurger={isBurger}
                countCard={countCard}
                onBurgerClick={handlePopupOpen}
              />
            }
          /> */}
          <Route path='*' element={<NotFoundPage />} />
        </Routes>
        <PopupNavi onButtonCloseClick={handlePopupClose} isPopupOpen={isPopupOpen} />
        <PopupInfo
          onButtonCloseClick={handlePopupClose}
          isOpened={isPopupInfoOpen}
          infoMessage={popupInfoMessage}
        />
        {/* <Header>test</Header> */}
        {/* <Main /> */}
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
