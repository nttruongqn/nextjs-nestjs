import { appConfig } from "@utils/configs";
import { provider } from "@utils/constants";
import { getManager } from "typeorm";
import { UserRepository } from '@repositories/index';

export const userRepositoryProvider = [
    {
        provide: provider.USER_REPOSITORY_PROVIDER,
        useFactory: (): any => {
            const manager = getManager(appConfig.MYSQL.CONNECTION_NAME);
            return new UserRepository(manager);
        },
        inject: [provider.MYSQL_DATABASE_PROVIDER],
    }
]