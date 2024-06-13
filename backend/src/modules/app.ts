import { forwardRef, Module } from "@nestjs/common";
import { AppController } from "src/app.controller";
import { ScheduleModule } from '@nestjs/schedule';
import { DatabaseModule } from "./database";
import { AppService } from "src/app.service";
import { UserModule } from "./user";
import { RepositoryModule } from "./repository";


@Module({
    imports: [
        ScheduleModule.forRoot(),
        forwardRef(() => DatabaseModule),
        forwardRef(() => RepositoryModule),
        forwardRef(() => UserModule)

    ],
    controllers: [AppController],
    providers: [AppService],
})
class AppModule {}
export { AppModule };