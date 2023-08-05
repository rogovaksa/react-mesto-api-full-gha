// const BASE_URL = "http://localhost:3000";
const BASE_URL = "https://api.rogovaksa.nomoreparties.co";

const BASE_HEADERS = {
  Accept: "application/json",
  "Content-Type": "application/json",
};

function request(endpoint, options) {
  return fetch(`${BASE_URL}/${endpoint}`, options).then((res) =>
    checkResponse(res)
  );
}

function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
}

export const register = ({ password, email }) => {
  return request(`signup`, {
    method: "POST",
    headers: BASE_HEADERS,
    body: JSON.stringify({ password, email }),
  });
};

export const authorize = (password, email) => {
  return request(`signin`, {
    method: "POST",
    headers: BASE_HEADERS,
    body: JSON.stringify({
      email,
      password,
    }),
  });
};

export const checkToken = () => {
  const token = localStorage.getItem('token');
  return request(`users/me`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};
