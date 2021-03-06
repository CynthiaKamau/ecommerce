const sequelize = require('../dbconfig');
const { DataTypes, Sequelize } = require('sequelize');
const Joi = require("joi");

const PaymentMethod = sequelize.sequelize.define(
    'payment_methods',
    {
    id: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.fn('now')
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.fn('now')
    }
  }, {
    sequelize,
    tableName: 'payment_methods',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "payment_methods_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
});

function paymentMethodValidation(payment) {
  const schema = Joi.object({
    name: Joi.string()
          .max(65)
          .min(3)
          .required()
  }).unknown(true);

  return schema.validate(payment);
}

exports.PaymentMethod = PaymentMethod;
exports.paymentMethodValidation = paymentMethodValidation;