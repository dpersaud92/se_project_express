/* eslint-disable no-unused-vars */

export default function errorHandler(err, req, res, next) {
  const { statusCode = 500, message } = err;

  res.status(statusCode).send({
    message: statusCode === 500 ? "An error occurred on the server" : message,
  });
}
