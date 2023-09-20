import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import './MoviesCard.css';
import savedMoviesApi from '../../utils/SavedMoviesApi';

function MoviesCard({ movieCard, name, duration, imgLink }) {
  const currentLocation = useLocation();
  const [isLiked, setIsLiked] = useState(false);

  const isSavedMovies = currentLocation.pathname === '/saved-movies';

  const convertMinutesToHoursAndMinutes = time => {
    const hours = Math.floor(time / 60);
    const minutes = time % 60;
    const hoursStr = hours > 0 ? hours + 'ч' : '';
    const minutesString = minutes > 0 ? ' ' + minutes + 'м' : '';
    const durationString = hoursStr + minutesString;

    return durationString;
  };
  function onSavedClick() {
    /*isSavedMovies
      ? savedMoviesApi
          .removeMovieById(movieCard.movieId)
          .then(() => {
            // setCards(cards => cards.filter(i => i._id !== card._id));
            console.log('успех');
          })
          .catch(err => {
            console.log(err);
          })
      : isLiked
      ? savedMoviesApi
          .removeMovieById(movieCard)
          .then(() => {
            // setCards(cards => cards.filter(i => i._id !== card._id));
            console.log('успех');
          })
          .catch(err => {
            console.log(err);
          })
      : savedMoviesApi
          .addNewMovie(movieCard)
          .then(() => {
            // setCards(cards => cards.filter(i => i._id !== card._id));
            console.log('успех');
          })
          .catch(err => {
            console.log(err);
          });

    setIsLiked(!isLiked);
    console.log('isLiked'); //не забыть убрать*/
    console.log(movieCard.movieId);
    savedMoviesApi
      .addNewMovie(movieCard)
      .then(() => {
        console.log('успех');
      })
      .catch(err => {
        console.log(err);
      });

    // savedMoviesApi
    //   .removeMovieById(movieCard.movieId)
    //   .then(() => {
    //     console.log('успех2');
    //   })
    //   .catch(err => {
    //     console.log(err);
    //   });
  }

  return (
    <div className='movies-card'>
      <div className='movies-card__img-container'>
        <img src={movieCard.image} alt={movieCard.nameRU} className='movies-card__img' />
      </div>

      <div className='movies-card__container'>
        <h2 className='movies-card__title'>{movieCard.nameRU}</h2>

        <button
          type='button'
          onClick={onSavedClick}
          className={`movies-card__button opacity-button ${
            isSavedMovies
              ? 'movies-card__button_mode_remove-save'
              : isLiked
              ? 'movies-card__button_mode_like'
              : 'movies-card__button_mode_dislike'
          }`}
        />
      </div>
      <p className='movies-card__duration'>
        {' '}
        {convertMinutesToHoursAndMinutes(movieCard.duration)}
      </p>
    </div>
  );
}
export default MoviesCard;
