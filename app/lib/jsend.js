'use strict';

/**
 * The main function, formatJSend, checks the body of the response to see if it's an error type or not.
 * If it is error type, it calls the formatError function that constructs a jsend compliant error response with the HTTP status code.
 * Otherwise, the formatSuccess is called for every successful request transaction and formatted following the jsend JSON response specification.
 *
 * @param req
 * @param res
 * @param body
 * @return {string}
 */
function formatJSend(req, res, body) {
  function formatError(res, body) {
    const isClientError = res.statusCode >= 400 && res.statusCode < 500;
    if (isClientError) {
      return {
        status: 'error',
        message: body.message,
        code: body.code
      };
    } else {
      const inDebugMode = process.env.NODE_ENV === 'development';

      return {
        status: 'error',
        message: inDebugMode ? body.message : 'Internal Server Error',
        code: inDebugMode ? body.code : 'INTERNAL_SERVER_ERROR',
        data: inDebugMode ? body.stack : undefined
      };
    }
  }

  function formatSuccess(res, body) {
    if (body.data && body.pagination) {
      return {
        status: 'success',
        data: body.data,
        pagination: body.pagination,
      };
    }

    return {
      status: 'success',
      data: body
    };
  }

  let response;
  if (body instanceof Error) {
    response = formatError(res, body);
  } else {
    response = formatSuccess(res, body);
  }

  response = JSON.stringify(response); // When sending data to a web server, the data has to be a string. Convert a JavaScript object into a string.
  res.header('Content-Length', Buffer.byteLength(response)); // Nodejs method. The Buffer.byteLength() method returns the length of a specified string object, in bytes.
  res.header('Content-Type', 'application/json');

  return response;

}

module.exports = formatJSend;
