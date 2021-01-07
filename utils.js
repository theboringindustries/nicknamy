
const argsToArray = (func) => (...args) => func(args);
const arrayToArgs = (func) => (args) => func(...args);

const concatWith = (arr) => (value) => arr.concat(value);

module.exports = {
  argsToArray,
  arrayToArgs,
  concatWith,
}
