import React from 'react';

import './PopupInfo.css';
function PopupInfo({ isOpened, onButtonCloseClick, infoMessage }) {
  return (
    <div className={`popup-info ${isOpened ? 'popup-info_opened' : ''}`}>
      <div className='popup-info__container'>
        <div>
          {/* <img className='popup-info__img' src={logo} alt={infoMessage} /> */}
          <p className='popup-info__text'>{infoMessage}</p>
        </div>

        <button
          type='button'
          onClick={onButtonCloseClick}
          className='popup-info__close-button opacity-button'
        />
      </div>
    </div>
  );
}

export default PopupInfo;
