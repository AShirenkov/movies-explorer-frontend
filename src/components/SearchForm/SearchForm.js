import './SearchForm.css';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import findLogo from '../../images/find.svg';
import findShortFindOn from '../../images/find-shortOn.svg';
import findShortFindOff from '../../images/find-shortOff.svg';

function SearchForm() {
  const {
    register,

    formState: { errors, isValid },
    handleSubmit,

    setValue
  } = useForm({
    mode: 'onBlur'
  });
  const [isShortSwitchOn, setIsShortSwitchOn] = useState(false);

  //   useEffect(() => {
  //     setIsShortSwitchOn(true);

  //   }, []);

  function onSwitcherShortClick(evt) {
    evt.preventDefault();
    setIsShortSwitchOn(!isShortSwitchOn);
  }

  function onSubmit(evt) {
    evt.preventDefault();
  }

  return (
    <section className='search-form'>
      <form onSubmit={handleSubmit(onSubmit)} className='search-form__form'>
        <div className='search-form__container'>
          <div className='search-form__input-container'>
            <img className='search-form__image' src={findLogo} alt='Иконка поиска' />

            <input
              type='text'
              className='search-form__input'
              placeholder='Фильм'
              //   value={`${currentUser.name}`}
              {...register('movie', {
                required: 'Ввведите ключ для поиска'
              })}
            />
          </div>

          <button
            type='submit'
            disabled={!isValid}
            onClick={onSubmit}
            className='search-form__button-find opacity-button'
          >
            Найти
          </button>
        </div>
        <div className='search-form__short-movie-container'>
          <button
            className='search-form__short-movie-button opacity-button'
            type='button'
            onClick={onSwitcherShortClick}
          >
            <img
              className='search-form__switcher'
              src={`${isShortSwitchOn ? findShortFindOn : findShortFindOff}`}
              alt='Иконка переключателя'
            />
          </button>

          <p className='search-form__short-movie-text'>Короткометражки</p>
        </div>
      </form>
      <div className='search-form__input-error'>
        {errors?.movie && <p className='search-form__input-error-text'>{errors?.movie?.message}</p>}
      </div>
    </section>
  );
}
export default SearchForm;
