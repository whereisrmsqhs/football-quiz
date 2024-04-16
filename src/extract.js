const fs = require("fs");

function extractNames(filePath) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, "utf8", (err, data) => {
      if (err) {
        reject(err);
        return;
      }
      const jsonData = JSON.parse(data);
      const namesArray = jsonData.map((item) => item.name);
      resolve(namesArray);
    });
  });
}

module.exports = extractNames;
