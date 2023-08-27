const moviesService = require("./movies.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function movieExists(req, res, next) {
  const movie = await moviesService.read(req.params.movieId);
  if (movie) {
    res.locals.movie = movie;
    return next();
  }
  next({ status: 404, message: `Movie cannot be found.` });
}

function read(req, res) {
  const { movie: data } = res.locals;
  res.json({ data });
}

async function list(req, res) {
  const { is_showing } = req.query;
  let data;

  if (is_showing === 'true') {
    // Perform logic to get only showing movies
    data = await moviesService.listShowing();
  } else {
    // Perform general list logic
    data = await moviesService.list();
  }

  res.json({ data });
}

async function listTheaters(req, res) {
  const { movieId } = req.params;  // Get the movieId from params
  const data = await moviesService.listTheaters(movieId);  // Pass movieId to the service
  res.json({ data });
}

async function listReviews(req, res) {
  const { movieId } = req.params; 
  const data = await moviesService.listReviews(movieId);  // Pass movieId to the service
  res.json({ data });
}

module.exports = {
  read: [asyncErrorBoundary(movieExists), read],
  list: asyncErrorBoundary(list),
  listTheaters: asyncErrorBoundary(listTheaters),
  listReviews: asyncErrorBoundary(listReviews),
};
