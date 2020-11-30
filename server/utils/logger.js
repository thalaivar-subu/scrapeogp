import {
  LOGPATH,
  NODE_ENV,
  LOG_FILE_NAME,
  APP_NAME,
  LAMBDA,
} from "../lib/constants";
import { transports, format, createLogger } from "winston";
import { mkdirSync, existsSync } from "fs";
import { get } from "express-http-context";
import safeStringify from "fast-safe-stringify";
import { isValidObject } from "./common";

const { printf, combine, timestamp, label } = format;

// Our Custom Format of Logging
const logCustomFormat = printf(
  ({ level, message, label, timestamp, stack, ...info }) => {
    const logContent = { timestamp, label, message };
    const reqId = get("reqId");
    const requestBody = get("requestBody");
    if (reqId) logContent.reqId = reqId;
    if (isValidObject(info)) logContent.info = info;
    if (level === "error") {
      if (requestBody) logContent.requestBody = requestBody;
      if (stack) logContent.stack = stack;
    }
    return safeStringify(logContent);
  }
);

// Creating Logger
const logger = createLogger({
  format: combine(label({ label: APP_NAME }), timestamp(), logCustomFormat),
});

if (LAMBDA) {
  // Creating Log Directory
  (() => {
    try {
      if (!existsSync(LOGPATH)) mkdirSync(LOGPATH);
    } catch (error) {
      console.log("Error while creating Log Directory -> ", error);
    }
  })();
  logger.add(new transports.File({ filename: LOG_FILE_NAME }));
}

// Enable logging in console on Development
if (NODE_ENV === "development") {
  logger.add(
    new transports.Console({
      format: combine(label({ label: APP_NAME }), timestamp(), logCustomFormat),
    })
  );
}

if (LAMBDA) {
  logger.info = console.info;
  logger.error = console.error;
}

export default logger;
