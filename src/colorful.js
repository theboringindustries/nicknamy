const RED = '\x1b[31m';
const GREEN = '\x1b[32m';
const RESET = '\x1b[0m';
const YELLOW = '\x1b[33m';

const makeColorful = (color) => (text) => `${color}${text}${RESET}`

const makeRed = makeColorful(RED);
const makeGreen = makeColorful(GREEN);
const makeYellow = makeColorful(YELLOW);

module.exports = { makeRed, makeGreen, makeYellow };