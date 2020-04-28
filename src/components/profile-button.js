import {createElement} from '../utils.js';

const getRank = (watchedFilmCount) => {
  let rank;

  switch (true) {
    case watchedFilmCount === 0:
      rank = ``;
      break;

    case watchedFilmCount >= 1 && watchedFilmCount <= 10:
      rank = `novice`;
      break;

    case watchedFilmCount >= 11 && watchedFilmCount <= 20:
      rank = `fan`;
      break;

    default:
      rank = `movie buff`;
  }

  return rank;
};

const createProfileButtonTemplate = (watchedFilmCount) => {
  const rank = getRank(watchedFilmCount);

  return (
    `<section class="header__profile profile">
      <p class="profile__rating">${rank}</p>
      <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
    </section>`
  );
};

export default class ProfileButton {
  constructor(watchedFilmCount) {
    this._watchedFilmCount = watchedFilmCount;
    this._element = null;
  }

  getTemplate() {
    return createProfileButtonTemplate(this._watchedFilmCount);
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
