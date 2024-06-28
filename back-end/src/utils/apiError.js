module.exports = class ApiError extends Error {
  constructor(statusCode, message, data) {
    super(message);
    this.statusCode = statusCode;
    this.data = data;
    this.message = message;
  }
};
