// contain all the path
exports.time = (req, res) => {
  res.json({ time: Date().toString() });
};
