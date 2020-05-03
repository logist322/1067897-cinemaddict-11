/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/components/abstract-component.js":
/*!**********************************************!*\
  !*** ./src/components/abstract-component.js ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return AbstractComponent; });
/* harmony import */ var _utils_common_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/common.js */ "./src/utils/common.js");


class AbstractComponent {
  constructor() {
    if (new.target === AbstractComponent) {
      throw new Error(`Can't instantiate AbstractComponent, only concrete one.`);
    }

    this._element = null;
  }

  getTemplate() {
    throw new Error(`Abstract method not implemented: getTemplate`);
  }

  getElement() {
    if (!this._element) {
      this._element = Object(_utils_common_js__WEBPACK_IMPORTED_MODULE_0__["createElement"])(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}


/***/ }),

/***/ "./src/components/content-board.js":
/*!*****************************************!*\
  !*** ./src/components/content-board.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ContentBoard; });
/* harmony import */ var _abstract_component_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./abstract-component.js */ "./src/components/abstract-component.js");


const createSiteContentTemplate = () => {
  return (
    `<section class="films">
    </section>`
  );
};

class ContentBoard extends _abstract_component_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
  getTemplate() {
    return createSiteContentTemplate();
  }
}


/***/ }),

/***/ "./src/components/film-card.js":
/*!*************************************!*\
  !*** ./src/components/film-card.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Film; });
/* harmony import */ var _utils_common_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/common.js */ "./src/utils/common.js");
/* harmony import */ var _abstract_component_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./abstract-component.js */ "./src/components/abstract-component.js");



const createFilmCardTemplate = (film) => {
  const {name, src, rating, release, duration, genres, description, comments} = film;

  const durationInFormat = Object(_utils_common_js__WEBPACK_IMPORTED_MODULE_0__["formatDuration"])(duration);
  const commentsCount = comments.length;

  return (
    `<article class="film-card">
      <h3 class="film-card__title">${name}</h3>
      <p class="film-card__rating">${rating}</p>
      <p class="film-card__info">
        <span class="film-card__year">${release.year}</span>
        <span class="film-card__duration">${durationInFormat}</span>
        <span class="film-card__genre">${genres[0]}</span>
      </p>
      <img src="./images/posters/${src}" alt="" class="film-card__poster">
      <p class="film-card__description">${description}</p>
      <a class="film-card__comments">${commentsCount} comments</a>
      <form class="film-card__controls">
        <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist">Add to watchlist</button>
        <button class="film-card__controls-item button film-card__controls-item--mark-as-watched">Mark as watched</button>
        <button class="film-card__controls-item button film-card__controls-item--favorite">Mark as favorite</button>
      </form>
    </article>`
  );
};

class Film extends _abstract_component_js__WEBPACK_IMPORTED_MODULE_1__["default"] {
  constructor(film) {
    super();

    this._film = film;
  }

  getTemplate() {
    return createFilmCardTemplate(this._film);
  }

  setPosterClickhandler(handler) {
    this.getElement().querySelector(`.film-card__poster`).addEventListener(`click`, handler);
  }
}


/***/ }),

/***/ "./src/components/film-popup.js":
/*!**************************************!*\
  !*** ./src/components/film-popup.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return FilmPopup; });
/* harmony import */ var _utils_common_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/common.js */ "./src/utils/common.js");
/* harmony import */ var _abstract_component_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./abstract-component.js */ "./src/components/abstract-component.js");



const createGenresMarkup = (genres) => {
  return genres.map((genre) => {
    return `<span class="film-details__genre">${genre}</span>`;
  }).join(`\n`);
};

const createDetailRowsMarkup = (details) => {
  return Object.keys(details).map((it) => {
    return (
      `<tr class="film-details__row">
        <td class="film-details__term">${it}</td>
        <td class="film-details__cell">${details[it]}</td>
      </tr>`
    );
  }).join(`\n`);
};

const createCommentsMarkup = (comments) => {
  return comments.map((comment) => {
    return (
      `<li class="film-details__comment">
        <span class="film-details__comment-emoji">
          <img src="./images/emoji/${comment.emotion}" width="55" height="55" alt="emoji-smile">
        </span>
        <div>
          <p class="film-details__comment-text">${comment.text}</p>
          <p class="film-details__comment-info">
            <span class="film-details__comment-author">${comment.author}</span>
            <span class="film-details__comment-day">${Object(_utils_common_js__WEBPACK_IMPORTED_MODULE_0__["formatDate"])(comment.date)}</span>
            <button class="film-details__comment-delete">Delete</button>
          </p>
        </div>
      </li>`
    );
  }).join(`\n`);
};

const createFilmPopupTemplate = (film) => {
  const {name, src, rating, release, duration, genres, description, comments, age, director, writers, actors, country} = film;

  const commentsCount = comments.length;

  const details = {
    'Director': director,
    'Writers': writers.join(`, `),
    'Actors': actors.join(`, `),
    'Release Date': `${release.date} ${release.month} ${release.year}`,
    'Runtime': Object(_utils_common_js__WEBPACK_IMPORTED_MODULE_0__["formatDuration"])(duration),
    'Country': country,
    'Genres': createGenresMarkup(genres)
  };

  const detailRowsMarkup = createDetailRowsMarkup(details);
  const commentsMarkup = createCommentsMarkup(comments);

  return (
    `<section class="film-details">
      <form class="film-details__inner" action="" method="get">
        <div class="form-details__top-container">
          <div class="film-details__close">
            <button class="film-details__close-btn" type="button">close</button>
          </div>
          <div class="film-details__info-wrap">
            <div class="film-details__poster">
              <img class="film-details__poster-img" src="./images/posters/${src}" alt="">

              <p class="film-details__age">${age}+</p>
            </div>

            <div class="film-details__info">
              <div class="film-details__info-head">
                <div class="film-details__title-wrap">
                  <h3 class="film-details__title">${name}</h3>
                  <p class="film-details__title-original">Original: ${name}</p>
                </div>

                <div class="film-details__rating">
                  <p class="film-details__total-rating">${rating}</p>
                </div>
              </div>

              <table class="film-details__table">
                ${detailRowsMarkup}
              </table>

              <p class="film-details__film-description">
                ${description}
              </p>
            </div>
          </div>

          <section class="film-details__controls">
            <input type="checkbox" class="film-details__control-input visually-hidden" id="watchlist" name="watchlist">
            <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist">Add to watchlist</label>

            <input type="checkbox" class="film-details__control-input visually-hidden" id="watched" name="watched">
            <label for="watched" class="film-details__control-label film-details__control-label--watched">Already watched</label>

            <input type="checkbox" class="film-details__control-input visually-hidden" id="favorite" name="favorite">
            <label for="favorite" class="film-details__control-label film-details__control-label--favorite">Add to favorites</label>
          </section>
        </div>

        <div class="form-details__bottom-container">
          <section class="film-details__comments-wrap">
            <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${commentsCount}</span></h3>

            <ul class="film-details__comments-list">
              ${commentsMarkup}
            </ul>

            <div class="film-details__new-comment">
              <div for="add-emoji" class="film-details__add-emoji-label"></div>

              <label class="film-details__comment-label">
                <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
              </label>

              <div class="film-details__emoji-list">
                <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="smile">
                <label class="film-details__emoji-label" for="emoji-smile">
                  <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
                </label>

                <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping">
                <label class="film-details__emoji-label" for="emoji-sleeping">
                  <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
                </label>

                <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-puke" value="puke">
                <label class="film-details__emoji-label" for="emoji-puke">
                  <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
                </label>

                <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="angry">
                <label class="film-details__emoji-label" for="emoji-angry">
                  <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
                </label>
              </div>
            </div>
          </section>
        </div>
      </form>
    </section>`
  );
};

class FilmPopup extends _abstract_component_js__WEBPACK_IMPORTED_MODULE_1__["default"] {
  constructor(film) {
    super();

    this._film = film;
  }

  getTemplate() {
    return createFilmPopupTemplate(this._film);
  }

  setCloseButtonClickHandler(handler) {
    this.getElement().querySelector(`.film-details__close-btn`).addEventListener(`click`, handler);
  }
}


/***/ }),

/***/ "./src/components/main-list-films.js":
/*!*******************************************!*\
  !*** ./src/components/main-list-films.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return MainListFilms; });
/* harmony import */ var _abstract_component_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./abstract-component.js */ "./src/components/abstract-component.js");


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

class MainListFilms extends _abstract_component_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor(isAnyFilms = true) {
    super();

    this._isAnyFilms = isAnyFilms;
  }

  getTemplate() {
    return createMainListFilmsTemplate(this._isAnyFilms);
  }
}


/***/ }),

/***/ "./src/components/most-commented-films.js":
/*!************************************************!*\
  !*** ./src/components/most-commented-films.js ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return MostCommented; });
/* harmony import */ var _abstract_component_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./abstract-component.js */ "./src/components/abstract-component.js");


const createMostCommentedTemplate = () => {
  return (
    `<section class="films-list--extra films-list--most">
      <h2 class="films-list__title">Most commented</h2>

      <div class="films-list__container">
      </div>
    </section>`
  );
};

class MostCommented extends _abstract_component_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
  getTemplate() {
    return createMostCommentedTemplate();
  }
}


/***/ }),

/***/ "./src/components/profile-button.js":
/*!******************************************!*\
  !*** ./src/components/profile-button.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ProfileButton; });
/* harmony import */ var _abstract_component_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./abstract-component.js */ "./src/components/abstract-component.js");


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

class ProfileButton extends _abstract_component_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
  constructor(watchedFilmCount) {
    super();

    this._watchedFilmCount = watchedFilmCount;
  }

  getTemplate() {
    return createProfileButtonTemplate(this._watchedFilmCount);
  }
}


/***/ }),

/***/ "./src/components/show-more-button.js":
/*!********************************************!*\
  !*** ./src/components/show-more-button.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ShowMoreButton; });
/* harmony import */ var _abstract_component_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./abstract-component.js */ "./src/components/abstract-component.js");


const createShowMoreButtonTemplate = () => {
  return (
    `<button class="films-list__show-more">Show more</button>`
  );
};

class ShowMoreButton extends _abstract_component_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
  getTemplate() {
    return createShowMoreButtonTemplate();
  }
}


/***/ }),

/***/ "./src/components/site-navigation.js":
/*!*******************************************!*\
  !*** ./src/components/site-navigation.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return SiteNavigation; });
/* harmony import */ var _abstract_component_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./abstract-component.js */ "./src/components/abstract-component.js");
/* harmony import */ var _const_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../const.js */ "./src/const.js");
/* harmony import */ var _mock_filters_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../mock/filters.js */ "./src/mock/filters.js");




const createNavigationFiltersMarkup = (filters) => {
  return filters.map((filter, index) => {
    return `<a href="${filter.link}" class="main-navigation__item ${index === 0 ? `main-navigation__item--active` : ``}">${filter.name} ${index > 0 ? `<span class="main-navigation__item-count">${filter.count}</span>` : ``}</a>`;
  }).join(`\n`);
};

const createSiteNavigationTemplate = () => {
  const filtersMarkup = createNavigationFiltersMarkup(Object(_mock_filters_js__WEBPACK_IMPORTED_MODULE_2__["generateNavigationFilters"])(_const_js__WEBPACK_IMPORTED_MODULE_1__["FILTERS"]));

  return (
    `<nav class="main-navigation">
      <div class="main-navigation__items">
        ${filtersMarkup}
      </div>
      <a href="#stats" class="main-navigation__additional">Stats</a>
    </nav>`
  );
};

class SiteNavigation extends _abstract_component_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
  getTemplate() {
    return createSiteNavigationTemplate();
  }
}


/***/ }),

/***/ "./src/components/sort.js":
/*!********************************!*\
  !*** ./src/components/sort.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Sort; });
/* harmony import */ var _abstract_component_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./abstract-component.js */ "./src/components/abstract-component.js");


const createSiteSortTemplate = () => {
  return (
    `<ul class="sort">
      <li><a href="#" class="sort__button sort__button--active">Sort by default</a></li>
      <li><a href="#" class="sort__button">Sort by date</a></li>
      <li><a href="#" class="sort__button">Sort by rating</a></li>
    </ul>`
  );
};

class Sort extends _abstract_component_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
  getTemplate() {
    return createSiteSortTemplate();
  }
}


/***/ }),

/***/ "./src/components/top-rate-films.js":
/*!******************************************!*\
  !*** ./src/components/top-rate-films.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return TopRate; });
/* harmony import */ var _abstract_component_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./abstract-component.js */ "./src/components/abstract-component.js");


const createTopRateTemplate = () => {
  return (
    `<section class="films-list--extra films-list--top">
      <h2 class="films-list__title">Top rated</h2>

      <div class="films-list__container">
      </div>
    </section>`
  );
};

class TopRate extends _abstract_component_js__WEBPACK_IMPORTED_MODULE_0__["default"] {
  getTemplate() {
    return createTopRateTemplate();
  }
}


/***/ }),

/***/ "./src/const.js":
/*!**********************!*\
  !*** ./src/const.js ***!
  \**********************/
/*! exports provided: FILTERS, FILMS, DESCRIPTIONS, GENRES, AGES, MONTH_NAMES, DIRECTORS, WRITERS, ACTORS, COUNTRIES, EMOTIONS, COMMENT_AUTHORS */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FILTERS", function() { return FILTERS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FILMS", function() { return FILMS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DESCRIPTIONS", function() { return DESCRIPTIONS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GENRES", function() { return GENRES; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AGES", function() { return AGES; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MONTH_NAMES", function() { return MONTH_NAMES; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DIRECTORS", function() { return DIRECTORS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WRITERS", function() { return WRITERS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ACTORS", function() { return ACTORS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "COUNTRIES", function() { return COUNTRIES; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "EMOTIONS", function() { return EMOTIONS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "COMMENT_AUTHORS", function() { return COMMENT_AUTHORS; });
const FILTERS = [{
  name: `All movies`,
  link: `#all`
}, {
  name: `Watchlist`,
  link: `#watchlist`
}, {
  name: `History`,
  link: `#history`
}, {
  name: `Favorites`,
  link: `#favorites`
}];

const FILMS = [{
  name: `Made for Each Other`,
  src: `made-for-each-other.png`
}, {
  name: `Popeye the Sailor Meets Sindbad the Sailor`,
  src: `popeye-meets-sinbad.png`
}, {
  name: `Sagebrush Trail`,
  src: `sagebrush-trail.jpg`
}, {
  name: `Santa Claus Conquers the Martians`,
  src: `santa-claus-conquers-the-martians.jpg`
}, {
  name: `The Dance of Life`,
  src: `the-dance-of-life.jpg`
}, {
  name: `The Great Flamarion`,
  src: `the-great-flamarion.jpg`
}, {
  name: `The Man with the Golden Arm`,
  src: `the-man-with-the-golden-arm.jpg`
}];

const DESCRIPTIONS = [
  `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
  `Cras aliquet varius magna, non porta ligula feugiat eget.`,
  `Fusce tristique felis at fermentum pharetra.`,
  `Aliquam id orci ut lectus varius viverra.`,
  `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.`,
  `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.`,
  `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.`,
  `Sed sed nisi sed augue convallis suscipit in sed felis.`,
  `Aliquam erat volutpat.`,
  `Nunc fermentum tortor ac porta dapibus.`,
  `In rutrum ac purus sit amet tempus.`
];

const GENRES = [
  `Musical`,
  `Western`,
  `Drama`,
  `Comedy`,
  `Cartoon`,
  `Mystery`,
  `Film-Noir`
];

const AGES = [0, 6, 12, 16, 18];

const MONTH_NAMES = [
  `January`,
  `February`,
  `March`,
  `April`,
  `May`,
  `June`,
  `July`,
  `August`,
  `September`,
  `October`,
  `November`,
  `December`,
];

const DIRECTORS = [
  `Anthony Mann`,
  `Steven Spielberg`,
  `Martin Scorsese`,
  `Ridley Scott`,
  `John Woo`,
  `Christopher Nolan`
];

const WRITERS = [
  `Anne Wigton`,
  `Heinz Herald`,
  `Richard Weil`,
  `Billy Wilder`,
  `Ethan Coen and Joel Coen`,
  `Robert Towne`,
  `Quentin Tarantino`
];

const ACTORS = [
  `Erich von Stroheim`,
  `Mary Beth Hughes`,
  `Dan Duryea`,
  `Robert De Niro`,
  `Jack Nicholson`,
  `Marlon Brando`,
  `Denzel Washington`
];

const COUNTRIES = [
  `USA`,
  `France`,
  `Germany`,
  `Italy`,
  `Russia`,
  `UK`,
  `China`
];

const EMOTIONS = [
  `angry.png`,
  `puke.png`,
  `sleeping.png`,
  `smile.png`
];

const COMMENT_AUTHORS = [
  `Tim Macoveev`,
  `John Doe`,
  `Bob Brown`,
  `Mike Smith`
];


/***/ }),

/***/ "./src/controllers/page-controller.js":
/*!********************************************!*\
  !*** ./src/controllers/page-controller.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return PageController; });
/* harmony import */ var _components_main_list_films_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../components/main-list-films.js */ "./src/components/main-list-films.js");
/* harmony import */ var _components_top_rate_films_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../components/top-rate-films.js */ "./src/components/top-rate-films.js");
/* harmony import */ var _components_most_commented_films_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../components/most-commented-films.js */ "./src/components/most-commented-films.js");
/* harmony import */ var _components_film_card_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../components/film-card.js */ "./src/components/film-card.js");
/* harmony import */ var _components_show_more_button_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../components/show-more-button.js */ "./src/components/show-more-button.js");
/* harmony import */ var _components_film_popup_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../components/film-popup.js */ "./src/components/film-popup.js");
/* harmony import */ var _utils_render_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../utils/render.js */ "./src/utils/render.js");








const CARD_COUNT_ON_START = 5;
const CARD_COUNT_ON_CLICK = 5;
const TOP_CARD_COUNT = 2;
const MOST_CARD_COUNT = 2;

const renderFilm = (filmsListElement, film) => {
  const escapeButtonHandler = (evt) => {
    evt.preventDefault();

    if (evt.key === `Esc` || evt.key === `Escape`) {
      Object(_utils_render_js__WEBPACK_IMPORTED_MODULE_6__["remove"])(filmPopupComponent);
      document.removeEventListener(`keydown`, escapeButtonHandler);
    }
  };

  const filmCardComponent = new _components_film_card_js__WEBPACK_IMPORTED_MODULE_3__["default"](film);
  const filmPopupComponent = new _components_film_popup_js__WEBPACK_IMPORTED_MODULE_5__["default"](film);

  filmCardComponent.setPosterClickhandler((evtPoster) => {
    evtPoster.preventDefault();

    filmPopupComponent.setCloseButtonClickHandler((evtCloseButton) => {
      evtCloseButton.preventDefault();
      Object(_utils_render_js__WEBPACK_IMPORTED_MODULE_6__["remove"])(filmPopupComponent);
    });
    Object(_utils_render_js__WEBPACK_IMPORTED_MODULE_6__["render"])(document.body, filmPopupComponent);
    document.addEventListener(`keydown`, escapeButtonHandler);
  });

  Object(_utils_render_js__WEBPACK_IMPORTED_MODULE_6__["render"])(filmsListElement, filmCardComponent);
};

class PageController {
  constructor(container) {
    this._container = container;

    this._mainListFilmsComponent = new _components_main_list_films_js__WEBPACK_IMPORTED_MODULE_0__["default"]();
    this._topRateFilmsComponent = new _components_top_rate_films_js__WEBPACK_IMPORTED_MODULE_1__["default"]();
    this._mostCommentedFilmsComponent = new _components_most_commented_films_js__WEBPACK_IMPORTED_MODULE_2__["default"]();
    this._showMoreButtonComponent = new _components_show_more_button_js__WEBPACK_IMPORTED_MODULE_4__["default"]();
  }

  render(films) {
    const container = this._container.getElement();

    if (!films.length) {
      Object(_utils_render_js__WEBPACK_IMPORTED_MODULE_6__["render"])(container, new _components_main_list_films_js__WEBPACK_IMPORTED_MODULE_0__["default"](false));

      return;
    }

    const mainListFilmsComponent = new _components_main_list_films_js__WEBPACK_IMPORTED_MODULE_0__["default"]();
    Object(_utils_render_js__WEBPACK_IMPORTED_MODULE_6__["render"])(container, mainListFilmsComponent);

    const mainListFilmsContainerElement = mainListFilmsComponent.getElement().querySelector(`.films-list__container`);

    let filmToShowIndex = CARD_COUNT_ON_START;

    films.slice(0, filmToShowIndex).forEach((it) => renderFilm(mainListFilmsContainerElement, it));

    let shownFilmsCount = filmToShowIndex;

    const showMoreButtonComponent = new _components_show_more_button_js__WEBPACK_IMPORTED_MODULE_4__["default"]();

    Object(_utils_render_js__WEBPACK_IMPORTED_MODULE_6__["render"])(container, showMoreButtonComponent);

    showMoreButtonComponent.getElement().addEventListener(`click`, (evt) => {
      evt.preventDefault();

      filmToShowIndex = shownFilmsCount + CARD_COUNT_ON_CLICK;

      films.slice(shownFilmsCount, filmToShowIndex).forEach((it) => renderFilm(mainListFilmsContainerElement, it));

      shownFilmsCount = filmToShowIndex;

      if (shownFilmsCount >= films.length) {
        showMoreButtonComponent.getElement().remove();
      }
    });

    const topRateFilmsComponent = new _components_top_rate_films_js__WEBPACK_IMPORTED_MODULE_1__["default"]();
    Object(_utils_render_js__WEBPACK_IMPORTED_MODULE_6__["render"])(container, topRateFilmsComponent);

    const topRateContainerElement = topRateFilmsComponent.getElement().querySelector(`.films-list__container`);

    films.slice().sort((a, b) => b.rating - a.rating).slice(0, TOP_CARD_COUNT).forEach((it) => renderFilm(topRateContainerElement, it));

    const mostCommentedFilmsComponent = new _components_most_commented_films_js__WEBPACK_IMPORTED_MODULE_2__["default"]();
    Object(_utils_render_js__WEBPACK_IMPORTED_MODULE_6__["render"])(container, mostCommentedFilmsComponent);

    const mostCommentedContainerElement = mostCommentedFilmsComponent.getElement().querySelector(`.films-list__container`);

    films.slice().sort((a, b) => b.comments.length - a.comments.length).slice(0, MOST_CARD_COUNT).forEach((it) => renderFilm(mostCommentedContainerElement, it));
  }
}


/***/ }),

/***/ "./src/main.js":
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _components_profile_button_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/profile-button.js */ "./src/components/profile-button.js");
/* harmony import */ var _components_site_navigation_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/site-navigation.js */ "./src/components/site-navigation.js");
/* harmony import */ var _components_sort_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/sort.js */ "./src/components/sort.js");
/* harmony import */ var _components_content_board_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/content-board.js */ "./src/components/content-board.js");
/* harmony import */ var _controllers_page_controller_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./controllers/page-controller.js */ "./src/controllers/page-controller.js");
/* harmony import */ var _mock_user_rank_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./mock/user-rank.js */ "./src/mock/user-rank.js");
/* harmony import */ var _mock_films_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./mock/films.js */ "./src/mock/films.js");
/* harmony import */ var _utils_render_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./utils/render.js */ "./src/utils/render.js");









const MAIN_CARD_COUNT = 22;

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);

Object(_utils_render_js__WEBPACK_IMPORTED_MODULE_7__["render"])(siteHeaderElement, new _components_profile_button_js__WEBPACK_IMPORTED_MODULE_0__["default"](Object(_mock_user_rank_js__WEBPACK_IMPORTED_MODULE_5__["generateUserRank"])()));
Object(_utils_render_js__WEBPACK_IMPORTED_MODULE_7__["render"])(siteMainElement, new _components_site_navigation_js__WEBPACK_IMPORTED_MODULE_1__["default"]());
Object(_utils_render_js__WEBPACK_IMPORTED_MODULE_7__["render"])(siteMainElement, new _components_sort_js__WEBPACK_IMPORTED_MODULE_2__["default"]());

const films = Object(_mock_films_js__WEBPACK_IMPORTED_MODULE_6__["generateFilmCards"])(MAIN_CARD_COUNT);

const boardComponent = new _components_content_board_js__WEBPACK_IMPORTED_MODULE_3__["default"]();
const pageController = new _controllers_page_controller_js__WEBPACK_IMPORTED_MODULE_4__["default"](boardComponent);

Object(_utils_render_js__WEBPACK_IMPORTED_MODULE_7__["render"])(siteMainElement, boardComponent);
pageController.render(films);


/***/ }),

/***/ "./src/mock/films.js":
/*!***************************!*\
  !*** ./src/mock/films.js ***!
  \***************************/
/*! exports provided: generateFilmCard, generateFilmCards */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "generateFilmCard", function() { return generateFilmCard; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "generateFilmCards", function() { return generateFilmCards; });
/* harmony import */ var _utils_common_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/common.js */ "./src/utils/common.js");
/* harmony import */ var _const_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../const.js */ "./src/const.js");



const generateComments = (count) => {
  return new Array(count).fill(``).map(() => {
    return {
      text: Object(_utils_common_js__WEBPACK_IMPORTED_MODULE_0__["getRandomElementFromArray"])(_const_js__WEBPACK_IMPORTED_MODULE_1__["DESCRIPTIONS"]),
      emotion: Object(_utils_common_js__WEBPACK_IMPORTED_MODULE_0__["getRandomElementFromArray"])(_const_js__WEBPACK_IMPORTED_MODULE_1__["EMOTIONS"]),
      author: Object(_utils_common_js__WEBPACK_IMPORTED_MODULE_0__["getRandomElementFromArray"])(_const_js__WEBPACK_IMPORTED_MODULE_1__["COMMENT_AUTHORS"]),
      date: Object(_utils_common_js__WEBPACK_IMPORTED_MODULE_0__["getRandomDate"])()
    };
  });
};

const generateFilmCard = () => {
  const film = Object(_utils_common_js__WEBPACK_IMPORTED_MODULE_0__["getRandomElementFromArray"])(_const_js__WEBPACK_IMPORTED_MODULE_1__["FILMS"]);

  return {
    name: film.name,
    src: film.src,
    rating: Object(_utils_common_js__WEBPACK_IMPORTED_MODULE_0__["getRandomNumber"])(0, 10, true).toFixed(1),
    release: {
      date: Object(_utils_common_js__WEBPACK_IMPORTED_MODULE_0__["getRandomNumber"])(1, 30),
      month: Object(_utils_common_js__WEBPACK_IMPORTED_MODULE_0__["getRandomElementFromArray"])(_const_js__WEBPACK_IMPORTED_MODULE_1__["MONTH_NAMES"]),
      year: Object(_utils_common_js__WEBPACK_IMPORTED_MODULE_0__["getRandomNumber"])(1900, 2020)
    },
    duration: Object(_utils_common_js__WEBPACK_IMPORTED_MODULE_0__["getRandomNumber"])(25, 150),
    genres: Object(_utils_common_js__WEBPACK_IMPORTED_MODULE_0__["getRandomCountOfElementsFromArray"])(_const_js__WEBPACK_IMPORTED_MODULE_1__["GENRES"], Object(_utils_common_js__WEBPACK_IMPORTED_MODULE_0__["getRandomNumber"])(1, 3)),
    description: Object(_utils_common_js__WEBPACK_IMPORTED_MODULE_0__["getRandomCountOfElementsFromArray"])(_const_js__WEBPACK_IMPORTED_MODULE_1__["DESCRIPTIONS"], Object(_utils_common_js__WEBPACK_IMPORTED_MODULE_0__["getRandomNumber"])(1, 5)).join(` `),
    comments: generateComments(Object(_utils_common_js__WEBPACK_IMPORTED_MODULE_0__["getRandomNumber"])(0, 5)),
    age: Object(_utils_common_js__WEBPACK_IMPORTED_MODULE_0__["getRandomElementFromArray"])(_const_js__WEBPACK_IMPORTED_MODULE_1__["AGES"]),
    director: Object(_utils_common_js__WEBPACK_IMPORTED_MODULE_0__["getRandomElementFromArray"])(_const_js__WEBPACK_IMPORTED_MODULE_1__["DIRECTORS"]),
    writers: Object(_utils_common_js__WEBPACK_IMPORTED_MODULE_0__["getRandomCountOfElementsFromArray"])(_const_js__WEBPACK_IMPORTED_MODULE_1__["WRITERS"], 3),
    actors: Object(_utils_common_js__WEBPACK_IMPORTED_MODULE_0__["getRandomCountOfElementsFromArray"])(_const_js__WEBPACK_IMPORTED_MODULE_1__["ACTORS"], 3),
    country: Object(_utils_common_js__WEBPACK_IMPORTED_MODULE_0__["getRandomElementFromArray"])(_const_js__WEBPACK_IMPORTED_MODULE_1__["COUNTRIES"]),
  };
};

const generateFilmCards = (count) => {
  return new Array(count).fill(``).map(generateFilmCard);
};


/***/ }),

/***/ "./src/mock/filters.js":
/*!*****************************!*\
  !*** ./src/mock/filters.js ***!
  \*****************************/
/*! exports provided: generateNavigationFilters */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "generateNavigationFilters", function() { return generateNavigationFilters; });
/* harmony import */ var _utils_common_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/common.js */ "./src/utils/common.js");


const generateNavigationFilters = (filters) => {
  return filters.map((it) => {
    return {
      name: it.name,
      link: it.link,
      count: Object(_utils_common_js__WEBPACK_IMPORTED_MODULE_0__["getRandomNumber"])(0, 20)
    };
  });
};


/***/ }),

/***/ "./src/mock/user-rank.js":
/*!*******************************!*\
  !*** ./src/mock/user-rank.js ***!
  \*******************************/
/*! exports provided: generateUserRank */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "generateUserRank", function() { return generateUserRank; });
/* harmony import */ var _utils_common_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/common.js */ "./src/utils/common.js");


const generateUserRank = () => Object(_utils_common_js__WEBPACK_IMPORTED_MODULE_0__["getRandomNumber"])(0, 30);


/***/ }),

/***/ "./src/utils/common.js":
/*!*****************************!*\
  !*** ./src/utils/common.js ***!
  \*****************************/
/*! exports provided: getRandomCountOfElementsFromArray, formatDuration, getRandomNumber, getRandomElementFromArray, getRandomDate, formatDate, createElement, render */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getRandomCountOfElementsFromArray", function() { return getRandomCountOfElementsFromArray; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "formatDuration", function() { return formatDuration; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getRandomNumber", function() { return getRandomNumber; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getRandomElementFromArray", function() { return getRandomElementFromArray; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getRandomDate", function() { return getRandomDate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "formatDate", function() { return formatDate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createElement", function() { return createElement; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
const getRandomCountOfElementsFromArray = (array, count) => {
  const arrayCopy = array.slice();
  let resultArray = [];

  for (let i = 0; i < count; i++) {
    resultArray.push(...arrayCopy.splice(getRandomNumber(0, arrayCopy.length - 1), 1));
  }

  return resultArray;
};

const formatDuration = (duration) => {
  let hours = Math.floor(duration / 60);
  let minutes = duration % 60;

  hours = hours ? `${hours}h` : ``;
  minutes = minutes ? `${minutes}m` : ``;

  return `${hours} ${minutes}`;
};

const getRandomNumber = (min, max, isReal = false) => {
  let random = Math.random() * (max + 1 - min);
  if (!isReal) {
    random = Math.floor(random);
  }

  const result = min + random;

  return result > max ? max : result;
};

const getRandomElementFromArray = (array) => {
  return array[getRandomNumber(0, array.length - 1)];
};

const getRandomDate = () => {
  const targetDate = new Date();

  targetDate.setDate(targetDate.getDate() - getRandomNumber(0, 700));
  targetDate.setHours(getRandomNumber(0, 23));
  targetDate.setMinutes(getRandomNumber(0, 59));

  return targetDate;
};

const formatDate = (date) => {
  const hours = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours();
  const minutes = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();

  return `${date.getFullYear()}/${date.getMonth()}/${date.getDate()} ${hours}:${minutes}`;
};

const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;

  return newElement.firstChild;
};

const render = (container, element, position = `beforeend`) => {
  switch (position) {
    case `afterend`:
      container.after(element);
      break;

    case `beforeend`:
      container.append(element);
      break;

    case `afterbegin`:
      container.prepend(element);
      break;

    default:
      throw new Error(`Only 'afterend', 'beforeend' or 'afterbegin'.`);
  }
};


/***/ }),

/***/ "./src/utils/render.js":
/*!*****************************!*\
  !*** ./src/utils/render.js ***!
  \*****************************/
/*! exports provided: render, remove */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "remove", function() { return remove; });
const render = (container, component, position = `beforeend`) => {
  switch (position) {
    case `afterend`:
      container.after(component.getElement());
      break;

    case `beforeend`:
      container.append(component.getElement());
      break;

    case `afterbegin`:
      container.prepend(component.getElement());
      break;

    default:
      throw new Error(`Only 'afterend', 'beforeend' or 'afterbegin'.`);
  }
};

const remove = (component) => {
  component.getElement().remove();
  component.removeElement();
};


/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map