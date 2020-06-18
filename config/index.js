require("dotenv").config();

const config = {
  dev: process.env.NODE_ENV !== "production",

  server: {
    port: process.env.PORT,
    host: process.env.HOST,
  },
};

module.exports = config;
