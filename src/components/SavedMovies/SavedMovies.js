// import React, { useEffect, useState } from 'react';
import React from 'react';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';
import Preloader from '../Preloader/Preloader';

// import { moviesSaved } from '../../utils/moviesSaved';

import './SavedMovies.css';

function SavedMovies({ movies, savedMovies, isDownload, isBurger, countCard, onBurgerClick }) {
  //   const [moviesList, setMoviesList] = useState({});
  //   useEffect(() => {
  //     setMoviesList(moviesSaved);
  //   }, []);

  const isLoggedIn = true;
  return (
    <>
      <Header isLoggedIn={isLoggedIn} isBurger={isBurger} onBurgerClick={onBurgerClick} />
      <main className='content'>
        <SearchForm />
        {isDownload ? (
          <Preloader />
        ) : (
          <MoviesCardList
            moviesList={savedMovies}
            savedMovies={savedMovies}
            countCard={countCard}
          />
        )}
      </main>
      <Footer />
    </>
  );
}
export default SavedMovies;
