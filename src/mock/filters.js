import {getRandomNumber} from '../utils/common.js';

export const generateNavigationFilters = (filters) => {
  return filters.map((it) => {
    return {
      name: it.name,
      link: it.link,
      count: getRandomNumber(0, 20)
    };
  });
};
