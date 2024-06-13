import { appConfig } from "@utils/configs";
import { getConnection, Table } from "typeorm";

export const run = async () => {
    const connection = getConnection(appConfig.MYSQL.CONNECTION_NAME);
    const queryRunner = connection.createQueryRunner();
    
    const adminFields = [
        {
            name: 'creator',
            type: 'nvarchar',
            length: '36',
            isNullable: true,
        },
        {
            name: 'updater',
            type: 'nvarchar',
            length: '36',
            isNullable: true,
        },
        {
            name: 'deleter',
            type: 'nvarchar',
            length: '36',
            isNullable: true,
        },
    ];
    const timeStampFields = [
        {
            name: 'created_at',
            type: 'datetime',
            default: 'CURRENT_TIMESTAMP',
            isNullable: false,
        },
        {
            name: 'updated_at',
            type: 'datetime',
            default: 'CURRENT_TIMESTAMP',
            isNullable: true,
        },
        {
            name: 'deleted_at',
            type: 'datetime',
            isNullable: true,
        },
    ];
   
    try {
        await queryRunner.createTable(
            new Table({
                name: 'user',
                columns: [
                    {
                        name: 'user_id',
                        type: 'nvarchar',
                        length: '36',
                        isPrimary: true,
                        isNullable: false,                     
                    },
                    {
                        name: 'name',
                        type: 'nvarchar',
                        length: '255',
                        isNullable: false,
                    },
                    ...adminFields,
                    ...timeStampFields,
                ],
            }),
            true,
        );
    } catch (err) {}
}