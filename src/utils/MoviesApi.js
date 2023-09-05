class MoviesApi {
  constructor({ url, headers }) {
    this._url = url;
    this._headers = headers;
  }

  _getResponse(res) {
    return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
  }

  getMovies() {
    return fetch(`${this._url}/beatfilm-movies`, {
      method: "GET",
      headers: this._headers,
    }).then((res) => this._getResponse(res));
  }
}

export const moviesApi = new MoviesApi({
  url: "https://api.nomoreparties.co",
  headers: {
    "Content-Type": "application/json",
  },
});
