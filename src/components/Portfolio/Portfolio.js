import React from 'react';
import './Portfolio.css';
import PortfolioLink from '../PortfolioLink/PortfolioLink';
function Portfolio() {
  return (
    <section className='portfolio'>
      <h2 className='portfolio__title'>Портфолио</h2>

      <ul className='portfolio__list'>
        <li className='portfolio__item'>
          <PortfolioLink
            link={'https://ashirenkov.github.io/how-to-learn/'}
            linkName={'Статичный сайт'}
            isUnderline={true}
          />
        </li>

        <li className='portfolio__item'>
          <PortfolioLink
            link={'https://ashirenkov.github.io/russian-travel/'}
            linkName={'Адаптивный сайт'}
            isUnderline={true}
          />
        </li>

        <li className='portfolio__item'>
          <PortfolioLink
            link={'https://ashirenkov.github.io/mesto-react/'}
            linkName={'Одностраничное приложение'}
            isUnderline={true}
          />
        </li>
      </ul>
    </section>
  );
}
export default Portfolio;
