import './PopupNavi.css';
import logo from '../../images/profile.svg';
import { Link, useLocation } from 'react-router-dom';

import React from 'react';
function PopupNavi({ isPopupOpen, onButtonCloseClick }) {
  const currentLocation = useLocation();
  const isMovies = currentLocation.pathname === '/movies';
  const isSavedMovies = currentLocation.pathname === '/saved-movies';
  const isMain = currentLocation.pathname === '/';
  return (
    <>
      <div className={`popup-back ${isPopupOpen ? 'popup-navi_opened' : ''}`}></div>
      <div className={`popup-navi ${isPopupOpen ? 'popup-navi_opened' : ''}`}>
        <div className='popup-navi__movies-container'>
          <Link
            className={`popup-navi__text ${
              isMain ? 'popup-navi__text_type_active' : 'popup-navi__text_type_inactive'
            }`}
            to='/'
            onClick={onButtonCloseClick}
          >
            Главная
          </Link>
          <Link
            className={`popup-navi__text ${
              isMovies ? 'popup-navi__text_type_active' : 'popup-navi__text_type_inactive'
            }`}
            to='/movies'
            onClick={onButtonCloseClick}
          >
            Фильмы
          </Link>
          <Link
            className={`popup-navi__text ${
              isSavedMovies ? 'popup-navi__text_type_active' : 'popup-navi__text_type_inactive'
            }`}
            to='/saved-movies'
            onClick={onButtonCloseClick}
          >
            Сохраненные фильмы
          </Link>
        </div>

        <Link className='popup-navi__account' to='/profile' onClick={onButtonCloseClick}>
          <p className='popup-navi__account-text'>Аккаунт</p>
          <img
            src={logo}
            alt='Иконка аккаунта'
            className={`popup-navi__account-logo ${
              isMain ? 'popup-navi__account-logo_type_main' : 'popup-navi__account-logo_type_other'
            }`}
          />
        </Link>
        <button
          type='button'
          onClick={onButtonCloseClick}
          className='popup-navi__close-button opacity-button'
        />
      </div>
    </>
  );
}

export default PopupNavi;
