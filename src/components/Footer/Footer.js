import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

function Footer() {
  return (
    <footer className='footer'>
      <p className='footer__text footer__description'>
        Учебный проект Яндекс.Практикум х BeatFilm.
      </p>
      <div className='footer__bottom'>
        <p className='footer__text footer__copyright'>&copy; 2023 AShir84</p>
        <div className='footer__links'>
          <a
            href='https://practicum.yandex.ru/'
            target='_blank'
            className='footer__text footer__link opacity-button'
          >
            Яндекс.Практикум
          </a>
          <a
            href='https://github.com/AShirenkov'
            target='_blank'
            className='footer__text footer__link opacity-button'
          >
            Github
          </a>

          {/* <Link
            className='footer__text footer__link opacity-button'
            to='https://github.com/AShirenkov'
          >
            Яндекс.Практикум
          </Link>
          <Link
            className='footer__text footer__link opacity-button'
            to='https://practicum.yandex.ru/'
          >
            Github
          </Link> */}
        </div>
      </div>
    </footer>
  );
}

export default Footer;
