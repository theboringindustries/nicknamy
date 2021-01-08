const { mergeArguments, mergeArgumentsReverse } = require('./utils');

const makeCurry = (mergeArgs) => {
  const curry = (func, argumentsLength = func.length) => (...args) => {
    if (args.length >= argumentsLength) return mergeArgs(func)(...args)();

    return curry(mergeArgs(func)(...args), argumentsLength - args.length);
  }

  return curry;
}

const curry = makeCurry(mergeArguments);
const curryRight = makeCurry(mergeArgumentsReverse)

module.exports = { curry, curryRight };