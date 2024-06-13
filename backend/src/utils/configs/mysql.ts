import { ConnectionOptions } from 'typeorm';
import { join } from 'path';
import { appConfig } from '@utils/configs';

const options: ConnectionOptions = {
    type: 'mysql',
    name: appConfig.MYSQL.CONNECTION_NAME,
    host: appConfig.MYSQL.HOST,
    port: parseInt(appConfig.MYSQL.PORT ?? ''),
    username: appConfig.MYSQL.USERNAME,
    password: appConfig.MYSQL.PASSWORD,
    database: appConfig.MYSQL.DBNAME,
    entities: [join(__dirname, '../../databases/entities/mysql/*.{ts,js}')],
};

export default options;
