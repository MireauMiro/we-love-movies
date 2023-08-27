const knex = require("../db/connection");
const mapProperties = require("../utils/map-properties");

const addMovies = mapProperties({
  movie_id: "movies.movie_id",
  title: "movies.title",
});

function list() {
  return knex("theaters")
    .join("movies_theaters", "theaters.theater_id", "movies_theaters.theater_id")
    .join("movies", "movies.movie_id", "movies_theaters.movie_id")
    .select(
      "theaters.*",
      "movies.movie_id",
      "movies.title",
      "movies.runtime_in_minutes",
      "movies.rating",
      "movies_theaters.is_showing"
    )
    .then((rows) => {
      const theaters = {};

      rows.forEach((row) => {
        if (!theaters[row.theater_id]) {
          theaters[row.theater_id] = {
            theater_id: row.theater_id,
            name: row.name,
            address_line_1: row.address_line_1,
            address_line_2: row.address_line_2,
            city: row.city,
            state: row.state,
            zip: row.zip,
            movies: []
          };
        }

        if (row.is_showing) {
          theaters[row.theater_id].movies.push({
            movie_id: row.movie_id,
            title: row.title,
            runtime_in_minutes: row.runtime_in_minutes,
            rating: row.rating
          });
        }
      });

      return Object.values(theaters);
    });
}

module.exports = {
  list,
};