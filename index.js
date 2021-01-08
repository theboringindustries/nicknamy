
const getFreeNicknames = require('./check');
const { loadDictionary } = require('./loadDictionary');
const { clearLastLines, log } = require('./logger');

const RED = '\x1b[31m';

const getDictionaryPath = () => process.argv.slice(2)[0];

const logFreeNicknames = (free) => {
  log(`Free nicknames: [${free.join(', ')}]`)
}
 
const makeLogger = (dictionary) => {
  const free = [];
  const logChecked = (checked) => {
    log(`Checked: ${checked}/${dictionary.length}`);
  }

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
    console.log(RED, 'I need a dictionary, dumb leather bag!!! ヽ(`Д´)ﾉ');
    return false;
  }

  const dictionary = loadDictionary(dictionaryPath);

  getFreeNicknames(dictionary, { onProgress: makeLogger(dictionary) });
  return true;
}

main();