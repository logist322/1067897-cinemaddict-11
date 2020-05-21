import CommentsComponent from '../components/comments.js';
import {render, replace, remove} from '../utils/render.js';

const SHAKE_ANIMATION_TIMEOUT = 600;

const createComment = (comment, emotion) => {
  return {
    comment,
    emotion,
    date: new Date()
  };
};

export default class CommentsController {
  constructor(container, comments, commentDeleteHandler, commentAddHandler) {
    this._container = container;
    this._comments = comments;
    this._commentDeleteHandler = commentDeleteHandler;
    this._commentAddHandler = commentAddHandler;

    this._commentsComponent = null;

    this.destroy = this.destroy.bind(this);
    this._keydownHandler = this._keydownHandler.bind(this);
  }

  render() {
    const oldCommentsComponent = this._commentsComponent;

    this._commentsComponent = new CommentsComponent(this._comments);

    this._commentsComponent.setDeleteHandler(this._commentDeleteHandler);
    document.addEventListener(`keydown`, this._keydownHandler);

    if (oldCommentsComponent) {
      replace(this._commentsComponent, oldCommentsComponent);

      return;
    }

    render(this._container, this._commentsComponent);
  }

  refreshButtons() {
    this._commentsComponent.refreshButtons();
  }

  destroy() {
    remove(this._commentsComponent);
    document.removeEventListener(`keydown`, this._keydownHandler);
  }

  setComments(comments) {
    this._comments = comments;

    this.render();
  }

  blockInput() {
    this._commentsComponent.blockInput();
  }

  unblockInput() {
    this._commentsComponent.unblockInput();
  }

  blockAll() {
    this._commentsComponent.blockInput();
    this._commentsComponent.blockButtons();
  }

  unblockAll() {
    this._commentsComponent.unblockInput();
    this._commentsComponent.refreshButtons();
  }

  onError() {
    this._commentsComponent.getElement().querySelector(`.film-details__comment-input`).style = `box-shadow: 0 0 2px 2px red`;
    this._commentsComponent.getElement().querySelector(`.film-details__new-comment`).style.animation = `shake ${SHAKE_ANIMATION_TIMEOUT / 1000}s`;

    setTimeout(() => {
      this._commentsComponent.getElement().querySelector(`.film-details__new-comment`).style.animation = ``;
    }, SHAKE_ANIMATION_TIMEOUT);

    setTimeout(() => {
      this._commentsComponent.getElement().querySelector(`.film-details__comment-input`).style = `box-shadow: none`;
    }, SHAKE_ANIMATION_TIMEOUT * 3);
  }

  _keydownHandler(evt) {
    if (evt.key === `Enter` && (evt.ctrlKey || evt.metaKey)) {
      const newComment = this._commentsComponent.getInput();

      this._commentAddHandler(createComment(...Object.values(newComment)));
    }
  }
}
