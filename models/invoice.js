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
      Invoice.hasMany(models.Order, {
        foreignKey: 'invoice_id'
      });
    }
  };
  Invoice.init({
    invoice_id: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    term: {
      type: DataTypes.STRING,
      allowNull: false
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    company_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    company_email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    company_address: {
      type: DataTypes.STRING,
      allowNull: false
    },
    company_phone: {
      type: DataTypes.INTEGER, 
      allowNull: false
    },
    client_name: {
      type: DataTypes.STRING, 
      allowNull: false
    },
    client_email: {
      type: DataTypes.STRING, 
      allowNull: false
    },
    client_address: {
      type: DataTypes.STRING, 
      allowNull: false
    },
    client_phone: {
      type: DataTypes.INTEGER, 
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Invoice',
  });
  return Invoice;
};