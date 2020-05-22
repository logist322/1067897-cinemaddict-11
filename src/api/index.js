const Method = {
  GET: `GET`,
  POST: `POST`,
  PUT: `PUT`,
  DELETE: `DELETE`
};

const checkStatus = (res) => {
  if (res.status >= 200 && res.status < 300) {
    return res;
  } else {
    throw new Error(`${res.status}: ${res.statusText}`);
  }
};

export default class API {
  constructor(authorization, endPoint) {
    this._authorization = authorization;
    this._endPoint = endPoint;
  }

  getFilms() {
    return this._sendRequest({
      url: `movies`
    })
      .then((res) => res.json());
  }

  updateFilm(id, film) {
    return this._sendRequest({
      url: `movies/${id}`,
      method: Method.PUT,
      body: JSON.stringify(film),
      headers: new Headers({"Content-Type": `application/json`})
    })
      .then((res) => res.json());
  }

  getComments(id) {
    return this._sendRequest({
      url: `comments/${id}`
    })
      .then((res) => res.json());
  }

  addComment(id, comment) {
    return this._sendRequest({
      url: `comments/${id}`,
      method: Method.POST,
      body: JSON.stringify(comment),
      headers: new Headers({"Content-Type": `application/json`})
    })
      .then((res) => res.json());
  }

  deleteComment(id) {
    return this._sendRequest({url: `comments/${id}`, method: Method.DELETE});
  }

  sync(data) {
    return this._sendRequest({
      url: `movies/sync`,
      method: Method.POST,
      body: JSON.stringify(data),
      headers: new Headers({"Content-Type": `application/json`})
    })
      .then((response) => response.json());
  }

  _sendRequest({url, method = Method.GET, body = null, headers = new Headers()}) {
    headers.append(`Authorization`, this._authorization);

    return fetch(`${this._endPoint}/${url}`, {method, body, headers})
      .then(checkStatus)
      .catch((err) => {
        throw err;
      });
  }
}
