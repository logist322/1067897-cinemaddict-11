import {createElement} from '../utils.js';
import {FILTERS} from '../const.js';
import {generateNavigationFilters} from '../mock/filters.js';

const createNavigationFiltersMarkup = (filters) => {
  return filters.map((filter, index) => {
    return `<a href="${filter.link}" class="main-navigation__item ${index === 0 ? `main-navigation__item--active` : ``}">${filter.name} ${index > 0 ? `<span class="main-navigation__item-count">${filter.count}</span>` : ``}</a>`;
  }).join(`\n`);
};

const createSiteNavigationTemplate = () => {
  const filtersMarkup = createNavigationFiltersMarkup(generateNavigationFilters(FILTERS));

  return (
    `<nav class="main-navigation">
      <div class="main-navigation__items">
        ${filtersMarkup}
      </div>
      <a href="#stats" class="main-navigation__additional">Stats</a>
    </nav>`
  );
};

export default class SiteNavigation {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createSiteNavigationTemplate();
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
