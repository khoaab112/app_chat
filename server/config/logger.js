const winston = require("winston");
const { createLogger, format, transports } = winston;
const { combine, timestamp, printf, colorize } = format;
// Định nghĩa format log
const logFormat = printf(({ level, message, timestamp }) => {
    return `[${timestamp}] ${level}: ${message}`;
});
const LOG_FILE_PATH = 'storage/logs/logger.log';

const logger = createLogger({
    level: "error", // lever: info, warn, error, debug
    format: combine(
        timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
        colorize(),
        logFormat
    ),
    transports: [
        new transports.Console(), // view on console
        new transports.File({ filename: LOG_FILE_PATH }) // write to file
    ]
});

const log = () => {
    process.on("uncaughtException", (err) => {
        logger.error(`Uncaught Exception: ${err.message}`);
        logger.error(err.stack);
        process.exit(1);
    });
}
module.exports = log;