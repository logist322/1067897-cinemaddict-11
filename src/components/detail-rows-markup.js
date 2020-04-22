const createDetailRowsMarkup = (details) => {
  return details.map((it) => {
    return (
      `<tr class="film-details__row">
        <td class="film-details__term">${it[0]}</td>
        <td class="film-details__cell">${it[1]}</td>
      </tr>`
    );
  }).join(`\n`);
};

export default createDetailRowsMarkup;
