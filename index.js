
const generateNicknames = require('./generateNicknames');
const getFreeNicknames = require('./check');
const { clearLastLines, log } = require('./logger');

const makeLogger = () => {
  const free = [];
  console.log('\n');

  return ({ nicknames, index, isFree }) => {
    if (isFree) {
      free.push(nickname);
    }

    clearLastLines(2);
    log(`Checked: ${index}/${nicknames.length}`);
    log(`Free nicknames: ${free}`);
  }
}

getFreeNicknames(generateNicknames(2), { onProgress: makeLogger() }).then(console.log);