import './NotFoundPage.css';
import React from 'react';
// import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function NotFoundPage() {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(-1);
  };
  return (
    <div className='not-found'>
      <h2 className='not-found__text not-found__text_type_title'>404</h2>
      <p className='not-found__text not-found__text_type_description'>Страница не найдена</p>

      <button
        className='not-found__text not-found__button not-found__text_type_link opacity-button'
        onClick={handleClick}
      >
        Назад
      </button>
    </div>
  );
}

export default NotFoundPage;
