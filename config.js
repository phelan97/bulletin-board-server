require('dotenv').config();

module.exports = {
  DATABASE_URL:
    process.env.DATABASE_URL || "mongodb://localhost",
  DATABASE_NAME: process.env.DATABASE_NAME || "board-db"
};