import { UserEntity } from "@databases/entities/mysql/user";
import { EntityManager } from "typeorm";
import { BaseRepository } from "./base";

class UserRepository extends BaseRepository<UserEntity> {
    constructor(readonly entityManager: EntityManager) {
        super(entityManager, UserEntity);
    }
}
export { UserRepository }