/*
 * Valera Hudoborodov
 */

"use strict";

const axios = require("axios");
const { getSearchString, responseHandler } = require("./helper");
require("./axiosInterceptor")(axios, responseHandler);

const options = {
  url: "https://api.yousician.com/library/search",
  params: { search: getSearchString(process.argv) }
};

(async () => {
  try {
    const list = await axios(options);
    console.log(`${list.length} songs found:`);
    console.table(list);
  } catch (e) {
    console.log("[ERROR]: " + e.message);
  }
})();
