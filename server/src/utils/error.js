export const errorHandler = (req, res, next, err) => {
  console.log(err);
  res
    .status(err.status || 500)
    .json({ message: err.message || "Server Error Arised" });
};