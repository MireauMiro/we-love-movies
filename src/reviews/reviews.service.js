const knex = require("../db/connection");

function list() {
  return knex("reviews").select("*");
}

function read(review_id) {
  return knex("reviews as r")
    .select("r.*")
    .where({ "r.review_id": review_id })
    .first()
}

function update(updatedReview) {
  return knex("reviews")
    .where({ review_id: updatedReview.review_id })
    .update(updatedReview, "*")
    .then((updatedRecords) => {
      return knex("reviews")
        .join("critics", "reviews.critic_id", "critics.critic_id")
        .select(
          "reviews.*",
          "critics.preferred_name",
          "critics.surname",
          "critics.organization_name"
        )
        .where({ "reviews.review_id": updatedReview.review_id })
        .first()
        .then((result) => {
          const { preferred_name, surname, organization_name, ...reviewFields } = result;
          return {
            ...reviewFields,
            critic: {
              preferred_name,
              surname,
              organization_name
            }
          };
        });
    });
}
function destroy(review_id) {
  return knex("reviews").where({ review_id }).del();
}

module.exports = {
  list,
  read,
  update,
  delete: destroy,
};

