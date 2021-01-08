const readline = require('readline');

const RED = '\x1b[31m';
const GREEN = '\x1b[32m';
const RESET = '\x1b[0m';


const clearLastLines = (n) => {
  readline.moveCursor(process.stdout, 0, -n);
  readline.cursorTo(process.stdout, 0);
  readline.clearScreenDown()
}

const log = (text) => console.log(text);

const makeColorful = (color) => (text) => `${color}${text}${RESET}`
const makeRed = makeColorful(RED);
const makeGreen = makeColorful(GREEN);

module.exports = { log, clearLastLines, makeRed, makeGreen }