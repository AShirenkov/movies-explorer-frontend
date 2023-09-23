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
  setIsDownload,
  setIsPopupInfoOpen,
  setPopupInfoMessage
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
    const filterValue = getValues('movie');

    startFilter(filterValue, movies, isShortSwitchOn);
    // eslint-disable-next-line
  }, [movies]);

  useEffect(() => {
    const filterValue = getValues('movie');
    startFilter(filterValue, movies, isShortSwitchOn);

    // eslint-disable-next-line
  }, [isShortSwitchOn]);

  function startFilter(textFilter, arrayMovies, isShort) {
    const result = isShort
      ? findMoviesByKey(findShortMovies(arrayMovies), textFilter)
      : findMoviesByKey(arrayMovies, textFilter);

    !isSavedMovies && textFilter.length === 0
      ? setMoviesAfterFilter([])
      : setMoviesAfterFilter(result);
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
    if (!isSavedMovies) {
      localStorage.setItem('search', JSON.stringify({ text: getValues('movie'), isShort }));
    }
  }

  function onSwitcherShortClick() {
    saveSearchResult(!isShortSwitchOn);
    setIsShortSwitchOn(!isShortSwitchOn);

    setIsDownload(true);
    setTimeout(function () {
      setIsDownload(false);
      if (moviesAfterFilter.length === 0) {
        setPopupInfoMessage('Фильмы с указанными параметрами поиска отсутствуют');
        setIsPopupInfoOpen(true);
      }
    }, 1000);
  }

  function onSubmit(data) {
    setIsDownload(true);
    const result = isShortSwitchOn
      ? findMoviesByKey(findShortMovies(movies), data.movie)
      : findMoviesByKey(movies, data.movie);

    setTimeout(function () {
      setIsDownload(false);
      if (result.length === 0) {
        setPopupInfoMessage('Фильмы с указанными параметрами поиска отсутствуют');
        setIsPopupInfoOpen(true);
      }
    }, 1000);

    saveSearchResult(isShortSwitchOn);
    setMoviesAfterFilter(result);
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
              //   value={`${currentUser.name}`}
              {...register('movie', {
                required: 'Ввведите ключ для поиска'
              })}
            />
          </div>

          <button
            type='submit'
            disabled={!isValid}
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
