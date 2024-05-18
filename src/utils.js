function paginatedResults(model) {
  return (req, res, next) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const completed = req.query.completed;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const results = {};

    results.total = {
      page: Math.ceil(model.length / limit),
    };

    if (endIndex < model.length) {
      results.next = {
        page: page + 1,
        limit,
      };
    }

    if (startIndex > 0) {
      results.previous = {
        page: page - 1,
        limit,
      };
    }

    // Apply filter if 'completed' query parameter is present
    if (completed !== undefined) {
      const completedBool = completed === "true";
      model = model.filter((task) => task.completed === completedBool);
    }

    results.results = model.slice(startIndex, endIndex);

    res.paginatedResults = results;
    next();
  };
}

module.exports = paginatedResults;
