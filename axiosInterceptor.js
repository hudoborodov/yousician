/*
 * Valera Hudoborodov
 */

"use strict";

const { has } = require("lodash");

module.exports = (axios, responseHandler) => {
  axios.interceptors.request.use(
    config => config,
    error => "Request error:\n" + error.request.data
  );

  axios.interceptors.response.use(
    response => responseHandler(response),
    error => {
      let errorMessage = "Unknown error";
      if (error.response) {
        errorMessage = `Http response status code: ${error.response.status}, body: ${JSON.stringify(error.response.data)}`;
      } else if (has(error, "request")) {
        errorMessage =
          "The request was made but no response was received." + `\nERRNO: ${error.errno}` + `\nCODE: ${error.code}` + `\nSYSCALL: ${error.syscall}`;
      } else {
        errorMessage = `Failed to set up the request parameters with error:\n"${JSON.stringify(error)}"`;
      }
      throw new Error(errorMessage);
    }
  );
};
