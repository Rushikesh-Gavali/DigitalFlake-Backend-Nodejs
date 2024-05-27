
const responseFormatter = (req, res, next) => {
    res.formatResponse = (statusCode, message, data = null) => {
      res.status(statusCode).json({
        responseCode: statusCode,
        responseMessage: message,
        data: data,
      });
    };
    next();
  };
  
  module.exports = responseFormatter;
  