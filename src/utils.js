export const getRandomCountOfElementsFromArray = (array, count) => {
  const arrayCopy = array.slice();
  let resultArray = [];

  for (let i = 0; i < count; i++) {
    resultArray.push(...arrayCopy.splice(getRandomNumber(0, arrayCopy.length - 1), 1));
  }

  return resultArray;
};

export const formatDuration = (duration) => {
  let hours = Math.floor(duration / 60);
  let minutes = duration % 60;

  hours = hours ? `${hours}h` : ``;
  minutes = minutes ? `${minutes}m` : ``;

  return `${hours} ${minutes}`;
};

export const getRandomNumber = (min, max, isReal = false) => {
  let random = Math.random() * (max + 1 - min);
  if (!isReal) {
    random = Math.floor(random);
  }

  const result = min + random;

  return result > max ? max : result;
};

export const getRandomElementFromArray = (array) => {
  return array[getRandomNumber(0, array.length - 1)];
};

export const getRandomDate = () => {
  const targetDate = new Date();

  targetDate.setDate(targetDate.getDate() - getRandomNumber(0, 700));
  targetDate.setHours(getRandomNumber(0, 23));
  targetDate.setMinutes(getRandomNumber(0, 59));

  return targetDate;
};

export const formatDate = (date) => {
  const hours = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours();
  const minutes = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();

  return `${date.getFullYear()}/${date.getMonth()}/${date.getDate()} ${hours}:${minutes}`;
};

export const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;

  return newElement.firstChild;
};

export const render = (container, element, position = `beforeend`) => {
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
      throw new Error(`Only 'afterend', 'beforeend' or 'afterbegin'`);
  }
};
