import moment from 'moment';

export const getRandomCountOfElementsFromArray = (array, count) => {
  const arrayCopy = array.slice();
  const result = [];

  for (let i = 0; i < count; i++) {
    result.push(...arrayCopy.splice(getRandomNumber(0, arrayCopy.length - 1), 1));
  }

  return result;
};

export const formatDuration = (duration) => {
  const hours = moment.duration(duration, `minutes`).hours();
  const minutes = moment.duration(duration, `minutes`).minutes();

  return `${hours ? `${hours}h` : ``} ${minutes}m`;
};

export const getRandomNumber = (min, max, isReal = false) => {
  let random = Math.random() * (max + 1 - min);
  if (!isReal) {
    random = Math.floor(random);
  }

  const result = min + random;

  return result > max ? max : result;
};

export const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;

  return newElement.firstChild;
};
