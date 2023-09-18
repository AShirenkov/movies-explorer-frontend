import './HeaderNavi.css';
import logo from '../../images/profile.svg';
import { Link, useLocation } from 'react-router-dom';

import React from 'react';
function HeaderNavi({ isPopup }) {
  const currentLocation = useLocation();
  const isMovies = currentLocation.pathname === '/movies';
  const isSavedMovies = currentLocation.pathname === '/saved-movies';
  const isMain = currentLocation.pathname === '/';
  return (
    <div className='header-navi'>
      <div className='header-navi__movies-container'>
        <Link
          className={`header-navi__text ${
            isMovies ? 'header-navi__text_type_active' : 'header-navi__text_type_inactive'
          }`}
          to='/movies'
        >
          Фильмы
        </Link>
        <Link
          className={`header-navi__text ${
            isSavedMovies ? 'header-navi__text_type_active' : 'header-navi__text_type_inactive'
          }`}
          to='/saved-movies'
        >
          Сохраненные фильмы
        </Link>
      </div>

      <Link className='header-navi__account opacity-link' to='/profile'>
        <p className='header-navi__account-text'>Аккаунт</p>
        <img
          src={logo}
          alt='Иконка аккаунта'
          className={`header-navi__account-logo ${
            isMain ? 'header-navi__account-logo_type_main' : 'header-navi__account-logo_type_other'
          }`}
        />
      </Link>
    </div>
  );
}

export default HeaderNavi;
