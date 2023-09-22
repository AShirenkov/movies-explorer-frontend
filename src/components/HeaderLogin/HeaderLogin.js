import './HeaderLogin.css';

import { Link } from 'react-router-dom';

import React from 'react';
function HeaderLogin() {
  return (
    <div className='header-login'>
      <Link className='header-login__text header-login__signup' to='/signup'>
        Регистрация
      </Link>
      <Link className='header-login__text header-login__signin' to='/signin'>
        Войти
      </Link>
    </div>
  );
}

export default HeaderLogin;
