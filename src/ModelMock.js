class ModelMock {

  static init(attributes, options) {
    this.modelName = options.modelName;
    this.sequelize = options.sequelize;
  }

  static hasOne() {}
  static belongsTo() {}
  static hasMany() {}
  static belongsToMany() {}

  static async bulkCreate(records, options) {
    if (!this.sequelize.data[this.modelName]) {
      return [];
    }

    const newElements = [];
    records.forEach(record => {
      const newElement = this.create(record, options);
      if (newElement) {
        newElements.push(newElement);
      }
    });

    return newElements;
  }

  static async create(values = {}, options) {
    if (!this.sequelize.data[this.modelName]) {
      return null;
    }

    const maxId = this.sequelize.data[this.modelName].reduce((mxId, element) => {
      if (!mxId || element.id > mxId) {
        return element.id;
      }
      return mxId;
    }, null);

    const newElement = {
      id: maxId + 1,
      ...values
    };

    this.sequelize.data[this.modelName].push(newElement);
    return newElement;
  }

  static async findAll(options) {
    if (this.sequelize.data[this.modelName]) {
      return this.sequelize.data[this.modelName].map(item => ({
        dataValues: item
      }));
    }
    return [];
  }

  static async findAndCountAll(options) {
    if (this.sequelize.data[this.modelName]) {
      return {
        count: this.sequelize.data[this.modelName].length,
        rows: this.sequelize.data[this.modelName].map(item => ({
          dataValues: item
        }))
      }
    }
    return { count: 0, rows: [] };
  }

  static async findByPk(param, options) {
    if (param && this.sequelize.data[this.modelName]) {
      const result = this.sequelize.data[this.modelName].find(element => element.id === param);
      if (result) {
        return result;
      }
    }
    return null;
  }

  static async findOne(options) {
    if (options.where && this.sequelize.data[this.modelName]) {
      const result = this.sequelize.data[this.modelName].find(element => {
        for (let key in options.where) {
          if (typeof options.where[key] === 'object' && options.where[key] !== null) {
            const op = Object.getOwnPropertySymbols(options.where[key])[0];
            const opString = op.toString();

            if (opString === 'Symbol(in)') {
              if (!options.where[key][op].includes(element[key])) {
                return false;
              }
            } else if (opString === 'Symbol(lte)') {
              if (element[key] > options.where[key][op]) {
                return false;
              }
            } else if (opString === 'Symbol(gte)') {
              if (element[key] < options.where[key][op]) {
                return false;
              }
            }
          }
          else if (options.where[key] !== element[key]) {
            return false;
          }
        }
        return true;
      });

      if (result) {
        return result;
      }
    }
    return null;
  }
}

module.exports = ModelMock;
