import './Movies.css';

// import React, { useEffect, useState } from 'react';
import React from 'react';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Footer from '../Footer/Footer';
import Preloader from '../Preloader/Preloader';

// import { movies } from '../../utils/movies';

function Movies({
  movies,
  savedMovies,
  isDownload,
  isBurger,

  width,
  onBurgerClick
}) {
  //   const [moviesList, setMoviesList] = useState({});
  //   useEffect(() => {
  //     setMoviesList(movies);
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
          <MoviesCardList moviesList={movies} savedMovies={savedMovies} width={width} />
        )}
      </main>
      <Footer />
    </>
  );
}
export default Movies;
