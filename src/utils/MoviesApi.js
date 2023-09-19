class MoviesApi {
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
      'Content-Type': 'application/json'
    };
  }

  getMovies() {
    return this._request('/beatfilm-movies', { headers: this._setHeaders() });
  }
}

const moviesApi = new MoviesApi({
  baseUrl: 'https://api.nomoreparties.co/'
});

export default moviesApi;
