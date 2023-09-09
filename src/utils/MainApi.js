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
      headers: this.headers,
      credentials: "include",
      body: JSON.stringify({ name, email, password }),
    }).then((res) => this._getResponse(res));
  }

  authorize({ email, password }) {
    return fetch(`${this.url}/signin`, {
      method: "POST",
      headers: this.headers,
      credentials: "include",
      body: JSON.stringify({ email, password }),
    }).then((res) => this._getResponse(res));
  }

  getUserInfo() {
    return fetch(`${this.url}/users/me`, {
      method: "GET",
      headers: this.headers,
      credentials: "include",
    }).then((res) => this._getResponse(res));
  }

  getSavedMovies() {
    return fetch(`${this.url}/movies`, {
      method: "GET",
      headers: this.headers,
      credentials: "include",
    }).then((res) => this._getResponse(res));
  }

  editUserProfile({ name, email }) {
    return fetch(`${this.url}/users/me`, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify({ name, email }),
    }).then((res) => this._getResponse(res));
  }

  saveMovie(card, isLiked) {
    if (!isLiked) {
      return fetch(`${this.url}/movies`, {
        method: "POST",
        headers: this.headers,
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
  }

  deleteCard(card) {
    return fetch(`${this.url}/movies/${card.id}`, {
      method: "DELETE",
      headers: this.headers,
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
