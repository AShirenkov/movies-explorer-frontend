import './NotFoundPage.css';
import { Link } from 'react-router-dom';

import React from 'react';
function NotFoundPage() {
  return (
    <div className='not-found'>
      <h2 className='not-found__text not-found__text_type_title'>404</h2>
      <p className='not-found__text not-found__text_type_description'>Страница не найдена</p>

      <Link className='not-found__text not-found__text_type_link' to='/'>
        Назад
      </Link>
    </div>
  );
}

export default NotFoundPage;
