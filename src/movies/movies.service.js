const knex = require("../db/connection");

function list() {
  return knex("movies").select("*");
}

function listShowing() {
  return knex("movies")
  .distinct("movies.movie_id", "movies.*") // Add distinct here
  .join("movies_theaters as mt", "movies.movie_id", "mt.movie_id")
  .where("mt.is_showing", true);
}

function read(movie_id) {
  return knex("movies as m")
    .select("m.*")
    .where({ "m.movie_id": movie_id })
    .first()
  }

function listTheaters(movie_id) {
  return knex("movies")
  .join("movies_theaters as mt", "movies.movie_id", "mt.movie_id")
  .join("theaters as t", "mt.theater_id", "t.theater_id")
  .select("t.*")
  .where("movies.movie_id", movie_id);
}

function listReviews(movie_id) {
  return knex("movies")
    .join("reviews as r", "movies.movie_id", "r.movie_id")
    .join("critics as c", "r.critic_id", "c.critic_id")
    .select("r.*", "c.preferred_name", "c.surname", "c.organization_name")
    .where("movies.movie_id", movie_id)
    .then(reviews => reviews.map(review => {
      return {
        ...review,
        critic: {
          critic_id: review.critic_id,
          preferred_name: review.preferred_name,
          surname: review.surname,
          organization_name: review.organization_name,
        }
      };
    }));
}



module.exports = {
  list,
  listShowing,
  listReviews,
  listTheaters,
  read,
};