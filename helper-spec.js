/*
 * Valera Hudoborodov
 */

"use strict";

const { expect } = require("chai");
const mock = require("mock-fs");
const { responseHandler, getSearchString } = require("../helper");

const naughtyString = ` '<>~!@$%^&*()_+=-[]|}{;.,?:Iñtërnâtiônàlizætiøn (ಠ_ಠ) 🎸`; // eslint-disable-line no-irregular-whitespace

const response = {
  data: {
    exercises: [
      { _id: "5fbcb879c5ecd761eed0dc11", artist: "1", level: 2, title: "b" },
      { _id: "5fbcb879c5ecd761eed0dc12", artist: "1", level: 2, title: "a" },
      { _id: "5fbcb879c5ecd761eed0dc13", artist: "2", level: 2, title: "c" },
      { _id: "5fbcb879c5ecd761eed0dc10", artist: "1", level: 2, title: "c" }
    ]
  }
};

const expectedResult = [
  { artist: "1", title: "a" },
  { artist: "1", title: "b" },
  { artist: "1", title: "c" },
  { artist: "2", title: "c" }
];

describe("GIVEN responseHandler", function () {
  it("WHEN valid response is passed THEN it prints list as table and returns it", function () {
    const result = responseHandler(response);
    expect(expectedResult).to.deep.equal(result);
  });

  it("WHEN valid empty response is passed THEN it prints empty list as table and returns it", function () {
    const result = responseHandler({ data: { exercises: [] } });
    expect(result).to.deep.equal([]);
  });
});

describe("GIVEN getSearchString", function () {
  beforeEach(function () {
    return mock({ "searchString.txt": naughtyString });
  });

  afterEach(mock.restore);

  it("WHEN 2nd argument specified THEN it is returned", function () {
    const args = ["node_path", "script_path", " "];
    expect(getSearchString(args)).to.equal(args[2]);
  });

  it("WHEN 2nd argument is not specified THEN it is fetched from file and returned", function () {
    const args = ["node_path", "script_path"];
    expect(getSearchString(args)).to.equal(naughtyString);
  });
});
