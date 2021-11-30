# About
Script to check the search results for the page https://yousician.com/songs

# Setup
* Download and install [NodeJS LTS version](https://nodejs.org/en/download/).
* In terminal navigate to the folder where package.json is located.
* Run `npm install`

# Usage
* To run script with normalized string use any command below. You may pass string in single or double quotes .
  ```
  $ npm start "you"
  $ npm run start "the cowboy"
  $ npm run search "it's"
  $ node search wham
  ```
* In case you want to use string with characters that aren't supported by CLI of your choice, save string to searchString.txt and run the same command without parameter.
  ```
  $ npm start
  $ npm run start
  $ npm run search
  $ node search
  ```
  * In case parameter is not specified or empty ("") and searchString.txt is empty as well, the script is executed with empty search string value

# Maintenance
* Run unit tests: `npm test` or `mocha`
* Run unit tests and generate coverage report (./coverage/index.html): `npm run testCov`
* Run linting: `npm run eslint`
  
# Notes
* Tool is using [Axios](https://github.com/axios/axios) package to make http request. It is quite popular package and includes convenient way of handlind errors as well as request options and responses. Also it parses response to JSON out of the box.
* You may notice some overhead in error handling and logging but these are just pieces of my own code samples/toolsets and I didn't spend extra time for it.
* Command line parameters don't easily support as many symbols as Web UI allows (e.g. double quote, space, exclamation mark with character etc.) so that is a reason why reading from plain text file added.
* Simple set of unit tests provided to clarify BDD/TDD approach used. Some tests are too redundant so normally I'd not write such tests.
* Extra features such as code coverage report and linting added (see [Maintenance](#Maintenance)).
* The script supports wider range of values of search parameter than it is possible to achieve through the UI - this can be potentially used for security/stress/etc testing.