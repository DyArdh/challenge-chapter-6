const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const YAML = require("yaml");
const fs = require("fs");
const Sentry = require("@sentry/node");
const app = express();

const file = fs.readFileSync("./api-docs.yml", "utf8");
const swaggerDocument = YAML.parse(file);

const { ENVIRONMENT, SENTRY_DSN } = process.env;

Sentry.init({
  environment: ENVIRONMENT,
  dsn: SENTRY_DSN,
  integrations: [
    new Sentry.Integrations.Http({ tracing: true }),
    new Sentry.Integrations.Express({ app }),
    ...Sentry.autoDiscoverNodePerformanceMonitoringIntegrations(),
  ],
  tracesSampleRate: 1.0,
});

app.use(cors());
app.use(bodyParser.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.tracingHandler());

const router = require("./routes");
app.use(router);

app.use(Sentry.Handlers.errorHandler());

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

module.exports = app;
