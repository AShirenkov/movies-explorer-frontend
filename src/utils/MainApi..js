class MainApi {
  constructor({ baseUrl }) {
    this._baseUrl = baseUrl;
    //this._headers = headers;
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

  _setHeaders() {
    return {
      authorization: `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json'
    };
  }

  getMovies() {
    return this._request('/movies', { headers: this._setHeaders() });
  }

  addNewMovie(obj) {
    return this._request('/movies', {
      method: 'POST',
      headers: this._setHeaders(),
      body: JSON.stringify(obj)
    });
  }

  removeMovieById(movieId) {
    return this._request(`/movies/${movieId}`, {
      method: 'DELETE',
      headers: this._setHeaders()
    });
  }
}

const mainApi = new MainApi({
  baseUrl: 'https://api.ashir84.diplom.nomoredomainsicu.ru'
  // baseUrl: 'http://localhost:3000'
});

export default mainApi;
