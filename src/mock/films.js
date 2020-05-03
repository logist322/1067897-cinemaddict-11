import {getRandomNumber, getRandomElementFromArray, getRandomCountOfElementsFromArray, getRandomDate} from '../utils/common.js';
import {GENRES, FILMS, DESCRIPTIONS, AGES, MONTH_NAMES, DIRECTORS, WRITERS, ACTORS, COUNTRIES, EMOTIONS, COMMENT_AUTHORS} from '../const.js';

const generateComments = (count) => {
  return new Array(count).fill(``).map(() => {
    return {
      text: getRandomElementFromArray(DESCRIPTIONS),
      emotion: getRandomElementFromArray(EMOTIONS),
      author: getRandomElementFromArray(COMMENT_AUTHORS),
      date: getRandomDate()
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
    comments: generateComments(getRandomNumber(0, 5)),
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
