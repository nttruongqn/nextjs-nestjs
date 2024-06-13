import { EntityTarget, EntityManager, MongoEntityManager } from 'typeorm';
import { enums } from '@utils/constants';

class BaseRepository<Entity> {
    constructor(readonly entityManager: EntityManager | MongoEntityManager, readonly entity: EntityTarget<Entity>) { }

    async create(data: object = {}) {
        try {
            const res = await this.entityManager.insert(this.entity, {
                ...this.entityManager.create(this.entity, data),
                ...data,
            } as any);

            return await this.findOne(res.identifiers[0]);
        } catch (err) {
            if (err instanceof Error) {
                throw err;
            }
        }
    }

    async save(data: object[] = []) {
        try {
            return await this.entityManager.save(this.entity, data);
        } catch (err) {
            if (err instanceof Error) {
                throw err;
            }
        }
    }

    async bulkCreate(data: object[] = [{}], field: string = '') {
        try {
            const res = await this.entityManager.insert(this.entity, data);
            if (field) {
                const id: string | number = res.identifiers[0][field];

                return await this.findAll({ [field]: id });
            }
        } catch (err) {
            if (err instanceof Error) {
                throw err;
            }
        }
    }

    async update(conditions: object | object[] = {}, data: object = {}, relations: any[] = []) {
        try {
            await this.entityManager.update(this.entity, conditions, data);
            return await this.findOne(conditions, relations);
        } catch (err) {
            if (err instanceof Error) {
                throw err;
            }
        }
    }

    async delete(conditions: object | object[] = {}) {
        try {
            await this.entityManager.softDelete(this.entity, conditions);
            return await this.findOne(conditions, [], {}, true);
        } catch (err) {
            if (err instanceof Error) {
                throw err;
            }
        }
    }

    async destroy(conditions: object | object[] = {}) {
        try {
            return await this.entityManager.delete(this.entity, conditions);
        } catch (err) {
            if (err instanceof Error) {
                throw err;
            }
        }
    }

    async findByID(id: number | string, relations: any[] = [], withDeleted: boolean = false) {
        try {
            let result = null;
            result = await this.entityManager.findOne(this.entity, id, { relations, withDeleted });
            return result as Entity;
        } catch (err) {
            if (err instanceof Error) {
                throw err;
            }
        }
    }

    async findOne(conditions: object | object[] = {}, relations: any[] = [], order: object | null = null, withDeleted: boolean = false) {
        try {
            let result = null;

            result = await this.entityManager.findOne(this.entity, {
                where: conditions,
                relations,
                withDeleted,
                ...(order ? { order } : {}),
            });


            return result as Entity;
        } catch (err) {
            if (err instanceof Error) {
                throw err;
            }
        }
    }

    async findAll(conditions: object | object[] = {}, relations: any[] = [], order: object | null = null, withDeleted: boolean = false) {
        try {
            let result = null;

            result = await this.entityManager.find(this.entity, {
                where: conditions,
                relations,
                withDeleted,
                ...(order ? { order } : {}),
            });

            return result as Entity[];
        } catch (err) {
            if (err instanceof Error) {
                throw err;
            }
        }
    }

    async paginate(
        conditions: object | object[] = {},
        relations: any[] = [],
        paginate: { page: number; limit?: number } = { page: 1, limit: enums.LIMIT.DEFAULT },
        order: object | null = null,
        withDeleted: boolean = false,
    ) {
        try {
            const page = paginate.page >= 1 ? paginate.page : 1;
            const limit = paginate.limit ?? enums.LIMIT.DEFAULT;
            const offset = (limit ?? enums.LIMIT.DEFAULT) * (page - 1);

            const data = await this.entityManager.findAndCount(this.entity, {
                where: conditions,
                relations,
                take: limit,
                skip: offset,
                withDeleted,
                ...(order ? { order } : {}),
            });
            const result: any[] = data[0];
            const total = data[1];
            const lastPage = Math.ceil(total / limit);
            return {
                data: result as Entity[],
                page,
                lastPage,
                total,
            };

        } catch (err) {
            throw err;
        }
    }

    async findAndCount(
        conditions: object | object[] = {},
        relations: any[] = [],
        order: object | null = null,
        withDeleted: boolean = false,
    ) {
        try {
            const data = await this.entityManager.findAndCount(this.entity, {
                where: conditions,
                relations,
                withDeleted,
                ...(order ? { order } : {}),
            });
            return data[1];

        } catch (err) {
            throw err;
        }
    }
}

export { BaseRepository };
