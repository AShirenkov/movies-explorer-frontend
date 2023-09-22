// import React from 'react';
import { useState, useLayoutEffect } from 'react';

import { useLocation } from 'react-router-dom';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList({
  moviesList,
  savedMovies,
  addItemSavedMovies,
  removeItemSavedMovies,
  width
}) {
  const currentLocation = useLocation();

  const [countCards, setCountCards] = useState(0);
  const [countCardsAdd, setCountCardsAdd] = useState(0);

  const isSavedMovies = currentLocation.pathname === '/saved-movies';

  useLayoutEffect(() => {
    setCountCards(width > 900 ? 16 : width > 450 ? 8 : 5);
    setCountCardsAdd(width > 900 ? 4 : width > 450 ? 2 : 2);

    if (moviesList.length - 1 < countCards || isSavedMovies) {
      setCountCards(moviesList.length);
    } // eslint-disable-next-line
  }, [moviesList]);

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
