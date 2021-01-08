
const readline = require('readline');
const makePromiseQueue = require('./promiseQueue');
const https = require('https');

const API = 'https://github.com';

const makeApiUrl = (api) => (nickname) => `${api}/${nickname}`;

const fetchNickname = (makeUrl) => (nickname) => new Promise(resolve => https.get(makeUrl(nickname), resolve));
const isNicknameFree = (fetchResult) => fetchResult.statusCode === 404;

const getFreeNicknames = async (nicknames, { timeout = 500, api = API, onProgress }) => {
  const queue = makePromiseQueue(timeout);

  const freeNicknamesRequest = queue(
    nicknames
      .map((nickname, index) => async () => {
        const isFree = await fetchNickname(makeApiUrl(api))(nickname).then(isNicknameFree);

        onProgress({ nicknames, nickname, index, isFree });

        return isFree ? nickname : '';
      })
  );

  const freeNicknames = await freeNicknamesRequest;

  return freeNicknames.filter(Boolean);
}

module.exports = getFreeNicknames