import {createElement} from '../utils.js';

const createMainListFilmsTemplate = (isAnyFilms) => {
  const heading = isAnyFilms ? `All movies. Upcoming` : `There are no movies in our database`;

  return (
    `<section class="films-list films-list--main">
      <h2 class="films-list__title ${isAnyFilms ? `visually-hidden` : ``}">${heading}</h2>
      ${isAnyFilms ?
      `<div class="films-list__container"></div>`
      : ``}
    </section>`
  );
};

export default class MainListFilms {
  constructor(isAnyFilms = true) {
    this._isAnyFilms = isAnyFilms;

    this._element = null;
  }

  getTemplate() {
    return createMainListFilmsTemplate(this._isAnyFilms);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
