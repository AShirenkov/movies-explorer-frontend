// import React from 'react';
import { useState, useEffect } from 'react';

import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import { baseUrl } from '../../utils/constants';

function MoviesCardList({ moviesList, savedMovies, countCard }) {
  //   let countCardInitial = width > 900 ? 16 : width > 450 ? 8 : 5;
  //   let countCardForAddition = width > 900 ? 16 : width > 450 ? 8 : 4;

  const [isMoviesFinished, setIsMoviesFinished] = useState(false);

  const [countCardInitial, setCountCardInitial] = useState(countCard);
  const [countCards, setCountCards] = useState(countCardInitial);

  useEffect(() => {
    if (moviesList.length < countCards) {
      setIsMoviesFinished(true);
    } // eslint-disable-next-line
  }, []);
  useEffect(() => {
    setCountCardInitial(countCard);
  }, [countCard]);

  function onAddClick() {
    if (moviesList.length < countCards + countCardInitial) {
      setIsMoviesFinished(true);
      setCountCards(moviesList.length);
    } else {
      setCountCards(countCards + countCardInitial);
    }
  }
  return (
    <section className='movies'>
      <div className='movies__list'>
        {moviesList.slice(0, countCards).map(movieCard => (
          <MoviesCard key={movieCard.movieId} movieCard={movieCard} savedMovies={savedMovies} />
        ))}
      </div>
      {!isMoviesFinished && (
        <button className='movies__add-button opacity-button' onClick={onAddClick}>
          Ещё
        </button>
      )}
    </section>
  );
}
export default MoviesCardList;
