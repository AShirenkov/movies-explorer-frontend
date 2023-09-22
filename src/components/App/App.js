import { useState, useEffect, useLayoutEffect } from 'react';

import { Route, Routes } from 'react-router-dom';
import { baseUrl } from '../../utils/constants';

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
import moviesApi from '../../utils/MoviesApi';
import savedMoviesApi from '../../utils/SavedMoviesApi';
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

  const [movies, setMovies] = useState([]);
  const [savedMovies, setSavedMovies] = useState({});

  const [width, setWidth] = useState(window.innerWidth);

  const [isDownload, setIsDownload] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    checkToken();
    // eslint-disable-next-line
  }, []);

  // useEffect(() => {
  //   if (isLoggedIn) {
  //   moviesApi
  //     .getMovies()
  //     .then(movies => {
  //       console.log(movies);
  //       setMovies(movies);
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     });

  //   // eslint-disable-next-line
  // }, []);

  useEffect(() => {
    setIsDownload(true);
    moviesApi
      .getMovies()

      .then(moviesList => {
        setMovies(slimMovies(moviesList));
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => setIsDownload(false));
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      setIsDownload(true);
      Promise.all([authApi.getMyUser(), savedMoviesApi.getMovies()])
        .then(([userInfo, savedMovies]) => {
          setCurrentUser(userInfo);
          setSavedMovies(savedMovies);
        })
        .catch(err => {
          console.log(err);
        })
        .finally(() => setIsDownload(false));
    }
  }, [isLoggedIn]);

  useLayoutEffect(() => {
    function updateSize() {
      setTimeout(function () {
        setWidth(window.innerWidth);

        setIsBurger(window.innerWidth > 900 ? false : true);
      }, 1000);
    }
    updateSize();

    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  // useEffect(() => {
  //   setCurrentUser({ name: 'Виталий', email: 'pochta@yandex.ru' });
  //   setLoggedIn(true);
  // }, []);

  function slimMovies(movies) {
    return movies.map(movie => ({
      country: movie.country,
      director: movie.director,
      duration: movie.duration,
      year: movie.year,
      description: movie.description,
      image: `${baseUrl}${movie.image.url}`,
      trailerLink: movie.trailerLink,
      thumbnail: `${baseUrl}${movie.image.formats.thumbnail.url}`,
      movieId: movie.id,

      nameRU: movie.nameRU,
      nameEN: movie.nameEN
    }));
  }

  function addItemSavedMovies(newMovie) {
    const updatedData = [...savedMovies, newMovie];
    updatedData.sort((a, b) => a.movieId - b.movieId);
    setSavedMovies(updatedData);
  }
  function removeItemSavedMovies(removeMovie) {
    const updatedData = savedMovies.filter(item => item.movieId !== removeMovie.movieId);

    setSavedMovies(updatedData);
  }
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
        console.log('eурра');
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
        console.log('хмм');
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
                isDownload={isDownload}
                setIsDownload={setIsDownload}
                movies={movies}
                savedMovies={savedMovies}
                addItemSavedMovies={addItemSavedMovies}
                removeItemSavedMovies={removeItemSavedMovies}
                isBurger={isBurger}
                onBurgerClick={handlePopupOpen}
                width={width}
              />
            }
          />
          <Route
            path='/saved-movies'
            element={
              <ProtectedRoute
                element={SavedMovies}
                isLoggedIn={isLoggedIn}
                isDownload={isDownload}
                setIsDownload={setIsDownload}
                movies={movies}
                savedMovies={savedMovies}
                addItemSavedMovies={addItemSavedMovies}
                removeItemSavedMovies={removeItemSavedMovies}
                isBurger={isBurger}
                onBurgerClick={handlePopupOpen}
                width={width}
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
