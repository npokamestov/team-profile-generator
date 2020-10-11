const fs = require('fs');

const writeFile = fileContent => {
    return new Promise((resolve, reject) => {
      fs.writeFile('./dist/sampleIndex.html', fileContent, err => {
        if (err) {
          reject(err);
          return;
        }
        resolve({
          ok: true,
          message: 'sampleIndex.html File created Successfully!'
        });
      });
    });
  };

  module.exports = { writeFile };