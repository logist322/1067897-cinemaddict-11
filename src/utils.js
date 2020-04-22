export const getRandomCountOfElementsFromArray = (array, count) => {
  let arrayCopy = array.slice();
  let resultArray = [];

  for (let i = 0; i < count; i++) {
    resultArray = resultArray.concat(arrayCopy.splice(getRandomNumber(0, arrayCopy.length - 1), 1));
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
