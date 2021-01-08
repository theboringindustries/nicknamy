
const argsToArray = (func) => (...args) => func(args);
const arrayToArgs = (func) => (args) => func(...args);

const concatWith = (arr) => (value) => arr.concat(value);

const makeMergeArguments = (merger) => (func) => (...prevArgs) => (...nextArgs) => {
  return func(...merger(prevArgs)(nextArgs))
};
const mergeArguments = makeMergeArguments((prev) => (next) => concatWith(prev)(next));
const mergeArgumentsReverse = makeMergeArguments((prev) => (next) => concatWith(next)(prev.reverse()));

const sliceTo = (arr) => (limit) => arr.slice(0, limit);

const injectSideEffect = (func) => (effect, argsLimit = Infinity) => (...args) => {
  const next = func(...args);

  if (typeof next === 'function') {
    return injectSideEffect(next)(mergeArguments(effect)(...sliceTo(args)(argsLimit)), argsLimit)
  }

  effect(...sliceTo(args)(argsLimit));

  return next;
}

const limitArguments = (limit) => (func) => (...args) => func(...args.slice(0, limit));

const toNDecimalPlaces = n => num => Math.round((num + Number.EPSILON) * 10 ** n) / 10 ** n;

const plus = (x) => (y) => x + y;

const mixArrays = (combiner) => ([x, ...xs]) => {
  if (!x) return [];
  if (!xs.length) return x.map(combiner('')); // for logging

  const next = mixArrays(combiner)(xs);
  const nextMap = next.map.bind(next);

  return x
    .map(combiner)
    .map(nextMap)
    .flat();
}

module.exports = {
  argsToArray,
  arrayToArgs,
  concatWith,
  injectSideEffect,
  mergeArguments,
  mergeArgumentsReverse,
  limitArguments,
  sliceTo,
  toNDecimalPlaces,
  plus,
  mixArrays,
}
