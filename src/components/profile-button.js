const createProfileButtonTemplate = (watchedFilmCount) => {
  let rank;

  switch (true) {
    case watchedFilmCount === 0:
      rank = ``;
      break;

    case watchedFilmCount >= 1 && watchedFilmCount <= 10:
      rank = `novice`;
      break;

    case watchedFilmCount >= 11 && watchedFilmCount <= 20:
      rank = `fan`;
      break;

    default:
      rank = `movie buff`;
  }

  return (
    `<section class="header__profile profile">
      <p class="profile__rating">${rank}</p>
      <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
    </section>`
  );
};

export default createProfileButtonTemplate;
