const Sequelize = require('sequelize');

const sequelize = new Sequelize('testdb', 'sherman', 'sherman', {
  dialect: 'postgres'
});

const models = {
  User: sequelize.import('./user'),
  Message: sequelize.import('./message')
};

Object.keys(models).forEach(key => {
  if ('associate' in models[key]) {
    models[key].associate(models);
  }
});

models.sequelize = sequelize;
models.Sequelize = Sequelize;

module.exports = models;
