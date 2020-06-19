const express = require("express");
const app = express();
const config = require("./config");
const bodyParser = require("body-parser");

const {
  notFound,
  logErrors,
  wrapErrors,
  clientErrorHandler,
} = require("./utils/middlewares/errorsHandlers");

const routes = require("./routes");

require("./utils/createContext");
// middleware
app.use(bodyParser.json());

// cors
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "POST, GET, OPTIONS, PUT, DELETE, PATCH"
  );
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Max-Age", "86400");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, X-Requested-With"
  );
  next();
});

// routes
app.use("/api/v1", routes);

// error handlers
app.use(logErrors);
app.use(wrapErrors);
app.use(clientErrorHandler);
app.use(notFound);

const start = async () => {
  app.listen(config.server.port, () =>
    console.log(`Listening: http://${config.server.host}:${config.server.port}`)
  );
};

start();
