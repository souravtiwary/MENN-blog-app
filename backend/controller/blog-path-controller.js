// contain all the path-functionality
// exported to ../routes/blog.js
exports.time = (req, res) => {
  res.json({ time: Date().toString() });
};
