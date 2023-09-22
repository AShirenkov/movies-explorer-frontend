import './SearchForm.css';
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useLocation } from 'react-router-dom';
import findLogo from '../../images/find.svg';
import findShortFindOn from '../../images/find-shortOn.svg';
import findShortFindOff from '../../images/find-shortOff.svg';

function SearchForm({ setMoviesAfterFilter, movies, setIsDownload }) {
  const {
    register,
    getValues,
    formState: { errors, isValid },
    handleSubmit
  } = useForm({
    mode: 'all'
  });
  const [isShortSwitchOn, setIsShortSwitchOn] = useState(false);

  const currentLocation = useLocation();
  const isSavedMovies = currentLocation.pathname === '/saved-movies';

  useEffect(() => {
    // setIsShortSwitchOn(false);
    isSavedMovies ? setMoviesAfterFilter(movies || []) : setMoviesAfterFilter([]);
  }, [movies]);

  useEffect(() => {
    const filterValue = getValues('movie');

    const result = isShortSwitchOn
      ? findMoviesByKey(findShortMovies(movies), filterValue)
      : findMoviesByKey(movies, filterValue);

    setMoviesAfterFilter(result);
  }, [isShortSwitchOn]);

  function findShortMovies(moviesArray) {
    const result = moviesArray.filter(item => {
      return item.duration <= 40;
    });
    return result;
  }
  function findMoviesByKey(moviesArray, textSearch) {
    setIsDownload(true);
    const result = moviesArray.filter(item => {
      return (
        item.nameRU.toLowerCase().includes(textSearch.toLowerCase()) ||
        item.nameEN.toLowerCase().includes(textSearch.toLowerCase())
      );
    });
    setIsDownload(false);
    console.log(result);
    return result;
  }

  // function findMoviesByKey(moviesArray, textSearch) {
  //   setSearchResult(
  //     moviesArray.filter(item => {
  //       return (
  //         item.nameRU.toLowerCase().includes(textSearch.toLowerCase()) ||
  //         item.nameEN.toLowerCase().includes(textSearch.toLowerCase())
  //       );
  //     })
  //   );
  // }

  function onSwitcherShortClick(evt) {
    setIsShortSwitchOn(!isShortSwitchOn);
  }

  function onSubmit(data) {
    console.log(data);
    // setSearchResultShort(findShortMovies(movies));
    const result = isShortSwitchOn
      ? findMoviesByKey(findShortMovies(movies), data.movie)
      : findMoviesByKey(movies, data.movie);

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
