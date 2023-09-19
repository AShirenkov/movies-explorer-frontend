class Api {
  constructor({ baseUrl }) {
    this._baseUrl = baseUrl;
    //this._headers = headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    res.message = res.statusText;

    //return Promise.reject(`Ошибка сервера: ${res.status}`);
    return Promise.reject(res);
  }

  _request(url, options) {
    return fetch(`${this._baseUrl}${url}`, options).then(this._checkResponse);
  }

  _setHeaders() {
    return {
      authorization: `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json'
    };
  }

  getInitialCards() {
    return this._request('/cards', { headers: this._setHeaders() });
  }

  getMyUser() {
    return this._request('/users/me', { headers: this._setHeaders() });
  }

  // setUserInfo(obj) {
  //   return this._request('/users/me', {
  //     method: 'PATCH',
  //     headers: this._setHeaders(),
  //     body: JSON.stringify(obj)
  //   });
  // }
  // setUserAvatar(obj) {
  //   return this._request('/users/me/avatar', {
  //     method: 'PATCH',
  //     headers: this._setHeaders(),
  //     body: JSON.stringify(obj)
  //   });
  // }

  sendNewCard(obj) {
    return this._request('/cards', {
      method: 'POST',
      headers: this._setHeaders(),
      body: JSON.stringify(obj)
    });
  }

  removeCard(cardId) {
    return this._request(`/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._setHeaders()
    });
  }

  removeLike(cardId) {
    return this._request(`/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: this._setHeaders()
    });
  }
  setLike(cardId) {
    return this._request(`/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: this._setHeaders()
    });
  }
}

const api = new Api({
  baseUrl: 'http://localhost:3000'
  // baseUrl: 'https://api.ashir84.students.nomoreparties.co'
  /*headers: {
    authorization: 'c0cfe72b-23eb-4653-b6ea-f451b2b55b5c',
    'Content-Type': 'application/json'
  }*/
});

export default api;
