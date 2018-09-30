require('babel-register');
require('babel-polyfill');

const Mocha = require('mocha');
const glob = require('glob');
const mocha = new Mocha();
mocha.bail(false);

glob('test/**/*.spec.js', (err, files) => {
  let file;
  if (err) {
    throw err;
  }
  for (let i = 0, len = files.length; i < len; i += 1) {
    file = files[i];
    mocha.addFile(file);
  }
  mocha.ui('bdd');
  mocha.timeout(0);
  // mocha.reporter('min'); // My personal preference for debugging
  return mocha.run(failures => process.exit(failures));
});