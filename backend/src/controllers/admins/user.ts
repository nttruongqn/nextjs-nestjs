import { Controller, Get, Res } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { UserService } from "@services/user";
import { Response } from 'express';

@ApiTags('AdminAdminController')
@Controller('v1/users')
class UserAdminController {
    constructor(readonly userService: UserService) { }

    @Get()
    getUsrList(@Res() res: Response) {
        this.userService.getUserList(res);
    }
}

export { UserAdminController };