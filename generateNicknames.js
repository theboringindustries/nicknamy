
const { injectSideEffect, plus, mixArrays } = require('./utils');
const { clearLastLines, log } = require('./logger');

const ALPHABET = 'abcdefghijklmnopqrstuvwxyz'.split('');

const generateNicknames = (length, { words, onProgress }) => {
  return mixArrays(injectSideEffect(plus)(onProgress, 1))(Array(length).fill(words));
}

const calcTotalSteps = (words) => {
  const helper = (len) => {
    if (len === 1) {
      return words.length;
    }

    return (words.length) ** len + helper(len - 1)
  }
  
  return helper;
}

const logger = (len) => (words) => {
  const total = calcTotalSteps(words)(len);
  let step = 1;

  log('');

  return () => {
    clearLastLines(1);
    log(`Generated: ${step++ / total * 100}%`)
    // log(`Generated: ${index++} / ${total}`)
  }
}

console.warn('len', generateNicknames(26, { onProgress: logger(26)(ALPHABET), words: ALPHABET }).length)

module.exports = generateNicknames;