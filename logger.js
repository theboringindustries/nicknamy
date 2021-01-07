const readline = require('readline');

const clearLastLines = (n) => {
  readline.moveCursor(process.stdout, 0, -n);
  readline.cursorTo(process.stdout, 0);
  readline.clearScreenDown()
}

const log = (text) => console.log(text);

module.exports = { log, clearLastLines }