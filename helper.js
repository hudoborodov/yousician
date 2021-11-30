/*
 * Valera Hudoborodov
 */

"use strict";

const fs = require("fs");
const path = require("path");
const { pick, sortBy } = require("lodash");

const responseHandler = response => {
  const list = response.data.exercises.map(song => pick(song, ["artist", "title"]));
  return sortBy(list, ["artist", "title"]);
};

const getSearchString = args => {
  let searchString = args[2];
  if (!searchString) {
    console.log(`Search string is not specified as parameter, reading searchString.txt content...`);
    searchString = fs.readFileSync(path.join(__dirname, "searchString.txt"), "utf8");
  }
  console.log(`Search string: "${searchString}"`);
  return searchString;
};

module.exports = { getSearchString, responseHandler };
