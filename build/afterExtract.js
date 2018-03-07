const fs = require('fs');

module.exports = function afterExtract(extractPath, electronVersion, platform, arch, callback) {
  fs.copyFile('./config.json', `${extractPath}/config.json`, (err) => {
    if (err) throw err;
  });

  callback();
};
