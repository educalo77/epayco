require("dotenv").config();
const { Sequelize, DataTypes } = require("sequelize");
const env = require('./env.js');

const UserModel = require("./models/user");
const TransactionModel = require("./models/transaction");
const BalanceModel = require("./models/balance");

const sequelize = new Sequelize(env.database, env.username, env.password, {
    host: env.host,
    dialect: env.dialect,
    operatorsAliases: false,
   
    pool: {
      max: env.max,
      min: env.pool.min,
      acquire: env.pool.acquire,
      idle: env.pool.idle
    }
  });

const User = UserModel(sequelize, DataTypes);
const Transaction = TransactionModel(sequelize,DataTypes)
const Balance = BalanceModel(sequelize,DataTypes)

User.hasMany(Transaction);
Transaction.belongsTo(User);

User.hasOne(Balance)
Balance.belongsTo(User)



module.exports = {
    conn: sequelize,
    User,
    Transaction,
    Balance
};