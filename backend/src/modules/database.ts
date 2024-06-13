import { Global, Module } from "@nestjs/common";
import { mysqlDatabaseProvider } from "@utils/providers";

@Global()
@Module({
    providers: [...mysqlDatabaseProvider],
    exports: [...mysqlDatabaseProvider],
})
class DatabaseModule {}
export {DatabaseModule}