const path = require("path");
const ROOT_DIR = path.join(__dirname, "../");
const isDevelopment = process.env.NODE_ENV !== "production";

module.exports = {
  ROOT_DIR,
  isDevelopment,
};
