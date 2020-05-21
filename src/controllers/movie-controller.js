import FilmCardComponent from '../components/film-card.js';
import FilmPopupComponent from '../components/film-popup.js';
import CommentsController from '../controllers/comments.js';
import Film from '../models/film.js';
import {render, replace, remove} from '../utils/render.js';

export default class MovieController {
  constructor(container, dataChangeHandler, api) {
    this._container = container;
    this._dataChangeHandler = dataChangeHandler;
    this._api = api;

    this._film = null;

    this._filmCardComponent = null;
    this._filmPopupComponent = null;

    this._escapeButtonHandler = this._escapeButtonHandler.bind(this);
    this._closePopupHandler = this._closePopupHandler.bind(this);
    this._openPopupHandler = this._openPopupHandler.bind(this);
    this._changeData = this._changeData.bind(this);
    this._commentDeleteHandler = this._commentDeleteHandler.bind(this);
    this._commentAddHandler = this._commentAddHandler.bind(this);
    this._blockComments = this._blockComments.bind(this);
    this._unblockComments = this._unblockComments.bind(this);
  }

  render(film) {
    this._film = film;

    const oldFilmCardComponent = this._filmCardComponent;

    this._filmCardComponent = new FilmCardComponent(this._film);

    this._filmCardComponent.setOpenPopupClickHandlers(this._openPopupHandler);
    this._filmCardComponent.setControlsClickHandler(this._changeData);

    if (oldFilmCardComponent) {
      replace(this._filmCardComponent, oldFilmCardComponent);

      return;
    }

    render(this._container, this._filmCardComponent);
  }

  _escapeButtonHandler(evt) {
    if (evt.key === `Esc` || evt.key === `Escape`) {
      this._closePopupHandler();
    }
  }

  _changeData(field) {
    const changedData = Object.assign({}, this._film.controls, {[field]: !this._film.controls[field]});
    const newData = Film.clone(this._film);

    newData.controls = changedData;

    if (field === `isWatched`) {
      newData.watchingDate = new Date();
    }

    this._dataChangeHandler(this._film, newData);
  }

  _openPopupHandler() {
    this._filmPopupComponent = new FilmPopupComponent(this._film);
    this._filmPopupComponent.setControlsChangeHandler(this._changeData);
    render(document.body, this._filmPopupComponent);
    this._renderComments();

    window.addEventListener(`online`, this._unblockComments);

    window.addEventListener(`offline`, this._blockComments);

    this._filmPopupComponent.setCloseButtonClickHandler(this._closePopupHandler);

    document.body.classList.add(`hide-overflow`);

    document.addEventListener(`keydown`, this._escapeButtonHandler);
  }

  _renderComments() {
    this._api.getComments(this._film.id)
    .then((res) => {
      this._film.comments = res;

      if (this._commentsController) {
        this._commentsController.destroy();
      }

      this._commentsController = new CommentsController(this._filmPopupComponent.getElement().querySelector(`form`), this._film.comments, this._commentDeleteHandler, this._commentAddHandler);
      this._commentsController.render();
    })
    .catch(() => {
      return;
    });
  }

  _blockComments() {
    if (this._commentsController) {
      this._commentsController.blockAll();
    }
  }

  _unblockComments() {
    if (this._commentsController) {
      this._commentsController.unblockAll();
    }

    this._renderComments();
  }

  _closePopupHandler() {
    if (this._commentsController) {
      this._commentsController.destroy();
    }

    remove(this._filmPopupComponent);

    window.removeEventListener(`online`, this._unblockComments);

    window.removeEventListener(`offline`, this._blockComments);

    document.removeEventListener(`keydown`, this._escapeButtonHandler);

    document.body.classList.remove(`hide-overflow`);
  }

  _commentAddHandler(comment) {
    this._commentsController.blockInput();

    this._api.addComment(this._film.id, comment)
      .then((res) => {
        this._film.comments = res[`comments`];
        this.render(this._film);
        this._commentsController.setComments(this._film.comments);
      })
      .catch(() => {
        this._commentsController.unblockInput();
        this._commentsController.onError();
      });
  }

  _commentDeleteHandler(id) {
    this._api.deleteComment(id)
      .then(() => {
        this._film.comments = this._film.comments.filter((comment) => comment.id !== id);
        this.render(this._film);
        this._commentsController.setComments(this._film.comments);
      })
      .catch(() => {
        this._commentsController.refreshButtons();
      });
  }

  destroy() {
    remove(this._filmCardComponent);
  }
}
