import './Movies.css';

import React, { useState } from 'react';
// import React from 'react';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';
import Preloader from '../Preloader/Preloader';

// import { movies } from '../../utils/movies';

function Movies({
  movies,
  savedMovies,
  addItemSavedMovies,
  removeItemSavedMovies,
  isDownload,
  isDownloadSaved,

  isBurger,

  width,
  onBurgerClick,
  setIsPopupInfoOpen,
  setPopupInfoMessage,
  isMoviesLoadState,
  setIsMoviesLoadState
}) {
  //   const [moviesList, setMoviesList] = useState({});
  //   useEffect(() => {
  //     setMoviesList(movies);
  //   }, []);

  const [moviesAfterFilter, setMoviesAfterFilter] = useState([]);

  const isLoggedIn = true;
  return (
    <>
      <Header isLoggedIn={isLoggedIn} isBurger={isBurger} onBurgerClick={onBurgerClick} />
      <main className='content'>
        <SearchForm
          setMoviesAfterFilter={setMoviesAfterFilter}
          movies={movies}
          moviesAfterFilter={moviesAfterFilter}
          setIsPopupInfoOpen={setIsPopupInfoOpen}
          setPopupInfoMessage={setPopupInfoMessage}
          isMoviesLoadState={isMoviesLoadState}
          setIsMoviesLoadState={setIsMoviesLoadState}
        />
        {isDownload || isDownloadSaved ? (
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
export default Movies;
