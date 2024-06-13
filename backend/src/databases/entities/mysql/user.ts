import { BaseEntity, Column, Entity, PrimaryColumn } from "typeorm";

@Entity('user')
class UserEntity extends BaseEntity {
    @PrimaryColumn({ type: 'nvarchar', length: 36 })
    user_id: string;

    @Column({ type: 'nvarchar', length: 255 })
    name: string;
}
export { UserEntity };
