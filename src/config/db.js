import mongoose from "mongoose";
import { log } from "../utils/logger.js";
import { dbMaxRetries, dbRetryDelay, dbMongoURI, dbName } from "./env.js";

const db = mongoose.connection;

let retryCount = 0;

export const dbConnect = async () => {
  try {
    log.info(
      `connecting to database: ${
        retryCount > 0 ? `tries ${retryCount}` : ""
      }...`
    );
    await mongoose.connect(`${dbMongoURI}${dbName}`, {});
    log.info("success: connected to database!");
  } catch (error) {
    retryCount++;
    log.error(`MongoDB connection failed. Retry attempt: ${retryCount}`);

    if (retryCount < dbMaxRetries) {
      log.info(`Retrying in ${dbRetryDelay / 1000} seconds...`);
      setTimeout(dbConnect, dbRetryDelay);
    } else {
      log.error(`Max retry attempts reached (${dbMaxRetries}). Exiting...`);
      process.exit(1);
    }
  }
};

export const dbError = db.on("error", (err) => {
  log.error(`MongoDB connection error: ${err}`);
});
