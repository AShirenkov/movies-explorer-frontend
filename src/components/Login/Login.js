import './Login.css';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import logo from '../../images/logo.svg';
import React from 'react';
function Login() {
  const {
    register,

    formState: { errors, isValid },
    handleSubmit,
    reset
  } = useForm({
    mode: 'onBlur'
  });

  const onSubmit = data => reset();
  return (
    <div className='login'>
      <Link className='login__logo' to='/'>
        <img src={logo} alt='иконка перехода на главную' />
      </Link>
      <h1 className='login__title'>Рады видеть!</h1>

      <form onSubmit={handleSubmit(onSubmit)} className='login__form'>
        <div>
          <p className='login__input-label'>E-mail</p>
          <input
            type='text'
            className='login__input'
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
          <div className='login__input-error'>
            {errors?.email && <p className='login__input-error-text'>{errors?.email?.message}</p>}
          </div>
        </div>

        <div>
          <p className='login__input-label'>Пароль</p>
          <input
            type='password'
            className='login__input login__input_type_pass'
            placeholder='Пароль'
            {...register('password', {
              required: 'Поле обязательно к заполнению.',
              minLength: {
                value: 6,
                message: 'Введите пароль длинной от 6 символов'
              }
            })}
          />
          <div className='login__input-error'>
            {errors?.password && (
              <p className='login__input-error-text'>{errors?.password?.message}</p>
            )}
          </div>
        </div>

        <button type='submit' disabled={!isValid} className='login__button opacity-button'>
          Войти
        </button>
      </form>
      <div className='login__register'>
        <p className='login__text login__text_type_register'>Ещё не зарегистрированы?</p>

        <Link className='login__text login__text_type_link opacity-link' to='/signup'>
          Регистрация
        </Link>
      </div>
    </div>
  );
}

export default Login;
