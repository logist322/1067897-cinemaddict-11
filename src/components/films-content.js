import {createElement} from '../utils.js';

const createSiteContentTemplate = () => {
  return (
    `<section class="films">
    </section>`
  );
};

export default class ContentBoard {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createSiteContentTemplate();
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
