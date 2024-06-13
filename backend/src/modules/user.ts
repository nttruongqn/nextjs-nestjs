import { UserAdminController } from "@controllers/admins";
import { Module } from "@nestjs/common";
import { UserService } from "@services/user";

@Module({
    controllers: [UserAdminController],
    providers: [UserService]
})
class UserModule{}
export { UserModule }