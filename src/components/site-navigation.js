import AbstractComponent from './abstract-component.js';

const createSiteNavigationTemplate = () => {
  return (
    `<nav class="main-navigation">
      <a href="#stats" class="main-navigation__additional">Stats</a>
    </nav>`
  );
};

export default class SiteNavigation extends AbstractComponent {
  getTemplate() {
    return createSiteNavigationTemplate();
  }
}
