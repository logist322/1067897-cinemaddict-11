import AbstractComponent from './abstract-component.js';

const createSiteContentTemplate = () => {
  return (
    `<section class="films">
    </section>`
  );
};

export default class ContentBoard extends AbstractComponent {
  getTemplate() {
    return createSiteContentTemplate();
  }
}
