import React from 'react';
import './AboutMe.css';
import myPhoto from '../../images/photo.png';

import HeaderBlock from '../HeaderBlock/HeaderBlock';

function AboutMe() {
  return (
    <section className='about'>
      {/* <h2 className='about__title'>Студент</h2>
      <hr className='about__line' /> */}
      <HeaderBlock title={'Студент'} />
      <div className='about__card'>
        <img src={myPhoto} alt='Фотография Александра' className='about__photo' />
        <div className='about__description'>
          <p className='about__name'>Александр</p>
          <p className='about__profession'>Фронтенд-разработчик, 38 лет</p>
          <p className='about__story'>
            Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня есть жена и дочь.
            Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить. С 2015 года работал
            в компании «СКБ Контур». После того, как прошёл курс по веб-разработке, начал заниматься
            фриланс-заказами и ушёл с постоянной работы.
          </p>
          <a
            href='https://github.com/AShirenkov'
            target='_blank'
            className='about__link about__git opacity-button'
          >
            Github
          </a>
        </div>
      </div>
    </section>
  );
}
export default AboutMe;
