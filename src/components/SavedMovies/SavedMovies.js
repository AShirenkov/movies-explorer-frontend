import React, { useState } from 'react';

import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';
import Preloader from '../Preloader/Preloader';

import './SavedMovies.css';

function SavedMovies({
  movies,
  savedMovies,
  addItemSavedMovies,
  removeItemSavedMovies,
  isDownload,
  isDownloadSaved,

  isBurger,

  onBurgerClick,
  width,
  setIsPopupInfoOpen,
  setPopupInfoMessage
}) {
  const [moviesAfterFilter, setMoviesAfterFilter] = useState([]);
  const isLoggedIn = true;

  return (
    <>
      <Header isLoggedIn={isLoggedIn} isBurger={isBurger} onBurgerClick={onBurgerClick} />
      <main className='content'>
        <SearchForm
          setMoviesAfterFilter={setMoviesAfterFilter}
          movies={savedMovies}
          moviesAfterFilter={moviesAfterFilter}
          setIsPopupInfoOpen={setIsPopupInfoOpen}
          setPopupInfoMessage={setPopupInfoMessage}
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
export default SavedMovies;
