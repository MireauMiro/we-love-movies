if (process.env.USER) require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();

app.use(express.json());

const theatersRouter = require("./theaters/theaters.router");
const moviesRouter = require("./movies/movies.router");
const criticsRouter = require("./critics/critics.router");
const reviewsRouter = require("./reviews/reviews.router");

app.use(cors());
app.use("/theaters", theatersRouter);
app.use("/movies", moviesRouter);
app.use("/critics", criticsRouter);
app.use("/reviews", reviewsRouter);

// Not found handler
app.use((req, res, next) => {
    next({ status: 404, message: `Not found: ${req.originalUrl}` });
});
  
// Error handler
app.use((error, req, res, next) => {
    console.error(error);
    const { status = 500, message = "Something went wrong!" } = error;
    res.status(status).json({ error: message });
});

module.exports = app;
