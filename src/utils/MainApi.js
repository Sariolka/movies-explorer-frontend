class MainApi {
  constructor({ url, headers }) {
    this._url = url;
    this._headers = headers;
  }

  _getResponse(res) {
    return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
  }

  register(user) {
    return fetch(`${this._url}/signup`, {
      method: "POST",
      headers: this._headers,
      credentials: "include",
      body: JSON.stringify({
        name: user.name,
        email: user.email,
        password: user.password,
      }),
    }).then((res) => this._getResponse(res));
  }

  authorize(user) {
    return fetch(`${this._url}/signin`, {
      method: "POST",
      headers: this._headers,
      credentials: "include",
      body: JSON.stringify({ email: user.email, password: user.password }),
    }).then((res) => this._getResponse(res));
  }

  getUserInfo() {
    return fetch(`${this._url}/users/me`, {
      method: "GET",
      headers: this._headers,
    }).then((res) => this._getResponse(res));
  }

  checkToken() {
    return fetch(`${this._url}/users/me`, {
      method: "GET",
      headers: this._headers,
      credentials: "include",
    }).then((res) => this._getResponse(res));
  }

  getSavedMovies() {
    return fetch(`${this._url}/movies`, {
      method: "GET",
      headers: this._headers,
      credentials: "include",
    }).then((res) => this._getResponse(res));
  }

  editUserProfile({ name, email }) {
    return fetch(`${this._url}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({ name, email }),
    }).then((res) => this._getResponse(res));
  }

  addMovie(card) {
    return fetch(`${this._url}/movies`, {
      method: "POST",
      credentials: "include",
      headers: this._headers,
      body: JSON.stringify({
        country: card.country,
        director: card.director,
        duration: card.duration,
        year: card.year,
        description: card.description,
        image: `https://api.nomoreparties.co${card.image.url}`,
        trailer: card.trailerLink,
        thumbnail: `https://api.nomoreparties.co${card.image.formats.thumbnail.url}`,
        movieId: card.id,
        nameRU: card.nameRU,
        nameEN: card.nameEN,
      }),
    }).then((res) => this._getResponse(res));
  }

  deleteCard(card) {
    return fetch(`${this._url}/movies/${card.id}`, {
      method: "DELETE",
      headers: this._headers,
    }).then((res) => this._getResponse(res));
  }
}

export const mainApi = new MainApi({
  url: "http://api.sariola.diploma.nomoreparties.co",
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
    "Content-Type": "application/json",
  },
});
