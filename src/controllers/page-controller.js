import MainListFilmsComponent from '../components/main-list-films.js';
import TopRateFilmsComponent from '../components/top-rate-films.js';
import MostCommentedFilmsComponent from '../components/most-commented-films.js';
import FilmCardComponent from '../components/film-card.js';
import ShowMoreButtonComponent from '../components/show-more-button.js';
import FilmPopupComponent from '../components/film-popup.js';
import {render, remove} from '../utils/render.js';

const CARD_COUNT_ON_START = 5;
const CARD_COUNT_ON_CLICK = 5;
const TOP_CARD_COUNT = 2;
const MOST_CARD_COUNT = 2;

const renderFilm = (filmsListElement, film) => {
  const escapeButtonHandler = (evt) => {
    evt.preventDefault();

    if (evt.key === `Esc` || evt.key === `Escape`) {
      remove(filmPopupComponent);
      document.removeEventListener(`keydown`, escapeButtonHandler);
    }
  };

  const filmCardComponent = new FilmCardComponent(film);
  const filmPopupComponent = new FilmPopupComponent(film);

  filmCardComponent.setPosterClickhandler((evtPoster) => {
    evtPoster.preventDefault();

    filmPopupComponent.setCloseButtonClickHandler((evtCloseButton) => {
      evtCloseButton.preventDefault();
      remove(filmPopupComponent);
    });
    render(document.body, filmPopupComponent);
    document.addEventListener(`keydown`, escapeButtonHandler);
  });

  render(filmsListElement, filmCardComponent);
};

export default class PageController {
  constructor(container) {
    this._container = container;

    this._mainListFilmsComponent = new MainListFilmsComponent();
    this._topRateFilmsComponent = new TopRateFilmsComponent();
    this._mostCommentedFilmsComponent = new MostCommentedFilmsComponent();
    this._showMoreButtonComponent = new ShowMoreButtonComponent();
  }

  render(films) {
    const container = this._container.getElement();

    if (!films.length) {
      render(container, new MainListFilmsComponent(false));

      return;
    }

    const mainListFilmsComponent = new MainListFilmsComponent();
    render(container, mainListFilmsComponent);

    const mainListFilmsContainerElement = mainListFilmsComponent.getElement().querySelector(`.films-list__container`);

    let filmToShowIndex = CARD_COUNT_ON_START;

    films.slice(0, filmToShowIndex).forEach((it) => renderFilm(mainListFilmsContainerElement, it));

    let shownFilmsCount = filmToShowIndex;

    const showMoreButtonComponent = new ShowMoreButtonComponent();

    render(container, showMoreButtonComponent);

    showMoreButtonComponent.getElement().addEventListener(`click`, (evt) => {
      evt.preventDefault();

      filmToShowIndex = shownFilmsCount + CARD_COUNT_ON_CLICK;

      films.slice(shownFilmsCount, filmToShowIndex).forEach((it) => renderFilm(mainListFilmsContainerElement, it));

      shownFilmsCount = filmToShowIndex;

      if (shownFilmsCount >= films.length) {
        showMoreButtonComponent.getElement().remove();
      }
    });

    const topRateFilmsComponent = new TopRateFilmsComponent();
    render(container, topRateFilmsComponent);

    const topRateContainerElement = topRateFilmsComponent.getElement().querySelector(`.films-list__container`);

    films.slice().sort((a, b) => b.rating - a.rating).slice(0, TOP_CARD_COUNT).forEach((it) => renderFilm(topRateContainerElement, it));

    const mostCommentedFilmsComponent = new MostCommentedFilmsComponent();
    render(container, mostCommentedFilmsComponent);

    const mostCommentedContainerElement = mostCommentedFilmsComponent.getElement().querySelector(`.films-list__container`);

    films.slice().sort((a, b) => b.comments.length - a.comments.length).slice(0, MOST_CARD_COUNT).forEach((it) => renderFilm(mostCommentedContainerElement, it));
  }
}
