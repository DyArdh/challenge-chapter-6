const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const YAML = require("yaml");
const fs = require("fs");
const app = express();
const port = 8000;

const file = fs.readFileSync("./api-docs.yml", "utf8");
const swaggerDocument = YAML.parse(file);

app.use(cors());
app.use(bodyParser.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const router = require("./routes");
app.use(router);

app.use((req, res, next) => {
  return res.status(404).json({
    message: "404. Page Not Found!",
  });
});

app.use((err, req, res, next) => {
  return res.status(500).json({
    message: err.message,
  });
});

app.listen(port, () => console.log(`Listening on Port ${port}`));

module.exports = app;
