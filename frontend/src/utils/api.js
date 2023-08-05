class Api {
  constructor(dataApi) {
    this._address = dataApi.baseUrl;
    this._headers = dataApi.headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getUserInfo() {
    const jwt = localStorage.getItem('jwt');
    return fetch(`${this._address}/users/me`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    }).then(this._checkResponse);
  }

  getInitialCards() {
    const jwt = localStorage.getItem('jwt');
    return fetch(`${this._address}/cards`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    }).then(this._checkResponse);
  }

  getAllData() {
    return Promise.all([this.getUserInfo(), this.getInitialCards()]);
  }

  patchAvatar(src) {
    const jwt = localStorage.getItem('jwt');
    return fetch(`${this._address}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${jwt}`,
        'Content-Type':'application/json',
      },
      body: JSON.stringify({
        avatar: src,
      })
    }).then(this._checkResponse);
  }

  patchUserInfo(data) {
    const jwt = localStorage.getItem('jwt');
    return fetch(`${this._address}/users/me`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${jwt}`,
        'Content-Type':'application/json',
      },
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      })
    }).then(this._checkResponse);
  }

  createNewCard(data) {
    const jwt = localStorage.getItem('jwt');
    return fetch(`${this._address}/cards`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${jwt}`,
        'Content-Type':'application/json',
      },
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      })
    }).then(this._checkResponse);
  }

  deleteCard(cardId) {
    const jwt = localStorage.getItem('jwt');
    return fetch(`${this._address}/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${jwt}`,
        'Content-Type':'application/json',
      },
    }).then(this._checkResponse);
  }

  likeCard(cardId) {
    const jwt = localStorage.getItem('jwt');
    return fetch(`${this._address}/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${jwt}`,
        'Content-Type':'application/json',
      },
    }).then(this._checkResponse);
  }

  dislikeCard(cardId) {
    const jwt = localStorage.getItem('jwt');
    return fetch(`${this._address}/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${jwt}`,
        'Content-Type':'application/json',
      },
    }).then(this._checkResponse);
  }

  changeLikeCardStatus(id, isLiked) {
    const jwt = localStorage.getItem('jwt');
    return fetch(`${this._address}/cards/${id}/likes`, {
      method: isLiked ? 'PUT' : 'DELETE',
      headers: {
        Authorization: `Bearer ${jwt}`,
        'Content-Type':'application/json',
      },
    }).then(this._checkResponse);
  }

};

const api = new Api({
  // baseUrl: 'http://localhost:3000',
  baseUrl: 'https://api.rogovaksa.nomoreparties.co',
});

export default api;