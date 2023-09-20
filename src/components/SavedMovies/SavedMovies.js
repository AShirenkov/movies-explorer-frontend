// import React, { useEffect, useState } from 'react';
import React from 'react';
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
  isBurger,

  onBurgerClick,
  width
}) {
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
