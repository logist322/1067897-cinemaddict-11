export default class Film {
  constructor(data) {
    this.id = data[`id`];

    this.name = data[`film_info`][`title`];
    this.altName = data[`film_info`][`alternative_title`];
    this.src = data[`film_info`][`poster`];
    this.rating = data[`film_info`][`total_rating`];
    this.release = new Date(data[`film_info`][`release`][`date`]);
    this.duration = data[`film_info`][`runtime`];
    this.genres = data[`film_info`][`genre`];
    this.description = data[`film_info`][`description`];
    this.comments = data[`comments`];
    this.age = data[`film_info`][`age_rating`];
    this.director = data[`film_info`][`director`];
    this.writers = data[`film_info`][`writers`];
    this.actors = data[`film_info`][`actors`];
    this.country = data[`film_info`][`release`][`release_country`];

    this.controls = {
      isInWatchlist: data[`user_details`][`watchlist`],
      isWatched: data[`user_details`][`already_watched`],
      isFavorite: data[`user_details`][`favorite`],
    };
    this.watchingDate = new Date(data[`user_details`][`watching_date`]);
  }

  toRAW() {
    return {
      "id": this.id,
      "comments": this.comments.map((comment) => {
        if (comment instanceof Object) {
          return comment.id;
        }

        return comment;
      }),
      "film_info": {
        "title": this.name,
        "alternative_title": this.altName,
        "total_rating": this.rating,
        "poster": this.src,
        "age_rating": this.age,
        "director": this.director,
        "writers": this.writers,
        "actors": this.actors,
        "release": {
          "date": this.release,
          "release_country": this.country
        },
        "runtime": this.duration,
        "genre": this.genres,
        "description": this.description
      },
      "user_details": {
        "watchlist": this.controls.isInWatchlist,
        "already_watched": this.controls.isWatched,
        "watching_date": this.watchingDate,
        "favorite": this.controls.isFavorite
      }
    };
  }

  static parseFilm(data) {
    return new Film(data);
  }

  static parseFilms(data) {
    return data.map(Film.parseFilm);
  }

  static clone(data) {
    return new Film(data.toRAW());
  }
}
