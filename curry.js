const { concatWith, argsToArray } = require('./utils');

const makeCurry = (mergeArgs) => {
  const curry = (func, argumentsLength = func.length) => (...args) => {
    if (args.length >= argumentsLength) return mergeArgs(func)(args)([]);

    return curry(argsToArray(mergeArgs(func)(args)), argumentsLength - args.length);
  }

  return curry;
}

const makeMergeArguments = (merger) => (func) => (prevArgs) => (nextArgs) => {
  return func(...merger(prevArgs)(nextArgs))
};

const curry = makeCurry(makeMergeArguments(concatWith));
const curryRight = makeCurry(makeMergeArguments((prev) => (next) => concatWith(next)(prev.reverse())))

module.exports = { curry, curryRight };