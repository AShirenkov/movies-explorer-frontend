import React, { useEffect, useState } from 'react';
// import React from 'react';
// import React, { useState } from 'react';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';
import Preloader from '../Preloader/Preloader';

// import { moviesSaved } from '../../utils/moviesSaved';

import './SavedMovies.css';

function SavedMovies({
  movies,
  savedMovies,
  addItemSavedMovies,
  removeItemSavedMovies,
  isDownload,
  setIsDownload,
  isBurger,

  onBurgerClick,
  width
}) {
  const [moviesAfterFilter, setMoviesAfterFilter] = useState([]);
  const isLoggedIn = true;

  // useEffect(() => {
  //   console.log('moviesAfterFilter');
  //   console.log(moviesAfterFilter);
  // }, [moviesAfterFilter]);
  return (
    <>
      <Header isLoggedIn={isLoggedIn} isBurger={isBurger} onBurgerClick={onBurgerClick} />
      <main className='content'>
        <SearchForm
          setMoviesAfterFilter={setMoviesAfterFilter}
          movies={savedMovies}
          setIsDownload={setIsDownload}
        />
        {isDownload ? (
          <Preloader />
        ) : (
          <MoviesCardList
            moviesList={moviesAfterFilter}
            savedMovies={savedMovies}
            addItemSavedMovies={addItemSavedMovies}
            removeItemSavedMovies={removeItemSavedMovies}
            width={width}
          />
        )}
      </main>
      <Footer />
    </>
  );
}
export default SavedMovies;
