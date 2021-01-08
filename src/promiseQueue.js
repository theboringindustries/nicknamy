const { curry } = require('./curry');

const concatWith = (arr) => (value) => arr.concat(value);

const promiseQueue = (timeout) => {
  const helper = ([x, ...xs], results = []) => {
    if (!x) return Promise.resolve(results);

    return new Promise(resolve => {
      setTimeout(() => {
        x()
          .then(concatWith(results))
          .then(curry(helper, 2)(xs))
          .then(resolve)
      }, timeout);
    });
  }

  return helper;
}

module.exports = promiseQueue;