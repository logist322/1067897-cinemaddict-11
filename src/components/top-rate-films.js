import AbstractComponent from './abstract-component.js';

const createTopRateTemplate = () => {
  return (
    `<section class="films-list--extra films-list--top">
      <h2 class="films-list__title">Top rated movies</h2>

      <div class="films-list__container">
      </div>
    </section>`
  );
};

export default class TopRate extends AbstractComponent {
  getTemplate() {
    return createTopRateTemplate();
  }
}
