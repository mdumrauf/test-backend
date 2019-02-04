const winston = require('winston');
const {
    createLogger, format, transports
} = winston;
const {
    combine, timestamp, printf, colorize
} = format;

const myCustomLevels = {
    levels: {
        error: 0,
        info: 2
    },
    colors: {
        error: 'red',
        info: 'green'
    }
};

const customFormat = printf(info =>
    `${info.level}: ${info.message} [${new Date(info.timestamp).toLocaleString()}]`
);

winston.addColors(myCustomLevels.colors);

const logger = createLogger({
    format: combine(
        timestamp(),
        colorize(),
        customFormat
    ),
    levels: myCustomLevels.levels,
    transports: [new transports.Console()]
});

module.exports = logger;
