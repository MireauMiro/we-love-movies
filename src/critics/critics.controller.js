const criticsService = require("./critics.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function list(req, res) {
  const data = await criticsService.list();
  res.json({ data });
}

module.exports = {
  list: asyncErrorBoundary(list),
};
