class MainApi {
  constructor({ url, headers }) {
    this.url = url;
    this.headers = headers;
  }

  _getResponse(res) {
    console.log(res);
    return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
  }

  register({ name, email, password }) {
    return fetch(`${this.url}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    }).then((res) => this._getResponse(res));
  }

  authorize({ email, password }) {
    return fetch(`${this.url}/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    }).then((res) => this._getResponse(res));
  }

  getContent(token) {
    return fetch(`${this.url}/users/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => this._getResponse(res));
  }

  editUserProfile({ name, email }) {
    return fetch(`${this.url}/users/me`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ name, email }),
    }).then((res) => this._getResponse(res));
  }

  getSavedMovies() {
    return fetch(`${this.url}/movies`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      credentials: "include",
    }).then((res) => this._getResponse(res));
  }

  saveMovie(card) {
    return fetch(`${this.url}/movies`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      credentials: "include",
      body: JSON.stringify({
        country: card.country,
        director: card.director,
        duration: card.duration,
        year: card.year,
        description: card.description,
        image: `https://api.nomoreparties.co${card.image.url}`,
        trailerLink: card.trailerLink,
        thumbnail: `https://api.nomoreparties.co${card.image.formats.thumbnail.url}`,
        movieId: card.id,
        nameRU: card.nameRU,
        nameEN: card.nameEN,
      }),
    }).then((res) => this._getResponse(res));
  }

  deleteMovie(movieId) {
    return fetch(`${this.url}/movies/${movieId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      credentials: "include",
    }).then((res) => this._getResponse(res));
  }
}

export const mainApi = new MainApi({
  url: "http://localhost:3001",
  headers: {},
});
//"http://localhost:3001"
//http://api.sariola.diploma.nomoreparties.co
