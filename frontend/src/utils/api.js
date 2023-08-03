class Api {
  constructor(apidata) {
    this._address = apidata.baseUrl;
    this._headers = apidata.headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(res.status);
  }

  getUserInfo() {
    return fetch(`${this._address}/users/me`, {
      method: 'GET',
      headers: this._headers,
    }).then(this._checkResponse);
  }

  getInitialCards() {
    return fetch(`${this._address}/cards`, {
      method: 'GET',
      headers: this._headers,
    }).then(this._checkResponse);
  }

  getAllData() {
    return Promise.all([this.getUserInfo(), this.getInitialCards()]);
  }

  patchAvatar(src) {
    return fetch(`${this._address}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: src,
      })
    }).then(this._checkResponse);
  }

  patchUserInfo(data) {
    return fetch(`${this._address}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      })
    }).then(this._checkResponse);
  }

  createNewCard(data) {
    return fetch(`${this._address}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      })
    }).then(this._checkResponse);
  }

  deleteCard(cardId) {
    return fetch(`${this._address}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers,
    }).then(this._checkResponse);
  }

  likeCard(cardId) {
    return fetch(`${this._address}/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: this._headers,
    }).then(this._checkResponse);
  }

  dislikeCard(cardId) {
    return fetch(`${this._address}/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: this._headers,
    }).then(this._checkResponse);
  }

  changeLikeCardStatus(id, isLiked) {
    return fetch(`${this._address}/cards/likes/${id}`, {
      method: isLiked ? 'PUT' : 'DELETE',
      headers: this._headers,
    }).then(this._checkResponse);
  }

};

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-64',
  headers: {
    authorization: 'd98ad6b2-d69e-45ea-bfbc-28681934b055',
    'Content-Type': 'application/json'
  }
});

export default api;