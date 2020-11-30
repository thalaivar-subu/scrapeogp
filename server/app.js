// eslint-disable-next-line no-unused-vars
import logEventErrors from "./utils/eventerrors";
import express from "express";
import morgan from "morgan";
import { parseJson } from "./utils/common";
import uniqid from "uniqid";
import { middleware, set } from "express-http-context";
import logger from "./utils/logger";
import { APP_NAME, PORT, NODE_ENV, LAMBDA } from "./lib/constants";
import resolvers from "./graphql/resolver";
import typeDefs from "./graphql/types";

const app = express();

// Logs Request Info
app.use(
  morgan((tokens, req, res) => {
    logger.info(
      [
        tokens.method(req, res),
        tokens.url(req, res),
        tokens.status(req, res),
        tokens["response-time"](req, res),
        "ms",
      ].join(" ")
    );
  })
);

// Body Parsers
app.use(express.urlencoded({ limit: "256kb", extended: true }));
app.use(express.json({ limit: "256kb" }));
app.use(middleware);

// Sets Uniqid in context
app.use((req, res, next) => {
  const { headers: { context } = {}, body } = req;
  const { uniqId = uniqid() } = parseJson(context);
  set("reqId", uniqId);
  set("requestBody", body);
  next();
});

// Healtcheck End point
app.get("/", (req, res) => {
  res.status(200).send({ message: "I am Alive" });
});
let graphqlHandler;
if (LAMBDA) {
  logger.info("Starting as ServerLess Lambda");
  const { ApolloServer } = require("apollo-server-lambda");
  const ApolloGql = new ApolloServer({
    typeDefs,
    resolvers,
    playground: {
      endpoint: "/dev/graphql",
    },
    introspection: true,
  });
  graphqlHandler = ApolloGql.createHandler({
    cors: {
      origin: "*",
    },
  });
} else {
  logger.info("Starting as Normal Express App");
  const { ApolloServer } = require("apollo-server-express");
  const ApolloGql = new ApolloServer({
    typeDefs,
    resolvers,
    introspection: true,
    playground: {
      endpoint: "/graphql",
    },
  });
  ApolloGql.applyMiddleware({
    app,
    path: "/graphql",
  });
  app.listen(PORT, () => {
    logger.info(
      `${NODE_ENV} ${APP_NAME} app listening at http://localhost:${PORT}`
    );
  });
}
exports.graphqlHandler = graphqlHandler;
