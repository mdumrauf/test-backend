require('dotenv').load();

const {NODE_ENV, PORT} = process.env;

async function run() {
    const app = await require('./src')();
    const logger = require('./src/services/logger');

    app.listen(PORT, () => logger.info(`Started at port ${PORT} in ${NODE_ENV} environment...`));
}

run();
