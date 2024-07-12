const endPointGenerator = require('./endpoint');
const shell = require('shelljs');

module.exports = function (plop) {
  plop.setGenerator('e2e-endpoint', endPointGenerator);

  plop.setActionType('prettify', (answers, config) => {
    const data = config.data;
    shell.exec(`yarn run prettify -- "${data.path}"`);
    return '';
  });
};
