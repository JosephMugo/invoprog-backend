'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Invoice extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Invoice.init({
    invoice_id: DataTypes.UUID,
    term: DataTypes.STRING,
    date: DataTypes.DATE,
    from_name: DataTypes.STRING,
    from_email: DataTypes.STRING,
    from_address: DataTypes.STRING,
    from_phone: DataTypes.INTEGER,
    client_name: DataTypes.STRING,
    client_email: DataTypes.STRING,
    client_address: DataTypes.STRING,
    client_phone: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Invoice',
  });
  return Invoice;
};