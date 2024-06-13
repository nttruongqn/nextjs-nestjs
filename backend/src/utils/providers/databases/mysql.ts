import { Connection, createConnection, getConnection } from 'typeorm';

import { appConfig, mysqlConfig } from '@utils/configs';
import { provider } from '@utils/constants';
import { loggerHelper } from '@utils/helpers';
import { mysqlMigrate } from '@databases/migrations';
// import { mysqlSeeder } from '@databases/seeders';

export const mysqlDatabaseProvider = [
    {
        provide: provider.MYSQL_DATABASE_PROVIDER,
        useFactory: async () => {
            let connection: Connection;
            try {
                connection = getConnection(appConfig.MYSQL.CONNECTION_NAME);
            } catch (err) {
                connection = await createConnection(mysqlConfig);
            }
            loggerHelper.verbose('Connect to MYSQL success');

            await mysqlMigrate.run();
            // await mysqlSeeder.run();

            loggerHelper.verbose('Seed data to MYSQL success');

            return connection;
        },
    },
];
