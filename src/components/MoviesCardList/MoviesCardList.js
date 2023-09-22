// import React from 'react';
import { useState, useEffect, useLayoutEffect } from 'react';

import { useLocation } from 'react-router-dom';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import { baseUrl } from '../../utils/constants';

function MoviesCardList({
  moviesList,
  savedMovies,
  addItemSavedMovies,
  removeItemSavedMovies,
  width
}) {
  // const [isMoviesFinished, setIsMoviesFinished] = useState(false);
  const currentLocation = useLocation();
  // const [countCardInitial, setCountCardInitial] = useState(countCard);
  const [countCards, setCountCards] = useState(0);
  const [countCardsAdd, setCountCardsAdd] = useState(0);

  const isSavedMovies = currentLocation.pathname === '/saved-movies';

  useLayoutEffect(() => {
    // setCountCards(countCard);
    // console.log(moviesList);
    setCountCards(width > 900 ? 16 : width > 450 ? 8 : 5);
    setCountCardsAdd(width > 900 ? 4 : width > 450 ? 2 : 2);

    if (moviesList.length - 1 < countCards || isSavedMovies) {
      // setIsMoviesFinished(false);
      setCountCards(moviesList.length);
    } // eslint-disable-next-line
  }, [moviesList]);

  // useLayoutEffect(() => {
  //   // setCountCards(countCard);
  //   // console.log(moviesList);

  //   if (moviesList.length < countCards || isSavedMovies) {
  //     setIsMoviesFinished(false);

  //     console.log(moviesList.length);
  //   } // eslint-disable-next-line
  // }, [countCards]);

  // useEffect(() => {
  //   setCountCardInitial(countCard);
  // }, [countCard]);

  function onAddClick() {
    if (moviesList.length < countCards + countCardsAdd) {
      // setIsMoviesFinished(true);
      setCountCards(moviesList.length);
    } else {
      setCountCards(countCards + countCardsAdd);
    }
  }
  return (
    <section className='movies'>
      <div className='movies__list'>
        {moviesList.slice(0, countCards).map(movieCard => (
          <MoviesCard
            key={movieCard.movieId}
            movieCard={movieCard}
            savedMovies={savedMovies}
            addItemSavedMovies={addItemSavedMovies}
            removeItemSavedMovies={removeItemSavedMovies}
          />
        ))}
      </div>
      {moviesList.length - 1 > countCards && !isSavedMovies && (
        <button className='movies__add-button opacity-button' onClick={onAddClick}>
          Ещё
        </button>
      )}
    </section>
  );
}
export default MoviesCardList;
