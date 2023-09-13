import React from 'react';
import './PortfolioLink.css';
function PortfolioLink({ link, linkName, isUnderline }) {
  return (
    <a href={link} target='_blank' className='portfolio-link'>
      <p className='portfolio-link__text'>{linkName}</p>
      <p className='portfolio-link__text portfolio-link__text_pointer'>&#x2197;</p>
    </a>
  );
}
export default PortfolioLink;
