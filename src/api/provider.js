import Film from '../models/film.js';

const isOnline = () => {
  return window.navigator.onLine;
};

const createStoreStructure = (items) => {
  return items.reduce((acc, current) => {
    return Object.assign({}, acc, {
      [current.id]: current,
    });
  }, {});
};

export default class Provider {
  constructor(api, store) {
    this._api = api;
    this._store = store;
  }

  getFilms() {
    if (isOnline()) {
      return this._api.getFilms()
        .then((films) => {
          const items = createStoreStructure(films);

          this._store.setItems(items);

          return Film.parseFilms(films);
        });
    }

    const storeFilms = Object.values(this._store.getItems());

    return Promise.resolve(Film.parseFilms(storeFilms));
  }

  updateFilm(id, film) {
    if (isOnline()) {
      return this._api.updateFilm(id, film)
        .then((newFilm) => {
          this._store.setItem(newFilm.id, newFilm);

          return Film.parseFilm(newFilm);
        });
    }

    const localFilm = Object.assign(film, {id});

    this._store.setItem(id, localFilm);

    return Promise.resolve(Film.parseFilm(localFilm));
  }

  getComments(id) {
    if (isOnline()) {
      return this._api.getComments(id);
    }

    return Promise.reject(`offline`);
  }

  addComment(id, comment) {
    if (isOnline()) {
      return this._api.addComment(id, comment);
    }

    return Promise.reject(`offline`);
  }

  deleteComment(id) {
    if (isOnline()) {
      return this._api.deleteComment(id);
    }

    return Promise.reject(`offline`);
  }

  sync() {
    if (isOnline()) {
      const storeTasks = Object.values(this._store.getItems());

      return this._api.sync(storeTasks)
        .then((response) => {
          const updatedFilms = response.updated;

          const items = createStoreStructure(updatedFilms);

          this._store.setItems(items);
        });
    }

    return Promise.reject(new Error(`Sync data failed`));
  }
}
