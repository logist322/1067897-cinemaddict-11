import moment from 'moment';

// once
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

// once
export const getRandomElementFromArray = (array) => {
  return array[getRandomNumber(0, array.length - 1)];
};

// once
export const getRandomDate = (isSettingBigYearRange = false) => {
  const targetDate = new Date();

  if (isSettingBigYearRange) {
    targetDate.setFullYear(targetDate.getFullYear() - getRandomNumber(0, 70));
  }

  targetDate.setDate(targetDate.getDate() - getRandomNumber(0, 30));
  targetDate.setHours(getRandomNumber(0, 23));
  targetDate.setMinutes(getRandomNumber(0, 59));

  return targetDate;
};

export const formatDate = (date) => {
  return moment(date).format(`YYYY/M/D HH:mm`);
};

export const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;

  return newElement.firstChild;
};
