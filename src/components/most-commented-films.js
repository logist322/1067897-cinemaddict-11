import AbstractComponent from './abstract-component.js';

const createMostCommentedTemplate = () => {
  return (
    `<section class="films-list--extra films-list--most">
      <h2 class="films-list__title">Most commented</h2>

      <div class="films-list__container">
      </div>
    </section>`
  );
};

export default class MostCommented extends AbstractComponent {
  getTemplate() {
    return createMostCommentedTemplate();
  }
}
