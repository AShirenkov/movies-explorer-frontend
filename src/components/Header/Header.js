import logo from '../../images/logo.svg';
import './Header.css';
import HeaderLogin from '../HeaderLogin/HeaderLogin';
import { Link, useLocation } from 'react-router-dom';

import React from 'react';
import HeaderNavi from '../HeaderNavi/HeaderNavi';
function Header({ isLoggedIn, isBurger, onBurgerClick }) {
  const currentLocation = useLocation();
  const isMain = currentLocation.pathname === '/';
  return (
    <header className={`header ${isMain ? 'header_background_full' : 'header_background_clear'} `}>
      <Link className='header__link' to='/'>
        <img className='opacity-button' src={logo} alt='Иконка перехода на главную страницу' />
      </Link>
      {!isLoggedIn ? (
        <HeaderLogin />
      ) : !isBurger ? (
        <HeaderNavi />
      ) : (
        <button
          type='button'
          onClick={onBurgerClick}
          className='header__burger-button opacity-button'
        />
      )}
    </header>
  );
}

export default Header;
