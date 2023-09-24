import './SearchForm.css';
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useLocation } from 'react-router-dom';
import findLogo from '../../images/find.svg';
import findShortFindOn from '../../images/find-shortOn.svg';
import findShortFindOff from '../../images/find-shortOff.svg';
import { SHORT_MOVIE_DURATION } from '../../utils/constants';

function SearchForm({
  setMoviesAfterFilter,
  movies,
  moviesAfterFilter,

  setIsPopupInfoOpen,
  setPopupInfoMessage,
  isMoviesLoadState,
  setIsMoviesLoadState
}) {
  const {
    register,
    getValues,
    setValue,
    formState: { errors, isValid },
    handleSubmit
  } = useForm({
    mode: 'all'
  });
  const [isShortSwitchOn, setIsShortSwitchOn] = useState(false);
  const [isSearchOn, setIsSearchOn] = useState(false);

  const currentLocation = useLocation();
  const isSavedMovies = currentLocation.pathname === '/saved-movies';

  useEffect(() => {
    // localStorage.setItem('search', JSON.stringify({ textSearch, isShortSwitchOn }));

    if (!isSavedMovies) {
      const savedSearchObj = localStorage.getItem('search');
      if (savedSearchObj) {
        const { text, isShort } = JSON.parse(savedSearchObj);

        setIsShortSwitchOn(isShort || false);

        setValue('movie', text || '');
        if (isMoviesLoadState === 0 && text !== '') {
          setIsMoviesLoadState(1);
        }
      }

      const filterValue = getValues('movie');

      startFilter(filterValue, movies, isShortSwitchOn);
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    isSavedMovies && setMoviesAfterFilter(movies || []);

    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (isSearchOn) {
      const filterValue = getValues('movie');
      startFilter(filterValue, movies, isShortSwitchOn);
    }

    // eslint-disable-next-line
  }, [isSearchOn]);

  useEffect(() => {
    if (isSearchOn) {
      if (moviesAfterFilter.length === 0 && (isMoviesLoadState === 2 || isSavedMovies)) {
        setPopupInfoMessage('Фильмы с указанными параметрами поиска отсутствуют');
        setIsPopupInfoOpen(true);

        setIsSearchOn(false);
      } else {
        setIsSearchOn(false);
      }
    }
    // eslint-disable-next-line
  }, [moviesAfterFilter]);

  useEffect(() => {
    const filterValue = getValues('movie');

    startFilter(filterValue, movies, isShortSwitchOn);
    // eslint-disable-next-line
  }, [movies]);

  function startFilter(textFilter, arrayMovies, isShort) {
    const result = isShort
      ? findMoviesByKey(findShortMovies(arrayMovies), textFilter)
      : findMoviesByKey(arrayMovies, textFilter);

    !isSavedMovies && textFilter === '' ? setMoviesAfterFilter([]) : setMoviesAfterFilter(result);
  }

  function findShortMovies(moviesArray) {
    const result = moviesArray.filter(item => {
      return item.duration <= SHORT_MOVIE_DURATION;
    });

    return result;
  }
  function findMoviesByKey(moviesArray, textSearch) {
    const result = moviesArray.filter(item => {
      return (
        item.nameRU.toLowerCase().includes(textSearch.toLowerCase()) ||
        item.nameEN.toLowerCase().includes(textSearch.toLowerCase())
      );
    });

    return result;
  }

  function saveSearchResult(isShort) {
    if (!isSavedMovies && getValues('movie') !== '') {
      localStorage.setItem('search', JSON.stringify({ text: getValues('movie'), isShort }));
    }
  }

  function onSwitcherShortClick() {
    setIsShortSwitchOn(!isShortSwitchOn);
    if (!isSavedMovies && getValues('movie') !== '') {
      if (isMoviesLoadState === 0) {
        setIsMoviesLoadState(1);
      }

      setIsSearchOn(true);
      saveSearchResult(!isShortSwitchOn);
    } else if (isSavedMovies) {
      setIsSearchOn(true);
    }
  }

  function onSubmit(data) {
    if (!isSavedMovies && getValues('movie') !== '') {
      if (isMoviesLoadState === 0) {
        setIsMoviesLoadState(1);
      }

      setIsSearchOn(true);
      saveSearchResult(!isShortSwitchOn);
    } else if (isSavedMovies) {
      setIsSearchOn(true);
    }
  }

  return (
    <section className='search-form'>
      <form onSubmit={handleSubmit(onSubmit)} className='search-form__form'>
        <div className='search-form__container'>
          <div className='search-form__input-container'>
            <img className='search-form__image' src={findLogo} alt='Иконка поиска' />

            <input
              type='text'
              className='search-form__input'
              placeholder='Фильм'
              disabled={isSearchOn}
              //   value={`${currentUser.name}`}
              {...register('movie', {
                required: 'Ввведите ключ для поиска'
              })}
            />
          </div>

          <button
            type='submit'
            disabled={!isValid || isSearchOn}
            className='search-form__button-find opacity-button'
          >
            Найти
          </button>
        </div>
        <div className='search-form__short-movie-container'>
          <button
            className='search-form__short-movie-button opacity-button'
            type='button'
            onClick={onSwitcherShortClick}
          >
            <img
              className='search-form__switcher'
              src={`${isShortSwitchOn ? findShortFindOn : findShortFindOff}`}
              alt='Иконка переключателя'
            />
          </button>

          <p className='search-form__short-movie-text'>Короткометражки</p>
        </div>
      </form>
      <div className='search-form__input-error'>
        {errors?.movie && <p className='search-form__input-error-text'>{errors?.movie?.message}</p>}
      </div>
    </section>
  );
}
export default SearchForm;
