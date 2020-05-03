export const render = (container, component, position = `beforeend`) => {
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

export const remove = (component) => {
  component.getElement().remove();
  component.removeElement();
};
