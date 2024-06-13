import { Inject, Injectable } from "@nestjs/common";
import { provider } from "@utils/constants";
import { UserRepository} from '@repositories/index';
import { responseHelper } from "@utils/helpers";
import { Response } from 'express';

@Injectable()
class UserService {
    constructor(
        @Inject(provider.USER_REPOSITORY_PROVIDER) readonly userRepository: UserRepository,
    ) {}

    async getUserList(res: Response) {
        const users = await this.userRepository.findAll();
        return responseHelper.successRes(res as any, {
            ...users,
        });
    }
}

export { UserService };