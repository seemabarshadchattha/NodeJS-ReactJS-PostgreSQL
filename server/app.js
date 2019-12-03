const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const config = require("./config/config");
const db = require("./config/db");
const User = require("./modals/User");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
db.sync();

const port = config.port || 4000;
require("./controller/User")(app);

app.listen(port, function() {
  console.log("Server is running on " + port);
});
