import {
  ERROR_REGISTER_USER,
  ERROR_AUTH_TOKEN_TRASFER,
  ERROR_ALREADY_EXIST_USER
} from './PopupInfoMessageConstants.js';

class AuthApi {
  constructor({ baseUrl }) {
    this._baseUrl = baseUrl;
  }

  // _checkResponse(res) {
  //   if (res.ok) {
  //     return res.json();
  //   }
  //   return Promise.reject(`Ошибка сервера: ${res.status}`);
  // }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    // res.message = res.statusText;
    // res.message = 'тестовая ошибка';
    //return Promise.reject(`Ошибка сервера: ${res.status}`);
    //return Promise.reject(res);
    return res;
  }
  _setMessage(res) {
    if (res.status === 400) {
      res.message = ERROR_REGISTER_USER;
    }
    if (res.status === 401) {
      res.message = ERROR_AUTH_TOKEN_TRASFER;
    }
    if (res.status === 409) {
      res.message = ERROR_ALREADY_EXIST_USER;
    } else {
      res.message = res.statusText;
    }
    return Promise.reject(res);
  }

  _request(url, options) {
    return fetch(`${this._baseUrl}${url}`, options)
      .then(this._checkResponse)
      .then(this._setMessage);
  }

  _setHeaders() {
    return {
      authorization: `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json'
    };
  }

  register(password, email, name) {
    return this._request('/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password, email, name })
    });
  }
  login(password, email) {
    return this._request('/signin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password, email })
    });
  }

  getMyUser() {
    return this._request('/users/me', { headers: this._setHeaders() });
  }

  setUserInfo(obj) {
    return this._request('/users/me', {
      method: 'PATCH',
      headers: this._setHeaders(),
      body: JSON.stringify(obj)
    });
  }

  checkToken(jwt) {
    return this._request('/users/me', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwt}`
      }
    });
  }
}

const authApi = new AuthApi({
  // baseUrl: 'https://api.ashir84.diplom.nomoredomainsicu.ru'
  baseUrl: 'http://localhost:3000'
});

export default authApi;
