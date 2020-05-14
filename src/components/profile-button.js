import AbstractComponent from './abstract-component.js';

export const getRank = (watchedFilmCount) => {
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

export default class ProfileButton extends AbstractComponent {
  constructor(filmsModel) {
    super();

    this._filmsModel = filmsModel;

    this.refreshRank = this.refreshRank.bind(this);
    this._filmsModel.setDataChangeHandler(this.refreshRank);
  }

  getTemplate() {
    return createProfileButtonTemplate(this._filmsModel.getWatchedFilms().length);
  }

  refreshRank() {
    this._element.querySelector(`.profile__rating`).textContent = getRank(this._filmsModel.getWatchedFilms().length);
  }
}
