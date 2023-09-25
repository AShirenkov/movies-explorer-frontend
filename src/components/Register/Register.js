import './Register.css';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import logo from '../../images/logo.svg';
import React from 'react';
function Register({ onRegister }) {
  const {
    register,

    formState: { errors, isValid },
    handleSubmit
    //reset
  } = useForm({
    mode: 'all'
  });

  // const onSubmit = data => reset();
  function onSubmit(data) {
    console.log(data);
    // const { name, email, password } = data;

    onRegister(data);
    // evt.preventDefault();
    // reset();
  }

  return (
    <div className='register'>
      <Link className='register__logo' to='/'>
        <img src={logo} alt='Иконка ссылка' />
      </Link>
      <h1 className='register__title'>Добро пожаловать!</h1>

      <form onSubmit={handleSubmit(onSubmit)} className='register__form'>
        <div>
          <p className='register__input-label'>Имя</p>
          <input
            type='text'
            className='register__input register__input_type_name'
            placeholder='Имя'
            {...register('name', {
              required: 'Поле обязательно к заполнению.',
              minLength: {
                value: 3,
                message: 'Введите имя длинной от 3 символов'
              }
            })}
          />
          <div className='register__input-error'>
            {errors?.name && <p className='register__input-error-text'>{errors?.name?.message}</p>}
          </div>
        </div>
        <div>
          <p className='register__input-label'>E-mail</p>
          <input
            type='email'
            className='register__input'
            placeholder='E-mail'
            {...register('email', {
              required: 'Поле обязательно к заполнению.',
              pattern: {
                value:
                  // eslint-disable-next-line
                  /^(?:[a-z0-9!#$%&amp;'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&amp;'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/,
                message: 'Введенный  E-mail не допустим.'
              }
            })}
          />
          <div className='register__input-error'>
            {errors?.email && (
              <p className='register__input-error-text'>{errors?.email?.message}</p>
            )}
          </div>
        </div>

        <div>
          <p className='register__input-label'>Пароль</p>
          <input
            type='password'
            className='register__input register__input_type_pass'
            placeholder='Пароль'
            {...register('password', {
              required: 'Поле обязательно к заполнению.',
              minLength: {
                value: 6,
                message: 'Введите пароль длинной от 6 символов'
              }
            })}
          />
          <div className='register__input-error'>
            {errors?.password && (
              <p className='register__input-error-text'>{errors?.password?.message}</p>
            )}
          </div>
        </div>

        <button type='submit' disabled={!isValid} className='register__button  opacity-button'>
          Зарегистрироваться
        </button>
      </form>
      <div className='register__login'>
        <p className='register__text register__text_type_login'>Уже зарегистрированы?</p>

        <Link className='register__text register__text_type_link opacity-link' to='/signin'>
          Войти
        </Link>
      </div>
    </div>
  );
}

export default Register;
