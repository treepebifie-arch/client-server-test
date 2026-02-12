// middleware/successHandler.js

const responseHandler = (req, res, next) => {
  res.success = (data, message = 'success', statusCode = 200) => {
    return res.status(statusCode).json({
      status: 'success',
      message,
      data,
    });
  };
  next();
};

export default responseHandler;