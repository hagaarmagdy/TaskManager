const users = require("./users");
const tasks = require("./tasks");

module.exports = function (app) {
  app.use("/task-system/users", users);
  app.use("/task-system/tasks", tasks);

};
