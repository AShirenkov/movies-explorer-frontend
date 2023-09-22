import React from 'react';
import { Link } from 'react-router-dom';
import './BurgerMenu.css';
import logo from '../../images/profile.svg';

function BurgerMenu() {
  return (
    <div className='register__login'>
      <p className='register__text register__text_type_login'>Уже зарегистрированы?</p>

      <Link className='register__text register__text_type_link opacity-link' to='/signin'>
        Войти
      </Link>
    </div>
  );
}

export default BurgerMenu;
