
const ALPHABET = 'abcdefghijklmnopqrstuvwxyz'.split('');

const plus = (x) => (y) => x + y;

const flatten = ([x, ...xs]) => {
  if (!x) return [];

  if (Array.isArray(x)) {
    return flatten(x).concat(flatten(xs));
  }

  return [x].concat(flatten(xs));
}

const mixArrays = (combiner) => ([x, ...xs]) => {
  if (!x) return [];
  if (!xs.length) return x;

  const next = mixArrays(combiner)(xs);

  return flatten(x.map(combiner).map(next.map.bind(next)));
}

const generateNicknames = (length, letters = ALPHABET) => {
  return mixArrays(plus)(Array(length).fill(letters));
}

module.exports = generateNicknames;