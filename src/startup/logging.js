const winston = require("winston");

module.exports = function () {
  winston.add(
    new winston.transports.File({ level: "info", filename: "logfile.log" })
  );
  winston.add(
    new winston.transports.File({ level: "error", filename: "logfile-error.log" })
  );
};
