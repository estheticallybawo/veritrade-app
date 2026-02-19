const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Supplier = sequelize.define('Supplier', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  supplier_id: {
    type: DataTypes.STRING(20),
    allowNull: true  // Optional, we have our own id
  },
  business_name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  registration_number: {
    type: DataTypes.STRING(100),
    unique: true,
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM('registered', 'not_found'),
    defaultValue: 'registered'
  },
  registration_date: {
    type: DataTypes.DATE,
    allowNull: true
  },
  business_type: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  industry_category: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  state: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  verification_status: {
    type: DataTypes.ENUM('VERIFIED', 'REJECTED', 'FLAGGED'),
    allowNull: true
  },
  verification_reason: {
    type: DataTypes.TEXT,
    allowNull: true
  }
}, {
  tableName: 'suppliers',
  timestamps: true
});

module.exports = Supplier;