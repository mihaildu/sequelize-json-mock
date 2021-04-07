const fs = require('fs');
const path = require('path');

class SequelizeMock {
  constructor(dataFile) {
    if (!dataFile) {
      console.error('No test data file path specified');
      return;
    }
    const filePath = path.join(__dirname, dataFile);
    this.data = JSON.parse(fs.readFileSync(filePath));
  }
}

module.exports = SequelizeMock;
