import React from 'react';
import './PortfolioLink.css';
function PortfolioLink({ link, linkName }) {
  return (
    <a href={link} target='_blank' className='portfolio-link opacity-link'>
      <p className='portfolio-link__text'>{linkName}</p>
      <p className='portfolio-link__text portfolio-link__text_pointer'>&#x2197;</p>
    </a>
  );
}
export default PortfolioLink;
