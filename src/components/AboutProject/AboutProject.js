import React from 'react';
import './AboutProject.css';

import HeaderBlock from '../HeaderBlock/HeaderBlock';

function AboutProject() {
  return (
    <section className='about-project'>
      {/* <h2 className='about__title'>Студент</h2>
      <hr className='about__line' /> */}
      <HeaderBlock title={'О проекте'} />

      <div className='about-project__table'>
        <div className='about-project__column'>
          <h3 className='about-project__title'>Дипломный проект включал 5 этапов</h3>
          <p className='about-project__text'>
            Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные
            доработки.
          </p>
        </div>
        <div className='about-project__column'>
          <h3 className='about-project__title'>На выполнение диплома ушло 5 недель</h3>
          <p className='about-project__text'>
            У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы
            успешно защититься.
          </p>
        </div>
      </div>

      <div className='about-project__table-period'>
        <div className='about-project__column-weeks'>
          <p className='about-project__title-weeks about-project__title-weeks_color_green'>
            1 неделя
          </p>
          <p className='about-project__text-period'>Back-end</p>
        </div>
        <div className='about-project__column-weeks'>
          <p className='about-project__title-weeks'>4 недели</p>
          <p className='about-project__text-period'>Front-end</p>
        </div>
      </div>
    </section>
  );
}
export default AboutProject;
