class AuthApi {
  constructor({ baseUrl }) {
    this._baseUrl = baseUrl;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка сервера: ${res.status}`);
  }

  _request(url, options) {
    return fetch(`${this._baseUrl}${url}`, options).then(this._checkResponse);
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
