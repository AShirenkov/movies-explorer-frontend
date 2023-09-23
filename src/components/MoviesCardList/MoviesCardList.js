// import React from 'react';
import { useState, useLayoutEffect } from 'react';

import { useLocation } from 'react-router-dom';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';

import {
  CARD_COUNT_FOUR_IN_ROW,
  CARD_COUNT_THREE_IN_ROW,
  CARD_COUNT_TWO_IN_ROW,
  CARD_COUNT_ONE_IN_ROW,
  CARD_ADD_FOUR_IN_ROW,
  CARD_ADD_THREE_IN_ROW,
  CARD_ADD_TWO_IN_ROW,
  CARD_ADD_ONE_IN_ROW,
  WIDTH_THREE_CARD,
  WIDTH_TWO_CARD,
  WIDTH_ONE_CARD
} from '../../utils/constants.js';

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
    setCountCards(
      width > WIDTH_THREE_CARD
        ? CARD_COUNT_FOUR_IN_ROW
        : width > WIDTH_TWO_CARD
        ? CARD_COUNT_THREE_IN_ROW
        : width > WIDTH_ONE_CARD
        ? CARD_COUNT_TWO_IN_ROW
        : CARD_COUNT_ONE_IN_ROW
    );
    setCountCardsAdd(
      width > WIDTH_THREE_CARD
        ? CARD_ADD_FOUR_IN_ROW
        : width > WIDTH_TWO_CARD
        ? CARD_ADD_THREE_IN_ROW
        : width > WIDTH_ONE_CARD
        ? CARD_ADD_TWO_IN_ROW
        : CARD_ADD_ONE_IN_ROW
    );

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
