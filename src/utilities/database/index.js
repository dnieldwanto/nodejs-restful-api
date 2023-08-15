const db = require("../../db");
const model = db.models;
const postgresDB = model.postgreDB;

const saveData = (payload, model, transaction = null) => {
    return postgresDB[model].create(payload, { transaction });
};

const findAllData = (condition, model, order = null, attributes, include = []) => {
  let query = {
    attributes
  }

  if (condition) {
    query.where = condition
  }

  if (order) {
    query.order = [order]
  }
  return postgresDB[model].findAll(query)
}

const findByPrimaryKey = (primaryKey, model, attributes) => {
  return postgresDB[model].findByPk(primaryKey, {attributes});
}

const findOneByCondition = (condition, model, attributes, include = [], options ={}) => {
    return postgresDB[model].findOne({
      where: condition,
      attributes,
      include: include,
      ...options
    });
};

const updateData = (condition, payload, model, transaction = null) => {
  return postgresDB[model].update(
    payload,
    {
      where: condition
    },
    {
      transaction: transaction
    }
    );
}

const deleteData = (condition, model, transaction = null) => {
  return postgresDB[model].destroy(
    {
      where: condition
    },
    { transaction: transaction }
  );
}

module.exports = {
    saveData,
    findAllData,
    findByPrimaryKey,
    findOneByCondition,
    updateData,
    deleteData
}