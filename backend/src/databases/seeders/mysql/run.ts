import { UserEntity } from "@databases/entities/mysql/user";
import { appConfig } from "@utils/configs";
import { loggerHelper, stringHelper } from "@utils/helpers";
import { getManager } from "typeorm";

export const run = async () => {
    try {
        const manager = getManager(appConfig.MYSQL.CONNECTION_NAME);
        await manager.save(UserEntity, [
            {
                user_id: stringHelper.generateUuid(),
                name: 'Truong',
            },
        ]);
    } catch (err) {
        if (err instanceof Error) {
            loggerHelper.error('SEEDER_MYSQL_ERROR', err);
        }
    }

}