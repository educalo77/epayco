require("dotenv").config();
const { Sequelize, DataTypes } = require("sequelize");
const env = require('./env.js');

const UserModel = require("./models/user");
const TransactionModel = require("./models/transaction");
const BalanceModel = require("./models/balance");

const Pool = require("pg").Pool;

const devConfig = `postgresql://${process.env.PG_USER}:${process.env.PG_PASSWORD}@${process.env.PG_HOST}:${process.env.PG_PORT}/${process.env.PG_DATABASE}`;

const proConfig = process.env.DATABASE_URL; //heroku addons

const pool = new Pool({
  connectionString:
    process.env.NODE_ENV === "production" ? proConfig : devConfig,
});


const User = UserModel(sequelize, DataTypes);
const Transaction = TransactionModel(sequelize,DataTypes)
const Balance = BalanceModel(sequelize,DataTypes)

User.hasMany(Transaction);
Transaction.belongsTo(User);

User.hasOne(Balance)
Balance.belongsTo(User)

module.exports = {
    pool,
    User,
    Transaction,
    Balance
};