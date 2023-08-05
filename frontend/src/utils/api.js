class Api {
  constructor({baseUrl}) {
    this._address = baseUrl;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(res.status);
  }

  getUserInfo() {
    const jwt = localStorage.getItem('jwt');
    return fetch(`${this._address}/users/me`, {
      method: 'GET',
      headers: {
        authorization: `Bearer ${jwt}`,
      },
    }).then(this._checkResponse);
  }

  getInitialCards() {
    const jwt = localStorage.getItem('jwt');
    return fetch(`${this._address}/cards`, {
      method: 'GET',
      headers: {
        authorization: `Bearer ${jwt}`,
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
        authorization: `Bearer ${jwt}`,
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
        authorization: `Bearer ${jwt}`,
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
        authorization: `Bearer ${jwt}`,
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
        authorization: `Bearer ${jwt}`,
      },
    }).then(this._checkResponse);
  }

  likeCard(cardId) {
    const jwt = localStorage.getItem('jwt');
    return fetch(`${this._address}/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: {
        authorization: `Bearer ${jwt}`,
        'Content-Type':'application/json',
      },
    }).then(this._checkResponse);
  }

  dislikeCard(cardId) {
    const jwt = localStorage.getItem('jwt');
    return fetch(`${this._address}/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: {
        authorization: `Bearer ${jwt}`,
        'Content-Type':'application/json',
      },
    }).then(this._checkResponse);
  }

  changeLikeCardStatus(id, isLiked) {
    const jwt = localStorage.getItem('jwt');
    return fetch(`${this._address}/cards/${id}/likes`, {
      method: isLiked ? 'PUT' : 'DELETE',
      headers: {
        authorization: `Bearer ${jwt}`,
        'Content-Type':'application/json',
      },
    }).then(this._checkResponse);
  }

};

const api = new Api({
  // baseUrl: 'http://localhost:3000',
  baseUrl: 'https://api.rogovaksa.nomoreparties.co',
  // headers: {
  //   authorization: 'd98ad6b2-d69e-45ea-bfbc-28681934b055',
  //   'Content-Type': 'application/json'
  // }
});

export default api;