import React from 'react';
import './Techs.css';

import HeaderBlock from '../HeaderBlock/HeaderBlock';

function Techs() {
  return (
    <section className='tech'>
      {/* <h2 className='about__title'>Студент</h2>
      <hr className='about__line' /> */}
      <HeaderBlock title={'Технологии'} />
      <div className='tech__container'>
        <h3 className='tech__title'>7 технологий</h3>
        <p className='tech__text'>
          На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.
        </p>
      </div>

      <ul className='tech__list'>
        <li className='tech__item'>HTML</li>
        <li className='tech__item'>CSS</li>
        <li className='tech__item'>JS</li>
        <li className='tech__item'>React</li>
        <li className='tech__item'>Git</li>
        <li className='tech__item'>Express.js</li>
        <li className='tech__item'>mongoDB</li>
      </ul>
    </section>
  );
}
export default Techs;
