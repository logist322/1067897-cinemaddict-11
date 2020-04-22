import {getRandomNumber, getRandomElementFromArray, getRandomCountOfElementsFromArray} from '../utils.js';
import {GENRES, FILMS, DESCRIPTIONS, AGES, MONTH_NAMES, DIRECTORS, WRITERS, ACTORS, COUNTRIES} from '../const.js';

const generateComments = (count) => {
  return new Array(count).fill(``).map(() => {
    return {
      text: getRandomElementFromArray(DESCRIPTIONS),
      emotion: `emotion`,
      author: `author`,
      date: `date`
    };
  });
};

export const generateFilmCard = () => {
  const film = getRandomElementFromArray(FILMS);

  return {
    name: film.name,
    src: film.src,
    rating: getRandomNumber(0, 10, true).toFixed(1),
    release: {
      date: getRandomNumber(1, 30),
      month: getRandomElementFromArray(MONTH_NAMES),
      year: getRandomNumber(1900, 2020)
    },
    duration: getRandomNumber(25, 150),
    genres: getRandomCountOfElementsFromArray(GENRES, getRandomNumber(1, 3)),
    description: getRandomCountOfElementsFromArray(DESCRIPTIONS, getRandomNumber(1, 5)).join(` `),
    comments: generateComments(getRandomNumber(0, 10)),
    age: getRandomElementFromArray(AGES),
    director: getRandomElementFromArray(DIRECTORS),
    writers: getRandomCountOfElementsFromArray(WRITERS, 3),
    actors: getRandomCountOfElementsFromArray(ACTORS, 3),
    country: getRandomElementFromArray(COUNTRIES),
  };
};

export const generateFilmCards = (count) => {
  return new Array(count).fill(``).map(generateFilmCard);
};
