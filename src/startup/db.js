const mongoose = require('mongoose');
const winston = require('winston');

mongoose.set("strictQuery", false);

module.exports = function() {
mongoose
  .connect("mongodb://localhost/task-system")
  .then(() => winston.info("Connected"))
  .catch((err) => {
    console.log("error", err);
  });
}