/*
 * Valera Hudoborodov
 */

"use strict";

const axios = require("axios");
const { expect } = require("chai");
const { responseHandler } = require("../helper");
require("../axiosInterceptor")(axios, responseHandler);
const getOptions = (custom = {}) =>
  Object.assign(
    {
      url: "https://api.yousician.com/library/search",
      params: { search: "a" }
    },
    custom
  );

describe("GIVEN axiosInterceptor", function () {
  it("WHEN request has valid parameters THEN non empty array is returned as result", async function () {
    const result = await axios(getOptions());
    expect(result).to.be.an("array").to.have.length.greaterThan(0);
  });

  it("WHEN request has not supported method THEN Http response status code: 405 error is thrown", async function () {
    try {
      await axios(getOptions({ method: "POST" }));
    } catch (e) {
      expect(e.message).to.be.equal("Http response status code: 405, body: {}");
    }
  });

  it("WHEN request has not supported method THEN no response was received error is thrown", async function () {
    try {
      await axios(getOptions({ url: "aaa" }));
    } catch (e) {
      expect(e.message).to.be.equal("The request was made but no response was received.\n" + "ERRNO: -4078\n" + "CODE: ECONNREFUSED\n" + "SYSCALL: connect");
    }
  });

  it("WHEN request has not supported method THEN Failed to set up request parameters error is thrown", async function () {
    try {
      await axios(getOptions({ url: undefined }));
    } catch (e) {
      expect(e.message).to.be.equal("Failed to set up the request parameters with error:\n" + '"{"code":"ERR_INVALID_ARG_TYPE"}"');
    }
  });
});
