
const concatWith = (arr) => (value) => arr.concat(value);

const makeMergeArguments = (merger) => (func) => (...prevArgs) => (...nextArgs) => {
  return func(...merger(prevArgs)(nextArgs))
};
const mergeArguments = makeMergeArguments((prev) => (next) => concatWith(prev)(next));
const mergeArgumentsReverse = makeMergeArguments((prev) => (next) => concatWith(next)(prev.reverse()));

module.exports = {
  concatWith,
  mergeArguments,
  mergeArgumentsReverse,
}
