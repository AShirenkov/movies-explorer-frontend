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
        <div className='about__description'>
          <p className='about__name'>Александр</p>
          <p className='about__profession'>Фронтенд-разработчик, 38 лет</p>
          <p className='about__story'>
            Я живу в Нижнем Новгороде, закончил факультет прикладной математики СарФТИ 18 лет назад.
            У меня есть жена и сын. Я люблю слушать музыку, а ещё увлекаюсь спортом. С 2010 года
            работаю в сфере АСУТП. Недавно заинтересовала Web-разработка.
          </p>
          <a
            href='https://github.com/AShirenkov'
            target='_blank'
            rel='noreferrer'
            className='about__link about__git opacity-button'
          >
            Github
          </a>
        </div>
        <img src={myPhoto} alt='Фотография Александра' className='about__photo' />
      </div>
    </section>
  );
}
export default AboutMe;
