const fs = require('fs')

const loadDictionary = (path) => {
  try {
    const data = fs.readFileSync(path, 'utf8')
    return data.split('\n');
  } catch (err) {
    console.error(err)
    return [];
  }
}

module.exports = { loadDictionary };