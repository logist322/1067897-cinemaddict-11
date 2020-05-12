import {getRandomNumber} from '../utils/common.js';
import {FilterType} from '../const.js';

export const generateNavigationFilters = (filters) => {
  return filters.map((it, i) => {
    return {
      name: it,
      link: Object.values(FilterType)[i],
      count: getRandomNumber(0, 20)
    };
  });
};
