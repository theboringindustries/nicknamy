
const getFreeNicknames = require('./check');
const { loadDictionary } = require('./dictionary');
const { clearLastLines, log } = require('./logger');
const { makeRed, makeGreen, makeYellow } = require('./colorful');

const API = 'https://github.com';

const getDictionaryPath = () => process.argv.slice(2)[0];
const getTimeout = () => process.argv.slice(2)[1];

const logFreeNicknames = (free) => {
  log(`Free nicknames: ${makeYellow(`[${free.join(', ')}]`)}`);
}
 
const makeLogger = ({ dictionary, api }) => {
  const free = [];
  const logChecked = (checked) => {
    log(`Checked: ${checked}/${dictionary.length}`);
  }

  log(`Checking nicknames on ${makeGreen(api)}\n`);
  logChecked(0);
  logFreeNicknames(free)

  return ({ nickname, index, isFree }) => {
    if (isFree) {
      free.push(nickname);
    }

    clearLastLines(2);
    logChecked(index + 1);
    logFreeNicknames(free);
  }
}

const main = () => {
  const dictionaryPath = getDictionaryPath();

  if (!dictionaryPath) {
    log(makeRed('I need a dictionary, stupid leather bag!!! ヽ(`Д´)ﾉ'));
    return false;
  }

  const dictionary = loadDictionary(dictionaryPath);

  getFreeNicknames(dictionary, { onProgress: makeLogger({ dictionary, api: API, timeout: getTimeout() ?? 100 }), api: API });
  return true;
}

main();