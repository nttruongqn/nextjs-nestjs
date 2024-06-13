import dotenv from 'dotenv';
import fs from 'fs';

const envConfig = dotenv.parse(fs.readFileSync('.env'));
const options: IAppConfig = {
    MYSQL: {
        CONNECTION_NAME: 'source_be',
        HOST: envConfig.MYSQL_HOST || 'localhost',
        PORT: envConfig.MYSQL_PORT || '3307',
        USERNAME: envConfig.MYSQL_USERNAME || 'root',
        PASSWORD: envConfig.MYSQL_PASSWORD || '',
        DBNAME: envConfig.MYSQL_DBNAME || 'source_be',
        ENCRYPT: envConfig.MYSQL_ENCRYPT === 'true',
    },
    APP: {
        PORT: envConfig.PORT || '3001',
        OPTIONS: {
            cors: true,
        },
        TIME_ZONE: envConfig.TIME_ZONE || 'Asia/Tokyo',
        ENV: process.env.NODE_ENV || '',
    },
}
export default options;