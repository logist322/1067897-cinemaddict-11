import {getRandomNumber, getRandomElementFromArray, getRandomCountOfElementsFromArray, getRandomDate} from '../utils/common.js';
import {GENRES, FILMS, DESCRIPTIONS, AGES, DIRECTORS, WRITERS, ACTORS, COUNTRIES, EMOTIONS, COMMENT_AUTHORS} from '../const.js';

const generateComments = (count) => {
  return new Array(count).fill(``).map(() => {
    return {
      id: String(new Date() + Math.random()),
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
    id: String(new Date() + Math.random()),
    name: film.name,
    src: film.src,
    rating: getRandomNumber(0, 10, true).toFixed(1),
    release: getRandomDate(),
    duration: getRandomNumber(25, 150),
    genres: getRandomCountOfElementsFromArray(GENRES, getRandomNumber(1, 3)),
    description: getRandomCountOfElementsFromArray(DESCRIPTIONS, getRandomNumber(1, 5)).join(` `),
    comments: generateComments(getRandomNumber(0, 5)),
    age: getRandomElementFromArray(AGES),
    director: getRandomElementFromArray(DIRECTORS),
    writers: getRandomCountOfElementsFromArray(WRITERS, 3),
    actors: getRandomCountOfElementsFromArray(ACTORS, 3),
    country: getRandomElementFromArray(COUNTRIES),
    controls: {
      isInWatchlist: Math.random() > 0.5,
      isWatched: Math.random() > 0.5,
      isFavorite: Math.random() > 0.5,
    }
  };
};

export const generateFilmCards = (count) => {
  return new Array(count).fill(``).map(generateFilmCard);
};
