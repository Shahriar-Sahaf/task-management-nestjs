import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUsersTable1761732732043 implements MigrationInterface {
    name = 'CreateUsersTable1761732732043'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "tasks" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "tasks" ADD "name" character varying NOT NULL DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE "tasks" DROP COLUMN "description"`);
        await queryRunner.query(`ALTER TABLE "tasks" ADD "description" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tasks" DROP COLUMN "description"`);
        await queryRunner.query(`ALTER TABLE "tasks" ADD "description" character varying(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "tasks" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "tasks" ADD "name" character varying(255) NOT NULL`);
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
