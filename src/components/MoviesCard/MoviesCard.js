import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import './MoviesCard.css';

import cardLike from '../../images/liked.svg';
import cardDislike from '../../images/disliked.svg';
import cardRemoveSaved from '../../images/saved-remove.svg';

function MoviesCard({ name, duration, imgLink }) {
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
    setIsLiked(!isLiked);
    console.log('isLiked'); //не забыть убрать
  }
  return (
    <div className='movies-card'>
      <div className='movies-card__img-container'>
        <img
          src={imgLink}
          alt={name}
          // onClick={handleClick}
          className='movies-card__img'
        />
      </div>

      <div className='movies-card__container'>
        <h2 className='movies-card__title'>{name}</h2>

        <img
          onClick={onSavedClick}
          src={`${isSavedMovies ? cardRemoveSaved : isLiked ? cardLike : cardDislike}`}
          alt='Картинка кнопка для отображения сохраненного состояния'
          className={`${
            isSavedMovies ? 'movies-card__remove-button' : 'movies-card__saved-button'
          }`}
        />
      </div>
      <p className='movies-card__duration'> {convertMinutesToHoursAndMinutes(duration)}</p>
    </div>
  );
}
export default MoviesCard;
