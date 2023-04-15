const express = require("express");
const app = express();
const config = require("config");

app.use(express.json());
require("./src/routes/routes")(app);
require("./src/startup/db")();
require("./src/startup/logging")();

if (!config.get("jwtPrivateKey")) {
  console.error("FATAL ERROR: jwtPrivateKey is not defined.");
  process.exit(1);
}

const port = process.env.port || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));
