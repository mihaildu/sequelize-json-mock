# sequelize-json-mock
Simple json mock for sequelize. It uses data from json instead of db. See examples/db.json for such a file. There's still a lot of work to be done for this package. Check issues for things needed to be done.

# How to use (for jest)
1. Create a `__mocks__` directory inside your project
2. Create a `sequelize.js` file there (so `__mocks__/sequelize.js`)
3. Just import & export the package in the file
```
const SequelizeMock, { Model, DataTypes } = require('sequelize-json-mock');
module.exports = SequelizeMock;
module.exports.Model = Model;
module.exports.DataTypes = DataTypes;
```

Now everytime you use sequelize calls in your jest tests it will use the mock instead.
