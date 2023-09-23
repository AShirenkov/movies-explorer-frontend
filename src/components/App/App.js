import { useState, useEffect, useLayoutEffect } from 'react';

import { Route, Routes } from 'react-router-dom';
import { baseUrl } from '../../utils/constants';

import MoviesRoute from '../MoviesRoute/MoviesRoute';
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
import mainApi from '../../utils/MainApi.';

import PopupInfo from '../PopupInfo/PopupInfo';

import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import PopupNavi from '../PopupNavi/PopupNavi';

import { useNavigate } from 'react-router-dom';

function App() {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [isBurger, setIsBurger] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const [isPopupInfoOpen, setIsPopupInfoOpen] = useState(false);
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
      Promise.all([authApi.getMyUser(), mainApi.getMovies()])
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
        // navigate('/movies');
      })
      .catch(err => {
        // setSuccessInfoTooltipStatus(false);
        // setIsInfoTooltipPopupOpen(true);
        setPopupInfoMessage(err.message);
        setIsPopupInfoOpen(true);
        console.log(err.message);
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
        setIsPopupInfoOpen(true);
        setPopupInfoMessage(err.message);
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
          // navigate('/movies');
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
    localStorage.removeItem('search');
    setLoggedIn(false);
    navigate('/');
  }
  function handleUpdateUser(objUser) {
    authApi
      .setUserInfo(objUser)
      .then(values => {
        setCurrentUser(values);
        setIsPopupInfoOpen(true);
        setPopupInfoMessage('Пользовательские данные обновлены');
      })
      .catch(err => {
        setIsPopupInfoOpen(true);
        setPopupInfoMessage('Ошибка обновления пользовательских данных');
      });
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
          <Route
            path='/'
            element={
              <Main isLoggedIn={isLoggedIn} isBurger={isBurger} onBurgerClick={handlePopupOpen} />
            }
          />

          <Route
            path='/signup'
            element={
              <MoviesRoute element={Register} isLoggedIn={isLoggedIn} onRegister={handleRegister} />
            }
          />
          <Route
            path='/signin'
            element={<MoviesRoute element={Login} isLoggedIn={isLoggedIn} onLogin={handleLogin} />}
          />

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
                setIsPopupInfoOpen={setIsPopupInfoOpen}
                setPopupInfoMessage={setPopupInfoMessage}
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
                setIsPopupInfoOpen={setIsPopupInfoOpen}
                setPopupInfoMessage={setPopupInfoMessage}
              />
            }
          />

          <Route path='*' element={<NotFoundPage />} />
        </Routes>
        <PopupNavi onButtonCloseClick={handlePopupClose} isPopupOpen={isPopupOpen} />
        <PopupInfo
          onButtonCloseClick={handlePopupClose}
          isOpened={isPopupInfoOpen}
          infoMessage={popupInfoMessage}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
